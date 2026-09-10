const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { requireAuth, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/contact.controller');

/**
 * @openapi
 * /contact:
 *   post:
 *     tags: [Contact]
 *     summary: Submit a contact-us inquiry (public)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string, maxLength: 150 }
 *               email: { type: string, format: email }
 *               phone: { type: string, nullable: true, maxLength: 30 }
 *               subject: { type: string, nullable: true, maxLength: 255 }
 *               service: { type: string, nullable: true, maxLength: 150 }
 *               message: { type: string, minLength: 5, maxLength: 5000 }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 message: { type: string }
 *       422: { description: Validation error }
 *   get:
 *     tags: [Contact]
 *     summary: List inquiries (admin/editor)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [all, new, replied, closed] }
 *       - in: query
 *         name: service
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
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inquiries:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/ContactInquiry' }
 *                 counts:
 *                   type: object
 *                   properties:
 *                     total: { type: integer }
 *                     new_count: { type: integer }
 *                     replied_count: { type: integer }
 *                     closed_count: { type: integer }
 *
 * /contact/{id}:
 *   get:
 *     tags: [Contact]
 *     summary: Get a single inquiry (admin/editor)
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
 *     tags: [Contact]
 *     summary: Update inquiry status / notes (admin/editor)
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
 *               status: { type: string, enum: [new, replied, closed] }
 *               admin_notes: { type: string, nullable: true }
 *     responses:
 *       200: { description: Updated }
 *   delete:
 *     tags: [Contact]
 *     summary: Delete an inquiry (admin)
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
    body('subject').optional({ nullable: true }).isString().isLength({ max: 255 }),
    body('service').optional({ nullable: true }).isString().isLength({ max: 150 }),
    body('message').trim().isLength({ min: 5, max: 5000 }).withMessage('Message is required'),
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
    body('status').optional().isIn(['new', 'replied', 'closed']),
    body('admin_notes').optional({ nullable: true }).isString().isLength({ max: 5000 }),
  ],
  validate,
  ctrl.updateStatus
);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.remove);

module.exports = router;
