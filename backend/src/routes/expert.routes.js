const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { requireAuth, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/expert.controller');

/**
 * @openapi
 * /experts:
 *   post:
 *     tags: [Experts]
 *     summary: Submit a "Talk To Experts" consultation request (public)
 *     description: Captures leads from the Services / Technologies / Hire / Promotion mega-menu CTA buttons.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:        { type: string, maxLength: 150 }
 *               email:       { type: string, format: email }
 *               phone:       { type: string, nullable: true, maxLength: 30 }
 *               company:     { type: string, nullable: true, maxLength: 150 }
 *               category:    { type: string, enum: [services, technologies, hire, promotion, general] }
 *               topic:       { type: string, nullable: true, maxLength: 190, description: "e.g. React.js, SEO Services" }
 *               budget:      { type: string, nullable: true, maxLength: 50 }
 *               timeline:    { type: string, nullable: true, maxLength: 50 }
 *               message:     { type: string, nullable: true, maxLength: 5000 }
 *               source_page: { type: string, nullable: true, maxLength: 255 }
 *     responses:
 *       201: { description: Created }
 *       422: { description: Validation error }
 *   get:
 *     tags: [Experts]
 *     summary: List expert requests (admin/editor)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [all, new, contacted, scheduled, closed] }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 100 }
 *       - in: query
 *         name: offset
 *         schema: { type: integer, default: 0 }
 *     responses:
 *       200: { description: OK }
 *
 * /experts/{id}:
 *   get:
 *     tags: [Experts]
 *     summary: Get a single expert request (admin/editor)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *   patch:
 *     tags: [Experts]
 *     summary: Update status / notes (admin/editor)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:      { type: string, enum: [new, contacted, scheduled, closed] }
 *               admin_notes: { type: string, nullable: true }
 *     responses:
 *       200: { description: Updated }
 *   delete:
 *     tags: [Experts]
 *     summary: Delete an expert request (admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 */

// Public submission
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2, max: 150 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('phone').optional({ nullable: true }).isString().isLength({ max: 30 }),
    body('company').optional({ nullable: true }).isString().isLength({ max: 150 }),
    body('category').optional().isIn(['services', 'technologies', 'hire', 'promotion', 'general']),
    body('topic').optional({ nullable: true }).isString().isLength({ max: 190 }),
    body('budget').optional({ nullable: true }).isString().isLength({ max: 50 }),
    body('timeline').optional({ nullable: true }).isString().isLength({ max: 50 }),
    body('message').optional({ nullable: true }).isString().isLength({ max: 5000 }),
    body('source_page').optional({ nullable: true }).isString().isLength({ max: 255 }),
  ],
  validate,
  ctrl.create
);

// Admin / editor
router.get('/', requireAuth, requireRole('admin', 'editor'), ctrl.list);
router.get('/:id', requireAuth, requireRole('admin', 'editor'), ctrl.get);
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  [
    body('status').optional().isIn(['new', 'contacted', 'scheduled', 'closed']),
    body('admin_notes').optional({ nullable: true }).isString().isLength({ max: 5000 }),
  ],
  validate,
  ctrl.updateStatus
);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.remove);

module.exports = router;
