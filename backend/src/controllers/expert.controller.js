/**
 * Expert Controller
 * Handles HTTP request/response for expert consultation requests.
 * Delegates DB operations to expert.service.js.
 */

const expertService = require('../services/expert.service');

// Public: submit a "Talk To Experts" consultation request
exports.create = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone = null,
      company = null,
      category = 'general',
      topic = null,
      budget = null,
      timeline = null,
      message = null,
      source_page = null,
    } = req.body;

    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().slice(0, 64);
    const ua = (req.headers['user-agent'] || '').toString().slice(0, 500);

    const id = await expertService.createExpertRequest({
      name,
      email,
      phone,
      company,
      category,
      topic,
      budget,
      timeline,
      message,
      source_page,
      ip,
      ua,
    });

    res.status(201).json({ id, message: 'Request received. An expert will contact you shortly.' });
  } catch (err) {
    next(err);
  }
};

// Admin/editor: list with filters
exports.list = async (req, res, next) => {
  try {
    const { status, category, search, limit = 100, offset = 0 } = req.query;
    const data = await expertService.listExpertRequests({ status, category, search, limit, offset });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Admin/editor: get single request
exports.get = async (req, res, next) => {
  try {
    const request = await expertService.getExpertRequest(req.params.id);
    res.json({ request });
  } catch (err) {
    next(err);
  }
};

// Admin/editor: update status or notes
exports.updateStatus = async (req, res, next) => {
  try {
    const { status, admin_notes } = req.body;
    const request = await expertService.updateExpertRequest(req.params.id, { status, admin_notes });
    res.json({ request });
  } catch (err) {
    next(err);
  }
};

// Admin: remove request
exports.remove = async (req, res, next) => {
  try {
    await expertService.removeExpertRequest(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
