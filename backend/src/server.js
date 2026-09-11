require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./routes/auth.routes');
const oauthRoutes = require('./routes/oauth.routes');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const contactRoutes = require('./routes/contact.routes');
const expertRoutes = require('./routes/expert.routes');
const developerRoutes = require('./routes/developer.routes');
const emailRoutes = require('./routes/email.routes');
const jobRoutes = require('./routes/job.routes');
const visitorRoutes = require('./routes/visitor.routes');
const notificationRoutes = require('./routes/notification.routes');
const caseStudyRoutes = require('./routes/case-study.routes');
const { notFound, errorHandler } = require('./middleware/error');
const { testConnection } = require('./db/pool');
const { configurePassport } = require('./auth/passport');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Session is required for the OAuth handshake (state cookie).
// JWT is still used for the actual app auth — sessions are short-lived here.
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-session-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: 'lax' },
  })
);
app.use(passport.initialize());
app.use(passport.session());
configurePassport();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later.' },
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Swagger UI: http://localhost:4000/api/docs   |   raw spec: /api/docs.json
app.get('/api/docs.json', (_req, res) => res.json(swaggerSpec));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// OAuth routes are NOT rate-limited the same way (the provider redirect chain hits us repeatedly)
app.use('/api/auth', oauthRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/contact', contactRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/analytics', visitorRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/case-studies', caseStudyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await testConnection();
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();
