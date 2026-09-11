/**
 * Case Study Routes
 * Maps HTTP methods + URL paths to controller functions.
 * No business logic here — only routing + middleware.
 */

const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/case-study.controller');

const ADMIN_ROLES = ['admin', 'superadmin'];

// ─── Public routes ────────────────────────────────────────────────────────────
router.get('/',              ctrl.listPublished);   // All published case studies
router.get('/slug/:slug',    ctrl.getBySlug);       // Single case study by slug

// ─── Admin-only routes ────────────────────────────────────────────────────────
router.get('/admin/all',     requireAuth, requireRole(...ADMIN_ROLES), ctrl.listAll);
router.post('/admin',        requireAuth, requireRole(...ADMIN_ROLES), ctrl.create);
router.put('/admin/:id',     requireAuth, requireRole(...ADMIN_ROLES), ctrl.update);
router.delete('/admin/:id',  requireAuth, requireRole(...ADMIN_ROLES), ctrl.remove);

module.exports = router;
