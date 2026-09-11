/**
 * Visitor Routes
 * Maps HTTP routes to visitor.controller.js.
 */

const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const visitorCtrl = require('../controllers/visitor.controller');

// 1. Public Heartbeat/ping
router.post('/visitor-ping', visitorCtrl.ping);

// 2. Admin: View visitors & stats
router.get('/visitors', requireAuth, requireRole('admin', 'editor'), visitorCtrl.list);

// 3. Admin: Delete visitor record
router.delete('/visitors/:id', requireAuth, requireRole('admin'), visitorCtrl.remove);

module.exports = router;
