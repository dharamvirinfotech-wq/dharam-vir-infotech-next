const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/pool');

const RESET_TTL_MIN = Number(process.env.RESET_TOKEN_TTL_MIN || 60);

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// POST /auth/forgot-password
// Always responds 200 to avoid leaking which emails are registered.
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [users] = await pool.query('SELECT id, email FROM users WHERE email = ? LIMIT 1', [email]);

    if (users.length) {
      const user = users[0];
      const rawToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = hashToken(rawToken);
      const expiresAt = new Date(Date.now() + RESET_TTL_MIN * 60 * 1000);

      // Invalidate any prior unused tokens
      await pool.query(
        `UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0`,
        [user.id]
      );
      await pool.query(
        `INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)`,
        [user.id, tokenHash, expiresAt]
      );

      const appUrl = process.env.APP_URL || 'http://localhost:5173';
      const resetLink = `${appUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;

      // TODO: send via real mailer (SMTP). For now we log it.
      console.log(`[password-reset] link for ${user.email}: ${resetLink}`);
    }

    res.json({ message: 'If an account exists for that email, a reset link has been sent.' });
  } catch (err) { next(err); }
};

// POST /auth/reset-password
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;
    const [users] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (!users.length) return res.status(400).json({ message: 'Invalid or expired token' });

    const userId = users[0].id;
    const tokenHash = hashToken(token);

    const [rows] = await pool.query(
      `SELECT id, expires_at, used FROM password_resets
       WHERE user_id = ? AND token_hash = ? LIMIT 1`,
      [userId, tokenHash]
    );
    if (!rows.length) return res.status(400).json({ message: 'Invalid or expired token' });

    const record = rows[0];
    if (record.used) return res.status(400).json({ message: 'Token has already been used' });
    if (new Date(record.expires_at).getTime() < Date.now()) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [password_hash, userId]);
    await pool.query('UPDATE password_resets SET used = 1 WHERE id = ?', [record.id]);

    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) { next(err); }
};
