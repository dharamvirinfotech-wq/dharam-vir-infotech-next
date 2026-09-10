const { pool } = require('../db/pool');

// Public: submit contact form
exports.create = async (req, res, next) => {
  try {
    const { name, email, phone = null, subject = null, service = null, message } = req.body;
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().slice(0, 64);
    const ua = (req.headers['user-agent'] || '').toString().slice(0, 500);

    const [result] = await pool.query(
      `INSERT INTO contact_inquiries (name, email, phone, subject, service, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, subject, service, message, ip, ua]
    );
    res.status(201).json({ id: result.insertId, message: 'Inquiry received' });
  } catch (err) { next(err); }
};

// Admin: list with filters
exports.list = async (req, res, next) => {
  try {
    const { status, search, service, limit = 100, offset = 0 } = req.query;
    const where = [];
    const params = [];
    if (status && status !== 'all') { where.push('status = ?'); params.push(status); }
    if (service && service !== 'all') { where.push('service = ?'); params.push(service); }
    if (search) {
      where.push('(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)');
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const [rows] = await pool.query(
      `SELECT * FROM contact_inquiries ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    );
    const [[counts]] = await pool.query(
      `SELECT
         COUNT(*) AS total,
         SUM(status='new') AS new_count,
         SUM(status='replied') AS replied_count,
         SUM(status='closed') AS closed_count
       FROM contact_inquiries`
    );
    res.json({ inquiries: rows, counts });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ inquiry: rows[0] });
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
    await pool.query(`UPDATE contact_inquiries SET ${fields.join(', ')} WHERE id = ?`, params);
    const [rows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [req.params.id]);
    res.json({ inquiry: rows[0] });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM contact_inquiries WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
