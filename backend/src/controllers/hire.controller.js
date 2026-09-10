const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { pool } = require('../db/pool');
const {
  sendMail,
  renderUserConfirmation,
  renderInternalNotification,
} = require('../utils/mailer');

// Public: submit a "Hire Developer" request. Also auto-creates a user account
// if one doesn't already exist for the provided email.
exports.create = async (req, res, next) => {
  try {
    const {
      developer_slug,
      developer_name,
      developer_role = null,
      name,
      email,
      phone = null,
      company = null,
      engagement_type = 'full-time',
      budget = null,
      timeline = null,
      project_description,
      latitude = null,
      longitude = null,
      location_accuracy = null,
      location_address = null,
    } = req.body;

    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().slice(0, 64);
    const ua = (req.headers['user-agent'] || '').toString().slice(0, 500);

    // 1) Upsert user (create if not exists). Random password — user can reset later.
    let userId = null;
    let userCreated = false;
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing.length) {
      userId = existing[0].id;
    } else {
      const tempPassword = crypto.randomBytes(12).toString('base64');
      const hash = await bcrypt.hash(tempPassword, 10);
      const [r] = await pool.query(
        `INSERT INTO users (full_name, email, phone, password_hash, role, company_name, provider, status)
         VALUES (?, ?, ?, ?, 'user', ?, 'local', 'active')`,
        [name, email, phone, hash, company]
      );
      userId = r.insertId;
      userCreated = true;
    }

    // 2) Save hire request linked to the user
    const [result] = await pool.query(
      `INSERT INTO hire_requests
         (user_id, developer_slug, developer_name, developer_role,
          name, email, phone, company, engagement_type, budget, timeline, project_description,
          latitude, longitude, location_accuracy, location_address,
          ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, developer_slug, developer_name, developer_role,
        name, email, phone, company, engagement_type, budget, timeline, project_description,
        latitude, longitude, location_accuracy, location_address,
        ip, ua,
      ]
    );

    // Build a summary record for email rendering
    const summary = {
      id: result.insertId,
      developer_slug, developer_name, developer_role,
      name, email, phone, company,
      engagement_type, budget, timeline, project_description,
      latitude, longitude, location_address,
    };

    // Fire-and-forget email notifications (don't block the API response).
    // Errors are logged inside sendMail.
    (async () => {
      try {
        const userMail = renderUserConfirmation(summary);
        await sendMail({ to: email, ...userMail });

        const internalList = (process.env.HIRE_NOTIFY_EMAILS || '')
          .split(',').map((s) => s.trim()).filter(Boolean);
        if (internalList.length) {
          const teamMail = renderInternalNotification(summary);
          await sendMail({ to: internalList, ...teamMail });
        }
      } catch (e) {
        console.error('[hire] notification email failed:', e.message);
      }
    })();

    res.status(201).json({
      id: result.insertId,
      user_id: userId,
      user_created: userCreated,
      message: 'Hire request submitted. Our team will contact you within 24 hours.',
    });
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const { status, developer_slug, search, limit = 100, offset = 0 } = req.query;
    const where = [];
    const params = [];
    if (status && status !== 'all') { where.push('status = ?'); params.push(status); }
    if (developer_slug) { where.push('developer_slug = ?'); params.push(developer_slug); }
    if (search) {
      where.push('(name LIKE ? OR email LIKE ? OR company LIKE ? OR developer_name LIKE ? OR project_description LIKE ?)');
      const like = `%${search}%`;
      params.push(like, like, like, like, like);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const [rows] = await pool.query(
      `SELECT * FROM hire_requests ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    );
    const [[counts]] = await pool.query(
      `SELECT COUNT(*) AS total,
              SUM(status='new') AS new_count,
              SUM(status='contacted') AS contacted_count,
              SUM(status='scheduled') AS scheduled_count,
              SUM(status='closed') AS closed_count
         FROM hire_requests`
    );
    res.json({ requests: rows, counts });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hire_requests WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Hire request not found' });
    res.json({ request: rows[0] });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status, admin_notes } = req.body;
    const fields = [];
    const params = [];
    if (status) { fields.push('status = ?'); params.push(status); }
    if (typeof admin_notes === 'string') { fields.push('admin_notes = ?'); params.push(admin_notes); }
    if (!fields.length) return res.status(400).json({ message: 'Nothing to update' });
    params.push(req.params.id);
    await pool.query(`UPDATE hire_requests SET ${fields.join(', ')} WHERE id = ?`, params);
    const [rows] = await pool.query('SELECT * FROM hire_requests WHERE id = ?', [req.params.id]);
    res.json({ request: rows[0] });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM hire_requests WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
