const { pool } = require('../db/pool');

const slugify = (s) =>
  String(s || '').toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const initialsOf = (s) =>
  String(s || '').trim().split(/\s+/).map((p) => p[0] || '').join('').slice(0, 2).toUpperCase();

const parseJson = (val, fallback = []) => {
  if (val == null) return fallback;
  if (Array.isArray(val)) return val;
  if (typeof val === 'object') return val;
  try { return JSON.parse(val); } catch { return fallback; }
};

const shape = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  role: row.role,
  experience: row.experience,
  hourlyRate: row.hourly_rate,
  rating: Number(row.rating),
  location: row.location,
  avatar: row.avatar,
  bio: row.bio,
  availability: row.availability,
  projectsCompleted: row.projects_completed,
  education: row.education,
  skills: parseJson(row.skills, []),
  languages: parseJson(row.languages, []),
  certifications: parseJson(row.certifications, []),
  categories: parseJson(row.categories, []),
  status: row.status,
  featured: !!row.featured,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

exports.list = async (req, res, next) => {
  try {
    const { status, search, category, featured } = req.query;
    const where = [];
    const params = [];
    if (status && status !== 'all') { where.push('status = ?'); params.push(status); }
    if (featured === 'true' || featured === '1') { where.push('featured = 1'); }
    if (search) {
      where.push('(name LIKE ? OR role LIKE ? OR location LIKE ?)');
      const like = `%${search}%`;
      params.push(like, like, like);
    }
    if (category) {
      where.push('JSON_CONTAINS(categories, JSON_QUOTE(?))');
      params.push(category);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const [rows] = await pool.query(
      `SELECT * FROM developers ${whereSql} ORDER BY featured DESC, rating DESC, id DESC`,
      params
    );
    res.json({ developers: rows.map(shape) });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const key = req.params.key;
    const isNumeric = /^\d+$/.test(key);
    const [rows] = await pool.query(
      `SELECT * FROM developers WHERE ${isNumeric ? 'id' : 'slug'} = ? LIMIT 1`,
      [isNumeric ? Number(key) : key]
    );
    if (!rows.length) return res.status(404).json({ message: 'Developer not found' });
    res.json({ developer: shape(rows[0]) });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.role || !b.experience) {
      return res.status(422).json({ message: 'name, role and experience are required' });
    }
    const slug = (b.slug && slugify(b.slug)) || slugify(b.name);
    const avatar = (b.avatar || initialsOf(b.name)).toUpperCase().slice(0, 3);
    const [r] = await pool.query(
      `INSERT INTO developers
         (slug,name,role,experience,hourly_rate,rating,location,avatar,bio,availability,
          projects_completed,education,skills,languages,certifications,categories,status,featured)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        slug, b.name, b.role, b.experience, b.hourlyRate || null,
        Number(b.rating) || 0, b.location || null, avatar, b.bio || null,
        b.availability || 'Full-time', Number(b.projectsCompleted) || 0, b.education || null,
        JSON.stringify(b.skills || []), JSON.stringify(b.languages || []),
        JSON.stringify(b.certifications || []), JSON.stringify(b.categories || []),
        b.status === 'inactive' ? 'inactive' : 'active',
        b.featured ? 1 : 0,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM developers WHERE id = ?', [r.insertId]);
    res.status(201).json({ developer: shape(rows[0]) });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A developer with that slug already exists' });
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const b = req.body || {};
    const fields = [];
    const params = [];
    const setStr = (k, dbCol) => {
      if (b[k] !== undefined) { fields.push(`${dbCol} = ?`); params.push(b[k]); }
    };
    const setJson = (k, dbCol) => {
      if (b[k] !== undefined) { fields.push(`${dbCol} = ?`); params.push(JSON.stringify(b[k] || [])); }
    };
    if (b.slug !== undefined) { fields.push('slug = ?'); params.push(slugify(b.slug)); }
    setStr('name', 'name');
    setStr('role', 'role');
    setStr('experience', 'experience');
    if (b.hourlyRate !== undefined) { fields.push('hourly_rate = ?'); params.push(b.hourlyRate); }
    if (b.rating !== undefined) { fields.push('rating = ?'); params.push(Number(b.rating) || 0); }
    setStr('location', 'location');
    if (b.avatar !== undefined) { fields.push('avatar = ?'); params.push(String(b.avatar).toUpperCase().slice(0, 3)); }
    setStr('bio', 'bio');
    setStr('availability', 'availability');
    if (b.projectsCompleted !== undefined) { fields.push('projects_completed = ?'); params.push(Number(b.projectsCompleted) || 0); }
    setStr('education', 'education');
    setJson('skills', 'skills');
    setJson('languages', 'languages');
    setJson('certifications', 'certifications');
    setJson('categories', 'categories');
    if (b.status !== undefined) { fields.push('status = ?'); params.push(b.status === 'inactive' ? 'inactive' : 'active'); }
    if (b.featured !== undefined) { fields.push('featured = ?'); params.push(b.featured ? 1 : 0); }
    if (!fields.length) return res.status(400).json({ message: 'Nothing to update' });
    params.push(id);
    await pool.query(`UPDATE developers SET ${fields.join(', ')} WHERE id = ?`, params);
    const [rows] = await pool.query('SELECT * FROM developers WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Developer not found' });
    res.json({ developer: shape(rows[0]) });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A developer with that slug already exists' });
    }
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM developers WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
