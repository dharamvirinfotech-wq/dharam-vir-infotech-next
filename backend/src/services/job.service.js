/**
 * Job Service
 * All database queries and business logic for job postings and applications.
 * No req/res objects here — only plain data in, plain data out.
 */

const path   = require('path');
const fs     = require('fs');
const multer = require('multer');
const { pool }                    = require('../db/pool');
const { sendMail }                = require('../utils/mailer');
const { renderCareerWelcomeEmail } = require('../utils/emailTemplates');

// ─── Multer setup (resume uploads) ────────────────────────────────────────────

const uploadDir = path.join(__dirname, '../../uploads/resumes');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename:    (_req, file, cb) => {
    const ext      = path.extname(file.originalname).toLowerCase();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    cb(null, `resume_${Date.now()}_${safeName}${ext}`);
  },
});

const resumeUpload = multer({
  storage,
  limits:     { fileSize: 10 * 1024 * 1024 },   // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext     = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext)
      ? cb(null, true)
      : cb(new Error('Only PDF, DOC, and DOCX documents are supported.'));
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const parseJsonCol = (val) => {
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val || '[]'); } catch { return []; }
};

const toJsonStr = (val) => {
  if (val === undefined || val === null) return JSON.stringify([]);
  if (typeof val === 'string') return val;
  return JSON.stringify(val);
};

const formatJob = (j) => ({
  ...j,
  status:           j.status || 'active',
  is_active:        j.status === 'active' ? 1 : 0,
  responsibilities: parseJsonCol(j.responsibilities),
  requirements:     parseJsonCol(j.requirements),
  skills:           parseJsonCol(j.skills),
});

// ─── Public: Job Postings ─────────────────────────────────────────────────────

/**
 * Returns all active job postings.
 * Optional filters: department, type, search.
 */
