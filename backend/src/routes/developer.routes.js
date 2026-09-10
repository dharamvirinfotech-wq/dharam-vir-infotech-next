const router = require('express').Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/developer.controller');

// Roles that can manage developer content
const CMS_ROLES = ['admin', 'editor', 'employee', 'employer'];

/**
 * @openapi
 * /developers:
 *   get:
 *     tags: [Developers]
 *     summary: Public list of developers (filterable by status, category, search, featured)
 *     responses: { 200: { description: OK } }
 *   post:
 *     tags: [Developers]
 *     summary: Create a developer profile (admin/editor/employee/employer)
 *     security: [{ bearerAuth: [] }]
 *     responses: { 201: { description: Created } }
 *
 * /developers/{key}:
 *   get:
 *     tags: [Developers]
 *     summary: Get a developer by numeric id or slug
 *     parameters: [{ in: path, name: key, required: true, schema: { type: string } }]
 *     responses: { 200: { description: OK }, 404: { description: Not Found } }
 *
 * /developers/{id}:
 *   patch:
 *     tags: [Developers]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Updated } }
 *   delete:
 *     tags: [Developers]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Deleted } }
 */
router.get('/', ctrl.list);
router.get('/:key', ctrl.get);
router.post('/', requireAuth, requireRole(...CMS_ROLES), ctrl.create);
router.patch('/:id', requireAuth, requireRole(...CMS_ROLES), ctrl.update);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.remove);

module.exports = router;
