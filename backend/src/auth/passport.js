const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { pool } = require('../db/pool');

/**
 * Find or create a user from an OAuth profile.
 * Strategy:
 *  1. Match by (provider, provider_id) — same social account.
 *  2. Otherwise match by email — link this social login to the existing local account.
 *  3. Otherwise create a new user with provider info and no password.
 */
async function upsertOAuthUser({ provider, providerId, email, fullName, avatarUrl }) {
  if (!email) throw new Error(`No email returned from ${provider}. Please grant email permission.`);

  // 1. Existing social account
  const [byProvider] = await pool.query(
    'SELECT * FROM users WHERE provider = ? AND provider_id = ? LIMIT 1',
    [provider, providerId]
  );
  if (byProvider.length) return byProvider[0];

  // 2. Existing local/other account with same email — link it
  const [byEmail] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  if (byEmail.length) {
    const u = byEmail[0];
    await pool.query(
      `UPDATE users
         SET provider = ?, provider_id = ?, avatar_url = COALESCE(avatar_url, ?)
       WHERE id = ?`,
      [provider, providerId, avatarUrl || null, u.id]
    );
    const [refreshed] = await pool.query('SELECT * FROM users WHERE id = ?', [u.id]);
    return refreshed[0];
  }

  // 3. Brand new user
  const [result] = await pool.query(
    `INSERT INTO users (full_name, email, password_hash, role, status, provider, provider_id, avatar_url)
     VALUES (?, ?, NULL, 'user', 'active', ?, ?, ?)`,
    [fullName || email.split('@')[0], email, provider, providerId, avatarUrl || null]
  );
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
  return rows[0];
}

function configurePassport() {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      done(null, rows[0] || null);
    } catch (err) { done(err); }
  });

  // ---------- Google ----------
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            const user = await upsertOAuthUser({
              provider: 'google',
              providerId: profile.id,
              email,
              fullName: profile.displayName,
              avatarUrl: profile.photos?.[0]?.value,
            });
            done(null, user);
          } catch (err) { done(err); }
        }
      )
    );
  } else {
    console.warn('[passport] GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing — Google login disabled.');
  }

  // ---------- Facebook ----------
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/api/auth/facebook/callback',
          profileFields: ['id', 'displayName', 'emails', 'photos'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            const user = await upsertOAuthUser({
              provider: 'facebook',
              providerId: profile.id,
              email,
              fullName: profile.displayName,
              avatarUrl: profile.photos?.[0]?.value,
            });
            done(null, user);
          } catch (err) { done(err); }
        }
      )
    );
  } else {
    console.warn('[passport] FACEBOOK_APP_ID / FACEBOOK_APP_SECRET missing — Facebook login disabled.');
  }
}

module.exports = { configurePassport };
