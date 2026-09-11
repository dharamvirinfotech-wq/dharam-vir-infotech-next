/**
 * Notification Controller
 * Handles HTTP request/response for in-app notifications.
 * Delegates DB operations to notification.service.js.
 */

const notificationService = require('../services/notification.service');

// GET /notifications (Admin/Editor)
exports.list = async (req, res, next) => {
  try {
    const data = await notificationService.listNotifications();
    res.json({
      success: true,
      notifications: data.notifications,
      unread_count: data.unread_count,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /notifications/:id/read (Admin/Editor)
exports.markRead = async (req, res, next) => {
  try {
    await notificationService.markRead(req.params.id);
    res.json({ success: true, message: 'Notification marked as read.' });
  } catch (err) {
    next(err);
  }
};

// POST /notifications/mark-all-read (Admin/Editor)
exports.markAllRead = async (req, res, next) => {
  try {
    await notificationService.markAllRead();
    res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (err) {
    next(err);
  }
};

// DELETE /notifications/:id (Admin)
exports.remove = async (req, res, next) => {
  try {
    await notificationService.removeNotification(req.params.id);
    res.json({ success: true, message: 'Notification deleted.' });
  } catch (err) {
    next(err);
  }
};
