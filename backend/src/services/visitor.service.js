/**
 * Visitor Service
 * All database queries for unique visitor tracking.
 */

const { pool } = require('../db/pool');

/**
 * Upserts a visitor record. If the visitor_id already exists, increments
 * visit_count and updates the last_seen timestamp instead of creating a duplicate.
 */
const upsertVisitor = async ({ visitor_id, pathname, device_type, browser, os, latitude, longitude, city, country, ip, userAgent }) => {
  const safePage = (pathname || '/').substring(0, 255);

  await pool.query(
    `INSERT INTO unique_visitors
       (visitor_id, ip_address, user_agent, device_type, browser, os,
        latitude, longitude, city, country, first_page, last_page, visit_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
     ON DUPLICATE KEY UPDATE
       ip_address  = VALUES(ip_address),
       user_agent  = VALUES(user_agent),
       device_type = COALESCE(VALUES(device_type), device_type),
       browser     = COALESCE(VALUES(browser), browser),
       os          = COALESCE(VALUES(os), os),
       latitude    = COALESCE(VALUES(latitude), latitude),
       longitude   = COALESCE(VALUES(longitude), longitude),
       city        = COALESCE(VALUES(city), city),
       country     = COALESCE(VALUES(country), country),
       last_page   = VALUES(last_page),
       visit_count = visit_count + 1,
       last_seen   = CURRENT_TIMESTAMP`,
    [
      visitor_id, ip, userAgent,
      device_type || 'Desktop', browser || 'Unknown', os || 'Unknown',
      latitude  ? Number(latitude)  : null,
      longitude ? Number(longitude) : null,
      city    || null, country || null,
      safePage, safePage,
    ]
  );
};

/**
 * Returns paginated visitors with device-type summary counts.
 */
const listVisitors = async ({ search, limit = 100, offset = 0 } = {}) => {
  const where  = [];
  const params = [];

  if (search) {
    where.push('(visitor_id LIKE ? OR ip_address LIKE ? OR city LIKE ? OR country LIKE ? OR browser LIKE ? OR os LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [visitors] = await pool.query(
    `SELECT * FROM unique_visitors ${whereSql} ORDER BY last_seen DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );

  const [[counts]] = await pool.query(`
    SELECT
      COUNT(*) AS total_unique,
      SUM(visit_count)            AS total_visits,
      SUM(device_type = 'Mobile')  AS mobile_count,
      SUM(device_type = 'Desktop') AS desktop_count,
      SUM(device_type = 'Tablet')  AS tablet_count
    FROM unique_visitors
  `);

  return {
    visitors,
    stats: {
      total_unique:  Number(counts?.total_unique)  || 0,
      total_visits:  Number(counts?.total_visits)  || 0,
      mobile_count:  Number(counts?.mobile_count)  || 0,
      desktop_count: Number(counts?.desktop_count) || 0,
      tablet_count:  Number(counts?.tablet_count)  || 0,
    },
  };
};

/**
 * Permanently deletes a visitor record by id.
 */
const removeVisitor = async (id) => {
  await pool.query('DELETE FROM unique_visitors WHERE id = ?', [id]);
};

module.exports = { upsertVisitor, listVisitors, removeVisitor };
