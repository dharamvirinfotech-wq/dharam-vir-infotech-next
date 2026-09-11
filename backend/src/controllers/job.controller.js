/**
 * Job Controller
 * Handles HTTP request/response for job postings and applications.
 * Validates input, calls the service layer, and sends structured JSON responses.
 * No database queries here.
 */

const jobService = require('../services/job.service');

// ─── Public: Job Postings ─────────────────────────────────────────────────────

/**
 * GET /api/jobs
 * Returns all active job postings. Accepts ?department, ?type, ?search filters.
 */
exports.listActiveJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.listActiveJobs(req.query);
    res.json({ success: true, jobs, data: jobs });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/jobs/:slug
 * Returns a single active job posting by URL slug.
 */
exports.getJobBySlug = async (req, res, next) => {
  try {
    const job = await jobService.getJobBySlug(req.params.slug);
    res.json({ success: true, job });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ success: false, message: err.message });
    next(err);
  }
};

// ─── Public: Applications ─────────────────────────────────────────────────────

/**
 * POST /api/jobs/apply
 * Submits a job application (with optional resume file upload).
 */
exports.submitApplication = async (req, res, next) => {
  try {
    const ip        = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    const { applicationId, applicantName, targetTitle } = await jobService.submitApplication({
      body: req.body,
      file: req.file,
      ip,
      userAgent,
    });

    res.status(201).json({
      success: true,
      message: `Thank you, ${applicantName}! Your application for ${targetTitle} has been submitted. A confirmation email has been sent to your inbox.`,
      application_id: applicationId,
    });
  } catch (err) {
    if (err.status === 400) return res.status(400).json({ success: false, message: err.message });
    next(err);
  }
};

// ─── Admin: Job Postings ──────────────────────────────────────────────────────

/**
 * GET /api/jobs/admin/all
 * Returns all job postings (active + draft) with application counts.
 */
exports.listAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.listAllJobs();
    res.json({ success: true, jobs, data: jobs });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/jobs/admin
 * Creates a new job posting.
 */
exports.createJob = async (req, res, next) => {
  try {
    const result = await jobService.createJob(req.body);
    res.status(201).json({ success: true, message: 'Job posting created successfully.', ...result });
  } catch (err) {
    if (err.status === 400) return res.status(400).json({ success: false, message: err.message });
    next(err);
  }
};

/**
 * PUT /api/jobs/admin/:id  |  PATCH /api/jobs/admin/:id
 * Fully or partially updates a job posting (supports both PUT and PATCH).
 */
exports.updateJob = async (req, res, next) => {
  try {
    const result = await jobService.updateJob(req.params.id, req.body);
    res.json({ success: true, message: 'Job posting updated successfully.', ...result });
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ success: false, message: err.message });
    next(err);
  }
};

/**
 * DELETE /api/jobs/admin/:id
 * Permanently deletes a job posting.
 */
exports.deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id);
    res.json({ success: true, message: 'Job posting deleted.' });
  } catch (err) {
    next(err);
  }
};

// ─── Admin: Applications ──────────────────────────────────────────────────────

/**
 * GET /api/jobs/admin/applications
 * Returns paginated job applications with status counts.
 */
exports.listApplications = async (req, res, next) => {
  try {
    const result = await jobService.listApplications(req.query);
    res.json({ success: true, ...result, data: result.applications });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/jobs/admin/applications/:id
 * Updates status and/or admin notes for a single application.
 */
exports.updateApplication = async (req, res, next) => {
  try {
    const { status, admin_notes } = req.body;

    if (!status && admin_notes === undefined) {
      return res.json({ success: true, message: 'Nothing to update.' });
    }

    await jobService.updateApplication(req.params.id, { status, admin_notes });
    res.json({ success: true, message: 'Application updated successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/jobs/admin/applications/:id
 * Permanently deletes a job application.
 */
exports.deleteApplication = async (req, res, next) => {
  try {
    await jobService.deleteApplication(req.params.id);
    res.json({ success: true, message: 'Application deleted.' });
  } catch (err) {
    next(err);
  }
};
