const router = require('express').Router();
const { pool } = require('../db/pool');
const { requireAuth, requireRole } = require('../middleware/auth');

// Admin-only: list users
router.get('/', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, full_name, email, phone, role, company_name, status, two_factor_enabled, created_at
       FROM users ORDER BY created_at DESC`
    );
    res.json({ users: rows });
  } catch (err) { next(err); }
});

module.exports = router;
