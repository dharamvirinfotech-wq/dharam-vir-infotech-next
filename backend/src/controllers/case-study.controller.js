/**
 * Case Study Controller
 * Handles HTTP request/response. Validates input, calls the service layer,
 * and sends back a structured JSON response. No DB logic here.
 */

const caseStudyService = require('../services/case-study.service');

// ─── Public endpoints ─────────────────────────────────────────────────────────

/**
 * GET /api/case-studies
 * Returns all published case studies. Supports ?industry= and ?featured=1 filters.
 */
exports.listPublished = async (req, res, next) => {
  try {
    const caseStudies = await caseStudyService.listPublished(req.query);
    res.json({ case_studies: caseStudies });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/case-studies/slug/:slug
 * Returns a single published case study by its URL slug.
 */
exports.getBySlug = async (req, res, next) => {
  try {
    const caseStudy = await caseStudyService.getBySlug(req.params.slug);
    res.json({ case_study: caseStudy });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ message: err.message });
    next(err);
  }
};

// ─── Admin endpoints ──────────────────────────────────────────────────────────

/**
 * GET /api/case-studies/admin/all
 * Returns all case studies (published + draft) for the admin panel.
 */
exports.listAll = async (req, res, next) => {
  try {
    const caseStudies = await caseStudyService.listAll();
    res.json({ case_studies: caseStudies });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/case-studies/admin
 * Creates a new case study. Requires slug and title.
 */
exports.create = async (req, res, next) => {
  try {
    const { slug, title } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ message: 'slug and title are required' });
    }

    const caseStudy = await caseStudyService.create(req.body);
    res.status(201).json({ case_study: caseStudy });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A case study with that slug already exists' });
    }
    next(err);
  }
};

/**
 * PUT /api/case-studies/admin/:id
 * Fully updates an existing case study by id.
 */
exports.update = async (req, res, next) => {
  try {
    const { slug, title } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ message: 'slug and title are required' });
    }

    const caseStudy = await caseStudyService.update(req.params.id, req.body);
    res.json({ case_study: caseStudy });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/case-studies/admin/:id
 * Permanently deletes a case study by id.
 */
exports.remove = async (req, res, next) => {
  try {
    await caseStudyService.remove(req.params.id);
    res.json({ message: 'Case study deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/case-studies/admin/upload-image
 * Uploads a cover or showcase image and returns public URL
 */
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    const publicUrl = `/uploads/portfolio/${req.file.filename}`;
    res.json({ url: publicUrl, filename: req.file.filename });
  } catch (err) {
    next(err);
  }
};

