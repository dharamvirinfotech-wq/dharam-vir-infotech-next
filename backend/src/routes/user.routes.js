/**
 * User Routes
 * Maps HTTP routes to user.controller.js.
 */

const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const userCtrl = require('../controllers/user.controller');

// Admin-only: list users
router.get('/', requireAuth, requireRole('admin'), userCtrl.list);

module.exports = router;
