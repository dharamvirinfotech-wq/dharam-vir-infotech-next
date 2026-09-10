const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/auth.controller');
const pwd = require('../controllers/password.controller');

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Registration, login, password reset, current user
 *   - name: Contact
 *     description: Contact form submissions
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, password]
 *             properties:
 *               full_name: { type: string, example: Jane Doe }
 *               email: { type: string, format: email }
 *               phone: { type: string, nullable: true }
 *               password: { type: string, minLength: 8, example: Str0ngPass! }
 *               role: { type: string, enum: [admin, editor, user, employee, employer, client, developer] }
 *               company_name: { type: string, nullable: true }
 *               two_factor_enabled: { type: boolean }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { $ref: '#/components/schemas/AuthResponse' } } } }
 *       409: { description: Email already registered, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
 *       422: { description: Validation error }
 */
router.post(
  '/register',
  [
    body('full_name').trim().isLength({ min: 2 }).withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('phone').optional({ nullable: true }).isString(),
    body('role').optional().isIn(['admin', 'editor', 'user', 'employee', 'employer', 'client', 'developer']),
    body('company_name').optional({ nullable: true }).isString(),
    body('two_factor_enabled').optional().isBoolean(),
  ],
  validate,
  ctrl.register
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200: { description: OK, content: { application/json: { schema: { $ref: '#/components/schemas/AuthResponse' } } } }
 *       401: { description: Invalid credentials }
 *       403: { description: Account not active }
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isString().notEmpty().withMessage('Password required'),
  ],
  validate,
  ctrl.login
);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user: { $ref: '#/components/schemas/AuthUser' }
 *       401: { description: Missing or invalid token }
 */
router.get('/me', requireAuth, ctrl.me);

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset link
 *     description: Always returns 200 to avoid leaking which emails are registered. If the email exists, a reset link is generated (currently logged to server console; integrate SMTP to email it).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: Acknowledged }
 */
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email required').normalizeEmail()],
  validate,
  pwd.forgotPassword
);

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password using the token from the email link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, token, password]
 *             properties:
 *               email: { type: string, format: email }
 *               token: { type: string, description: Raw token from the reset link }
 *               password: { type: string, minLength: 8 }
 *     responses:
 *       200: { description: Password updated }
 *       400: { description: Invalid or expired token }
 */
router.post(
  '/reset-password',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('token').isString().isLength({ min: 16 }).withMessage('Token is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  pwd.resetPassword
);

module.exports = router;