const listActiveJobs = async ({ department, type, search } = {}) => {
  const where  = ["status = 'active'"];
  const params = [];

  if (department && department !== 'all') { where.push('department = ?'); params.push(department); }
  if (type       && type       !== 'all') { where.push('job_type = ?');   params.push(type); }
  if (search) {
    where.push('(title LIKE ? OR description LIKE ? OR location LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  const [jobs] = await pool.query(
    `SELECT id, slug, title, department, location, job_type, experience,
            salary, description, responsibilities, requirements, skills, created_at
     FROM job_postings
     WHERE ${where.join(' AND ')}
     ORDER BY id DESC`,
    params
  );
  return jobs.map(formatJob);
};

/**
 * Returns a single active job posting by its URL slug.
 */
const getJobBySlug = async (slug) => {
  const [rows] = await pool.query(
    'SELECT * FROM job_postings WHERE slug = ? AND status = "active" LIMIT 1',
    [slug]
  );
  if (!rows.length) {
    const err = new Error('Job posting not found or is no longer active.');
    err.status = 404;
    throw err;
  }
  return formatJob(rows[0]);
};

// ─── Public: Applications ─────────────────────────────────────────────────────

/**
 * Saves a job application to the database, sends a welcome email to the
 * applicant, and creates an in-app notification for admins.
 * Returns the new application id.
 */
const submitApplication = async ({ body, file, ip, userAgent }) => {
  const {
    job_id, job_slug, job_title, fullName, email, phone,
    experience, expectedSalary, portfolioUrl, coverLetter,
    visitor_id, latitude, longitude, location_address,
  } = body;

  const applicantName  = (fullName || body.full_name || '').trim();
  const applicantEmail = (email || '').trim().toLowerCase();
  const applicantPhone = (phone || '').trim();
  const targetTitle    = (job_title || 'General Application').trim();

  if (!applicantName || !applicantEmail || !applicantPhone) {
    const err = new Error('Name, Email, and Phone number are required.');
    err.status = 400;
    throw err;
  }

  const resumeUrl = file
    ? `/uploads/resumes/${file.filename}`
    : (body.resume_url || null);

  const [result] = await pool.query(
    `INSERT INTO job_applications
       (job_id, job_slug, job_title, full_name, email, phone, experience,
        expected_salary, portfolio_url, resume_url, cover_letter, visitor_id,
        ip_address, user_agent, latitude, longitude, location_address, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [
      job_id ? Number(job_id) : null,
      job_slug        || null,
      targetTitle,
      applicantName,
      applicantEmail,
      applicantPhone,
      experience      || null,
      expectedSalary  || body.expected_salary || null,
      portfolioUrl    || body.portfolio_url   || null,
      resumeUrl,
      coverLetter     || body.cover_letter    || null,
      visitor_id      || null,
      ip,
      userAgent,
      latitude  ? Number(latitude)  : null,
      longitude ? Number(longitude) : null,
      location_address || null,
    ]
  );

  const applicationId = result.insertId;

  // Send confirmation email to applicant (non-blocking)
  try {
    const emailContent = renderCareerWelcomeEmail({ fullName: applicantName, jobTitle: targetTitle, email: applicantEmail });
    await sendMail({ to: applicantEmail, subject: emailContent.subject, html: emailContent.html, text: emailContent.text, emailType: 'welcome_client', recipientName: applicantName });
  } catch (e) {
    console.error('[JobService] Applicant email failed:', e.message);
  }

  // Create in-app admin notification (non-blocking)
  try {
    await pool.query(
      `INSERT INTO notifications (title, message, type, link, is_read, metadata) VALUES (?, ?, 'job_application', '/admin/job-applications', false, ?)`,
      [
        `New Application: ${applicantName}`,
        `${applicantName} applied for "${targetTitle}". Experience: ${experience || 'Not specified'}.`,
        JSON.stringify({ application_id: applicationId, email: applicantEmail, phone: applicantPhone, job_title: targetTitle, resume_url: resumeUrl }),
      ]
    );
  } catch (e) {
    console.error('[JobService] Admin notification failed:', e.message);
  }

  return { applicationId, applicantName, targetTitle };
};

// ─── Admin: Job Postings ──────────────────────────────────────────────────────

/**
 * Returns all job postings (active + draft) with application counts.
 */
const listAllJobs = async () => {
  const [jobs] = await pool.query(`
    SELECT j.*, COUNT(a.id) AS applications_count
    FROM job_postings j
    LEFT JOIN job_applications a ON j.id = a.job_id
    GROUP BY j.id
    ORDER BY j.id DESC
  `);
  return jobs.map(formatJob);
};

/**
 * Creates a new job posting. Returns the new record's id and slug.
 */
const createJob = async (data) => {
  const { title, department, location, job_type, experience, salary, description, responsibilities, requirements, skills, status, is_active } = data;

  if (!title || !department) {
    const err = new Error('Job title and department are required.');
    err.status = 400;
    throw err;
  }

  const finalStatus = status || (is_active ? 'active' : 'draft');
  const slug = `${slugify(title)}-${Date.now().toString().slice(-4)}`;

  const [result] = await pool.query(
    `INSERT INTO job_postings
       (slug, title, department, location, job_type, experience, salary,
        description, responsibilities, requirements, skills, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      slug, title.trim(), department.trim(),
      location     || 'Remote / Noida, India',
      job_type     || 'Full-Time',
      experience   || '3+ Years',
      salary       || null,
      description  || null,
      JSON.stringify(Array.isArray(responsibilities) ? responsibilities : []),
      JSON.stringify(Array.isArray(requirements)     ? requirements     : []),
      JSON.stringify(Array.isArray(skills)           ? skills           : []),
      finalStatus,
    ]
  );

  return { job_id: result.insertId, slug, status: finalStatus, is_active: finalStatus === 'active' ? 1 : 0 };
};

/**
 * Partially or fully updates a job posting by id (supports PUT and PATCH).
 */
const updateJob = async (id, data) => {
  const [existing] = await pool.query('SELECT * FROM job_postings WHERE id = ?', [id]);
  if (!existing.length) {
    const err = new Error('Job posting not found.');
    err.status = 404;
    throw err;
  }
  const current = existing[0];

  const title       = data.title       !== undefined ? data.title       : current.title;
  const department  = data.department  !== undefined ? data.department  : current.department;
  const location    = data.location    !== undefined ? data.location    : current.location;
  const job_type    = data.job_type    !== undefined ? data.job_type    : current.job_type;
  const experience  = data.experience  !== undefined ? data.experience  : current.experience;
  const salary      = data.salary      !== undefined ? data.salary      : current.salary;
  const description = data.description !== undefined ? data.description : current.description;

  let status = current.status;
  if      (data.status    !== undefined) status = data.status;
  else if (data.is_active !== undefined) status = data.is_active ? 'active' : 'draft';

  const responsibilities = toJsonStr(data.responsibilities !== undefined ? data.responsibilities : current.responsibilities);
  const requirements     = toJsonStr(data.requirements     !== undefined ? data.requirements     : current.requirements);
  const skills           = toJsonStr(data.skills           !== undefined ? data.skills           : current.skills);

  await pool.query(
    `UPDATE job_postings SET
       title = ?, department = ?, location = ?, job_type = ?, experience = ?,
       salary = ?, description = ?, responsibilities = ?, requirements = ?,
       skills = ?, status = ?
     WHERE id = ?`,
    [String(title).trim(), String(department).trim(), location, job_type, experience, salary, description, responsibilities, requirements, skills, status, id]
  );

  return { status, is_active: status === 'active' ? 1 : 0 };
};

/**
 * Deletes a job posting by id.
 */
const deleteJob = async (id) => {
  await pool.query('DELETE FROM job_postings WHERE id = ?', [id]);
};

// ─── Admin: Applications ──────────────────────────────────────────────────────

/**
 * Returns paginated job applications with summary counts.
 */
const listApplications = async ({ status, job_id, search, limit = 50, offset = 0 } = {}) => {
  const where  = [];
  const params = [];

  if (status && status !== 'all') { where.push('status = ?');  params.push(status); }
  if (job_id && job_id !== 'all') { where.push('job_id = ?');  params.push(Number(job_id)); }
  if (search) {
    where.push('(full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR job_title LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [applications] = await pool.query(
    `SELECT * FROM job_applications ${whereSql} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );

  const [[counts]] = await pool.query(`
    SELECT
      COUNT(*) AS total,
      SUM(status = 'new')         AS new_count,
      SUM(status = 'reviewing')   AS reviewing_count,
      SUM(status = 'shortlisted') AS shortlisted_count,
      SUM(status = 'hired')       AS hired_count,
      SUM(status = 'rejected')    AS rejected_count
    FROM job_applications
  `);

  return {
    applications,
    counts: {
      total:       Number(counts?.total)             || 0,
      new:         Number(counts?.new_count)         || 0,
      reviewing:   Number(counts?.reviewing_count)   || 0,
      shortlisted: Number(counts?.shortlisted_count) || 0,
      hired:       Number(counts?.hired_count)       || 0,
      rejected:    Number(counts?.rejected_count)    || 0,
    },
  };
};

/**
 * Updates status and/or admin notes for a single application.
 */
const updateApplication = async (id, { status, admin_notes }) => {
  const updates = [];
  const params  = [];

  if (status      !== undefined) { updates.push('status = ?');      params.push(status); }
  if (admin_notes !== undefined) { updates.push('admin_notes = ?'); params.push(admin_notes); }
  if (!updates.length) return;

  params.push(id);
  await pool.query(`UPDATE job_applications SET ${updates.join(', ')} WHERE id = ?`, params);
};

/**
 * Deletes a job application by id.
 */
const deleteApplication = async (id) => {
  await pool.query('DELETE FROM job_applications WHERE id = ?', [id]);
};

module.exports = {
  resumeUpload,
  // Public
  listActiveJobs,
  getJobBySlug,
  submitApplication,
  // Admin - jobs
  listAllJobs,
  createJob,
  updateJob,
  deleteJob,
  // Admin - applications
  listApplications,
  updateApplication,
  deleteApplication,
};
