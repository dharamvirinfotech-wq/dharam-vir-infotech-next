const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { requireAuth, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/hire.controller');

/**
 * @openapi
 * /hire:
 *   post:
 *     tags: [Hire]
 *     summary: Submit a "Hire Developer" request (public). Auto-creates a user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [developer_slug, developer_name, name, email, project_description]
 *             properties:
 *               developer_slug:      { type: string }
 *               developer_name:      { type: string }
 *               developer_role:      { type: string, nullable: true }
 *               name:                { type: string }
 *               email:               { type: string, format: email }
 *               phone:               { type: string, nullable: true }
 *               company:             { type: string, nullable: true }
 *               engagement_type:     { type: string, enum: [full-time, part-time, contract, project-based] }
 *               budget:              { type: string, nullable: true }
 *               timeline:            { type: string, nullable: true }
 *               project_description: { type: string }
 *               latitude:            { type: number, nullable: true, description: "Live latitude from browser geolocation" }
 *               longitude:           { type: number, nullable: true, description: "Live longitude from browser geolocation" }
 *               location_accuracy:   { type: number, nullable: true }
 *               location_address:    { type: string, nullable: true, description: "Reverse-geocoded address (optional)" }
 *     responses:
 *       201: { description: Created (user auto-created if new email) }
 *       422: { description: Validation error }
 *   get:
 *     tags: [Hire]
 *     summary: List hire requests (admin/editor)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 * /hire/{id}:
 *   get:
 *     tags: [Hire]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: OK } }
 *   patch:
 *     tags: [Hire]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Updated } }
 *   delete:
 *     tags: [Hire]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses: { 200: { description: Deleted } }
 */
router.post(
  '/',
  [
    body('developer_slug').trim().isLength({ min: 1, max: 150 }),
    body('developer_name').trim().isLength({ min: 1, max: 150 }),
    body('developer_role').optional({ nullable: true }).isString().isLength({ max: 150 }),
    body('name').trim().isLength({ min: 2, max: 150 }),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional({ nullable: true }).isString().isLength({ max: 30 }),
    body('company').optional({ nullable: true }).isString().isLength({ max: 150 }),
    body('engagement_type').optional().isIn(['full-time', 'part-time', 'contract', 'project-based']),
    body('budget').optional({ nullable: true }).isString().isLength({ max: 50 }),
    body('timeline').optional({ nullable: true }).isString().isLength({ max: 50 }),
    body('project_description').trim().isLength({ min: 5, max: 5000 }),
    body('latitude').optional({ nullable: true }).isFloat({ min: -90, max: 90 }),
    body('longitude').optional({ nullable: true }).isFloat({ min: -180, max: 180 }),
    body('location_accuracy').optional({ nullable: true }).isFloat({ min: 0 }),
    body('location_address').optional({ nullable: true }).isString().isLength({ max: 500 }),
  ],
  validate,
  ctrl.create
);

router.get('/', requireAuth, requireRole('admin', 'editor'), ctrl.list);
router.get('/:id', requireAuth, requireRole('admin', 'editor'), ctrl.get);
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  [
    body('status').optional().isIn(['new', 'contacted', 'scheduled', 'approved', 'rejected', 'completed', 'closed']),
    body('admin_notes').optional({ nullable: true }).isString().isLength({ max: 5000 }),
  ],
  validate,
  ctrl.updateStatus
);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.remove);

module.exports = router;
