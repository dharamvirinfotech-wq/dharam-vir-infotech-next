/**
 * Notification Routes
 * Maps HTTP routes to notification.controller.js.
 */

const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const notifCtrl = require('../controllers/notification.controller');

// 1. GET /notifications (Admin/Editor)
router.get('/', requireAuth, requireRole('admin', 'editor'), notifCtrl.list);

// 2. PATCH /notifications/:id/read (Admin/Editor)
router.patch('/:id/read', requireAuth, requireRole('admin', 'editor'), notifCtrl.markRead);

// 3. POST /notifications/mark-all-read (Admin/Editor)
router.post('/mark-all-read', requireAuth, requireRole('admin', 'editor'), notifCtrl.markAllRead);

// 4. DELETE /notifications/:id (Admin)
router.delete('/:id', requireAuth, requireRole('admin'), notifCtrl.remove);

module.exports = router;
