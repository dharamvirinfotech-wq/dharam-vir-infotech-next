/**
 * User Controller
 * Handles HTTP request/response for user management.
 * Delegates DB operations to email-settings.service.js listUsers.
 */

const emailSettingsService = require('../services/email-settings.service');

// GET /users (Admin)
exports.list = async (req, res, next) => {
  try {
    const rows = await emailSettingsService.listUsers();
    res.json({ users: rows });
  } catch (err) {
    next(err);
  }
};
