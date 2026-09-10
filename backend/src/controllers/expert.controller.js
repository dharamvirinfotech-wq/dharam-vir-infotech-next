const { pool } = require('../db/pool');

// Public: submit a "Talk To Experts" consultation request
exports.create = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone = null,
      company = null,
      category = 'general',
      topic = null,
      budget = null,
      timeline = null,
      message = null,
      source_page = null,
    } = req.body;

    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().slice(0, 64);
    const ua = (req.headers['user-agent'] || '').toString().slice(0, 500);

    const [result] = await pool.query(
      `INSERT INTO expert_requests
         (name, email, phone, company, category, topic, budget, timeline, message, source_page, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, company, category, topic, budget, timeline, message, source_page, ip, ua]
    );
    res.status(201).json({ id: result.insertId, message: 'Request received. An expert will contact you shortly.' });
  } catch (err) { next(err); }
};

// Admin/editor: list with filters
exports.list = async (req, res, next) => {
  try {
    const { status, category, search, limit = 100, offset = 0 } = req.query;
    const where = [];
    const params = [];
    if (status && status !== 'all') { where.push('status = ?'); params.push(status); }
    if (category && category !== 'all') { where.push('category = ?'); params.push(category); }
    if (search) {
      where.push('(name LIKE ? OR email LIKE ? OR company LIKE ? OR topic LIKE ? OR message LIKE ?)');
      const like = `%${search}%`;
      params.push(like, like, like, like, like);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const [rows] = await pool.query(
      `SELECT * FROM expert_requests ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    );
    const [[counts]] = await pool.query(
      `SELECT
         COUNT(*) AS total,
         SUM(status='new') AS new_count,
         SUM(status='contacted') AS contacted_count,
         SUM(status='scheduled') AS scheduled_count,
         SUM(status='closed') AS closed_count
       FROM expert_requests`
    );
    res.json({ requests: rows, counts });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expert_requests WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Request not found' });
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
    await pool.query(`UPDATE expert_requests SET ${fields.join(', ')} WHERE id = ?`, params);
    const [rows] = await pool.query('SELECT * FROM expert_requests WHERE id = ?', [req.params.id]);
    res.json({ request: rows[0] });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM expert_requests WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
