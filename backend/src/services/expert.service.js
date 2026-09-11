/**
 * Expert Service
 * All database queries for "Talk To Experts" consultation requests.
 */

const { pool } = require('../db/pool');

/**
 * Creates an expert request.
 */
const createExpertRequest = async ({
  name,
  email,
  phone,
  company,
  category,
  topic,
  budget,
  timeline,
  message,
  source_page,
  ip,
  ua,
}) => {
  const [result] = await pool.query(
    `INSERT INTO expert_requests
       (name, email, phone, company, category, topic, budget, timeline, message, source_page, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      phone || null,
      company || null,
      category || 'general',
      topic || null,
      budget || null,
      timeline || null,
      message || null,
      source_page || null,
      ip,
      ua,
    ]
  );
  return result.insertId;
};

/**
 * Lists expert requests with filters and status counts.
 */
const listExpertRequests = async ({ status, category, search, limit = 100, offset = 0 } = {}) => {
  const where = [];
  const params = [];
  if (status && status !== 'all') {
    where.push('status = ?');
    params.push(status);
  }
  if (category && category !== 'all') {
    where.push('category = ?');
    params.push(category);
  }
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

  return { requests: rows, counts };
};

/**
 * Returns a single expert request by id.
 */
const getExpertRequest = async (id) => {
  const [rows] = await pool.query('SELECT * FROM expert_requests WHERE id = ?', [id]);
  if (!rows.length) {
    const err = new Error('Request not found');
    err.status = 404;
    throw err;
  }
  return rows[0];
};

/**
 * Updates status and/or admin_notes of an expert request.
 */
const updateExpertRequest = async (id, { status, admin_notes }) => {
  const fields = [];
  const params = [];
  if (status) {
    fields.push('status = ?');
    params.push(status);
  }
  if (typeof admin_notes === 'string') {
    fields.push('admin_notes = ?');
    params.push(admin_notes);
  }
  if (!fields.length) {
    const err = new Error('Nothing to update');
    err.status = 400;
    throw err;
  }
  params.push(id);
  await pool.query(`UPDATE expert_requests SET ${fields.join(', ')} WHERE id = ?`, params);
  const [rows] = await pool.query('SELECT * FROM expert_requests WHERE id = ?', [id]);
  return rows[0];
};

/**
 * Deletes an expert request.
 */
const removeExpertRequest = async (id) => {
  await pool.query('DELETE FROM expert_requests WHERE id = ?', [id]);
};

module.exports = {
  createExpertRequest,
  listExpertRequests,
  getExpertRequest,
  updateExpertRequest,
  removeExpertRequest,
};
