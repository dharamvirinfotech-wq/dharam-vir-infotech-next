/**
 * Case Study Service
 * All database queries and data transformation for case studies.
 * No req/res objects here — only plain data in, plain data out.
 */

const { pool } = require('../db/pool');

// ─── Helpers ─────────────────────────────────────────────────────────────────

const parseJSON = (val, fallback = []) => {
  if (!val) return fallback;
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch { return fallback; }
};

/**
 * Transforms a raw DB row into the API shape consumed by the frontend.
 */
const format = (row) => ({
  ...row,
  technologies:         parseJSON(row.technologies),
  services:             parseJSON(row.services),
  metrics:              parseJSON(row.metrics),
  tags:                 parseJSON(row.tags),
  gallery:              parseJSON(row.gallery),
  faqs:                 parseJSON(row.faqs),
  key_highlights:       parseJSON(row.key_highlights),
  architecture_details: row.architecture_details || '',
  featured:             !!row.featured,
});

/**
 * Safely serialises a value to a JSON string for storage.
 */
const toJSON = (val) => JSON.stringify(Array.isArray(val) ? val : []);

// ─── Public queries ───────────────────────────────────────────────────────────

/**
 * Returns all published case studies.
 * Optional query filters: industry, featured.
 */
const listPublished = async ({ industry, featured } = {}) => {
  let sql = 'SELECT * FROM case_studies WHERE status = "published"';
  const params = [];

  if (industry) {
    sql += ' AND industry = ?';
    params.push(industry);
  }
  if (featured === '1') {
    sql += ' AND featured = 1';
  }

  sql += ' ORDER BY featured DESC, sort_order ASC, created_at DESC';

  const [rows] = await pool.query(sql, params);
  return rows.map(format);
};

/**
 * Returns a single published case study by its URL slug.
 * Throws a 404-like error if not found.
 */
const getBySlug = async (slug) => {
  const [[row]] = await pool.query(
    'SELECT * FROM case_studies WHERE slug = ? AND status = "published" LIMIT 1',
    [slug]
  );
  if (!row) {
    const err = new Error('Case study not found');
    err.status = 404;
    throw err;
  }
  return format(row);
};

// ─── Admin queries ────────────────────────────────────────────────────────────

/**
 * Returns all case studies (published + draft) for the admin panel.
 */
const listAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM case_studies ORDER BY created_at DESC'
  );
  return rows.map(format);
};

/**
 * Creates a new case study. Returns the saved record.
 */
const create = async (data) => {
  const {
    slug, title, subtitle = '', client_name = '', industry = '',
    duration = '', team_size = '', technologies, services,
    challenge = '', solution = '', results = '', architecture_details = '',
    cover_image = '', live_url = '', gallery, metrics, faqs, key_highlights,
    tags, status = 'draft', featured = false, sort_order = 0,
  } = data;

  const [result] = await pool.query(
    `INSERT INTO case_studies
       (slug, title, subtitle, client_name, industry, duration, team_size,
        technologies, services, challenge, solution, architecture_details,
        results, cover_image, live_url, gallery, metrics, faqs, key_highlights,
        tags, status, featured, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      slug, title, subtitle, client_name, industry, duration, team_size,
      toJSON(technologies), toJSON(services),
      challenge, solution, architecture_details,
      results, cover_image, live_url,
      toJSON(gallery), toJSON(metrics), toJSON(faqs), toJSON(key_highlights),
      toJSON(tags), status, featured ? 1 : 0, sort_order,
    ]
  );

  const [[row]] = await pool.query(
    'SELECT * FROM case_studies WHERE id = ?',
    [result.insertId]
  );
  return format(row);
};

/**
 * Updates an existing case study by id. Returns the updated record.
 */
const update = async (id, data) => {
  const {
    slug, title, subtitle = '', client_name = '', industry = '',
    duration = '', team_size = '', technologies, services,
    challenge = '', solution = '', results = '', architecture_details = '',
    cover_image = '', live_url = '', gallery, metrics, faqs, key_highlights,
    tags, status = 'draft', featured = false, sort_order = 0,
  } = data;

  await pool.query(
    `UPDATE case_studies SET
       slug = ?, title = ?, subtitle = ?, client_name = ?, industry = ?,
       duration = ?, team_size = ?, technologies = ?, services = ?,
       challenge = ?, solution = ?, architecture_details = ?, results = ?,
       cover_image = ?, live_url = ?, gallery = ?, metrics = ?, faqs = ?,
       key_highlights = ?, tags = ?, status = ?, featured = ?, sort_order = ?
     WHERE id = ?`,
    [
      slug, title, subtitle, client_name, industry, duration, team_size,
      toJSON(technologies), toJSON(services),
      challenge, solution, architecture_details, results,
      cover_image, live_url,
      toJSON(gallery), toJSON(metrics), toJSON(faqs), toJSON(key_highlights),
      toJSON(tags), status, featured ? 1 : 0, sort_order,
      id,
    ]
  );

  const [[row]] = await pool.query(
    'SELECT * FROM case_studies WHERE id = ?',
    [id]
  );
  return format(row);
};

/**
 * Permanently deletes a case study by id.
 */
const remove = async (id) => {
  await pool.query('DELETE FROM case_studies WHERE id = ?', [id]);
};

module.exports = {
  listPublished,
  getBySlug,
  listAll,
  create,
  update,
  remove,
};
