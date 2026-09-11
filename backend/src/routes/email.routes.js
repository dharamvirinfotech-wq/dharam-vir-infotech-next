/**
 * Email Routes
 * Maps HTTP routes to email.controller.js.
 */

const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const emailCtrl = require('../controllers/email.controller');

// 1. Get all Email Logs
router.get('/logs', requireAuth, requireRole('admin', 'editor'), emailCtrl.getLogs);

// 2. Get App / SMTP Settings
router.get('/settings', requireAuth, requireRole('admin'), emailCtrl.getSettings);

// 3. Update App / SMTP Settings
router.post('/settings', requireAuth, requireRole('admin'), emailCtrl.updateSettings);

// 4. Test SMTP connection & send live test email
router.post('/test-smtp', requireAuth, requireRole('admin'), emailCtrl.testSmtp);

module.exports = router;
