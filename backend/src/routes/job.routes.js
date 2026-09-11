/**
 * Job Routes
 * Maps HTTP methods + URL paths to controller functions.
 * No business logic here — only routing + middleware.
 */

const router    = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const ctrl      = require('../controllers/job.controller');
const { resumeUpload } = require('../services/job.service');

const ADMIN_ROLES  = ['admin'];
const EDITOR_ROLES = ['admin', 'editor'];

// ─── Public routes ────────────────────────────────────────────────────────────
router.get('/',       ctrl.listActiveJobs);                              // All active jobs
router.post('/apply', resumeUpload.single('resume'), ctrl.submitApplication); // Apply for a job
router.get('/:slug',  ctrl.getJobBySlug);                               // Single job by slug

// ─── Admin: Job Postings ──────────────────────────────────────────────────────
router.get('/admin/all',   requireAuth, requireRole(...EDITOR_ROLES), ctrl.listAllJobs);
router.post('/admin',      requireAuth, requireRole(...ADMIN_ROLES),  ctrl.createJob);
router.put('/admin/:id',   requireAuth, requireRole(...ADMIN_ROLES),  ctrl.updateJob);
router.patch('/admin/:id', requireAuth, requireRole(...ADMIN_ROLES),  ctrl.updateJob);  // Same handler supports both
router.delete('/admin/:id',requireAuth, requireRole(...ADMIN_ROLES),  ctrl.deleteJob);

// ─── Admin: Applications ──────────────────────────────────────────────────────
router.get('/admin/applications',        requireAuth, requireRole(...EDITOR_ROLES), ctrl.listApplications);
router.patch('/admin/applications/:id',  requireAuth, requireRole(...EDITOR_ROLES), ctrl.updateApplication);
router.delete('/admin/applications/:id', requireAuth, requireRole(...ADMIN_ROLES),  ctrl.deleteApplication);

module.exports = router;
