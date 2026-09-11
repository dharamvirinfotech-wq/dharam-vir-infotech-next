/**
 * Visitor Controller
 * Handles HTTP request/response for unique visitor tracking.
 * Delegates database queries to visitor.service.js.
 */

const visitorService = require('../services/visitor.service');

/**
 * POST /analytics/visitor-ping
 * Public endpoint to log page visits & unique visitor analytics.
 */
exports.ping = async (req, res, next) => {
  try {
    const {
      visitor_id,
      pathname,
      device_type,
      browser,
      os,
      latitude,
      longitude,
      city,
      country,
    } = req.body;

    if (!visitor_id) {
      return res.status(400).json({ success: false, message: 'visitor_id is required' });
    }

    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.ip ||
      req.connection?.remoteAddress ||
      '127.0.0.1';
    const userAgent = req.headers['user-agent'] || '';

    await visitorService.upsertVisitor({
      visitor_id,
      pathname,
      device_type,
      browser,
      os,
      latitude,
      longitude,
      city,
      country,
      ip,
      userAgent,
    });

    res.json({ success: true, message: 'Visitor activity logged.' });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /analytics/visitors
 * Admin endpoint to list unique visitors and device stats.
 */
exports.list = async (req, res, next) => {
  try {
    const { search, limit = 100, offset = 0 } = req.query;
    const result = await visitorService.listVisitors({ search, limit, offset });

    res.json({
      success: true,
      visitors: result.visitors,
      data: result.visitors,
      stats: result.stats,
      counts: {
        total_unique: result.stats.total_unique,
        total_visits: result.stats.total_visits,
        mobile: result.stats.mobile_count,
        desktop: result.stats.desktop_count,
        tablet: result.stats.tablet_count,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /analytics/visitors/:id
 * Admin endpoint to remove a visitor record.
 */
exports.remove = async (req, res, next) => {
  try {
    await visitorService.removeVisitor(req.params.id);
    res.json({ success: true, message: 'Visitor record deleted.' });
  } catch (err) {
    next(err);
  }
};
