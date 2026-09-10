const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/pool');

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
    created_at: u.created_at,
  };
}

exports.register = async (req, res, next) => {
  try {
    console.log('Registering user with data:', req.body);
    const {
      full_name, email, phone, password,
      role = 'user', company_name = null, two_factor_enabled = false,
    } = req.body;

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing.length) return res.status(409).json({ message: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (full_name, email, phone, password_hash, role, company_name, status, two_factor_enabled)
       VALUES (?, ?, ?, ?, ?, ?, 'active', ?)`,
      [full_name, email, phone || null, password_hash, role, company_name, two_factor_enabled ? 1 : 0]
    );

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    const user = rows[0];
    const token = signToken(user);

    res.status(201).json({ token, user: publicUser(user) });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    if (user.status !== 'active') return res.status(403).json({ message: `Account is ${user.status}` });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken(user);
    res.json({ token, user: publicUser(user) });
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json({ user: publicUser(rows[0]) });
  } catch (err) { next(err); }
};
