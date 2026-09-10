const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function publicUser(u) {
  return {
    id: u.id,
    full_name: u.full_name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    company_name: u.company_name,
    status: u.status,
    two_factor_enabled: !!u.two_factor_enabled,
    avatar_url: u.avatar_url,
    provider: u.provider,
    created_at: u.created_at,
  };
}

const APP_URL = () => process.env.APP_URL || 'http://localhost:5173';

function redirectWithToken(req, res) {
  const token = signToken(req.user);
  const userParam = encodeURIComponent(JSON.stringify(publicUser(req.user)));
  res.redirect(`${APP_URL()}/auth/oauth/callback?token=${token}&user=${userParam}`);
}

function redirectWithError(message) {
  return (_req, res) =>
    res.redirect(`${APP_URL()}/auth/oauth/callback?error=${encodeURIComponent(message)}`);
}

// ---------- Google ----------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${APP_URL()}/auth/oauth/callback?error=google_failed`,
  }),
  redirectWithToken
);

// ---------- Facebook ----------
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'], session: false })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: `${APP_URL()}/auth/oauth/callback?error=facebook_failed`,
  }),
  redirectWithToken
);

// ---------- Errors ----------
router.use((err, _req, res, _next) => {
  console.error('[oauth] error:', err.message);
  res.redirect(`${APP_URL()}/auth/oauth/callback?error=${encodeURIComponent(err.message)}`);
});

module.exports = router;
