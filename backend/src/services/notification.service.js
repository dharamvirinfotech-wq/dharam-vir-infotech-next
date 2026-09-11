/**
 * Notification Service
 * All database queries for in-app notifications.
 */

const { pool } = require('../db/pool');

/**
 * Returns the 50 most recent notifications with an unread count.
 */
const listNotifications = async () => {
  const [notifications] = await pool.query(
    'SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50'
  );
  const [[countRow]] = await pool.query(
    'SELECT COUNT(*) AS unread_count FROM notifications WHERE is_read = false'
  );
  return {
    notifications,
    unread_count: Number(countRow?.unread_count) || 0,
  };
};

/**
 * Marks a single notification as read by id.
 */
const markRead = async (id) => {
  await pool.query('UPDATE notifications SET is_read = true WHERE id = ?', [id]);
};

/**
 * Marks all unread notifications as read.
 */
const markAllRead = async () => {
  await pool.query('UPDATE notifications SET is_read = true WHERE is_read = false');
};

/**
 * Permanently deletes a notification by id.
 */
const removeNotification = async (id) => {
  await pool.query('DELETE FROM notifications WHERE id = ?', [id]);
};

module.exports = { listNotifications, markRead, markAllRead, removeNotification };
