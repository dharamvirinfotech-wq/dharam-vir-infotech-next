/**
 * Contact Service
 * All database queries and email dispatch for contact form submissions.
 */

const { pool }   = require('../db/pool');
const { sendMail } = require('../utils/mailer');
const { getEmailSettings } = require('../utils/emailService');
const { renderClientWelcomeEmail, renderAdminAlertEmail, renderCustomAdminEmail } = require('../utils/emailTemplates');

// ─── Submission ───────────────────────────────────────────────────────────────

/**
 * Saves a new contact inquiry to the database and returns its id.
 */
const saveInquiry = async ({ name, email, phone, subject, service, message, ip, userAgent }) => {
  const [result] = await pool.query(
    `INSERT INTO contact_inquiries (name, email, phone, subject, service, message, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone || null, subject || null, service || null, message, ip, userAgent]
  );
  return result.insertId;
};

/**
 * Sends welcome email to the client and an alert email to the admin.
 * Runs asynchronously — errors are logged but do not throw.
 */
const dispatchEmails = async ({ inquiryId, name, email, phone, service, subject, message, ip }) => {
  try {
    const settings   = await getEmailSettings();
    const adminEmail = settings.adminNotifyEmail || 'mukesh.vin99@gmail.com';

    // Client welcome email
    if (email) {
      const welcome = renderClientWelcomeEmail({ name, email, service, subject, message });
      await sendMail({ to: email, subject: welcome.subject, html: welcome.html, text: welcome.text, emailType: 'welcome_client', inquiryId, recipientName: name });
    }

    // Admin alert email
    if (adminEmail) {
      const alert = renderAdminAlertEmail({ id: inquiryId, name, email, phone, service, subject, message, ip, created_at: new Date() });
      await sendMail({ to: adminEmail, subject: alert.subject, html: alert.html, text: alert.text, replyTo: email, emailType: 'admin_alert', inquiryId, recipientName: 'Admin' });
    }
  } catch (e) {
    console.error('[ContactService] Email dispatch error:', e.message);
  }
};

// ─── Admin queries ────────────────────────────────────────────────────────────

/**
 * Returns paginated inquiries with status counts.
 */
const listInquiries = async ({ status, search, service, limit = 100, offset = 0 } = {}) => {
  const where  = [];
  const params = [];

  if (status  && status  !== 'all') { where.push('status = ?');  params.push(status); }
  if (service && service !== 'all') { where.push('service = ?'); params.push(service); }
  if (search) {
    where.push('(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [rows] = await pool.query(
    `SELECT * FROM contact_inquiries ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );
  const [[counts]] = await pool.query(`
    SELECT COUNT(*) AS total, SUM(status='new') AS new_count,
           SUM(status='replied') AS replied_count, SUM(status='closed') AS closed_count
    FROM contact_inquiries
  `);

  return { inquiries: rows, counts };
};

/**
 * Returns a single inquiry by id. Throws a 404 error if not found.
 */
const getInquiry = async (id) => {
  const [rows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
  if (!rows.length) { const e = new Error('Inquiry not found'); e.status = 404; throw e; }
  return rows[0];
};

/**
 * Updates status and/or admin_notes for an inquiry.
 */
const updateInquiry = async (id, { status, admin_notes }) => {
  const fields = []; const params = [];
  if (status)                          { fields.push('status = ?');      params.push(status); }
  if (typeof admin_notes === 'string') { fields.push('admin_notes = ?'); params.push(admin_notes); }
  if (!fields.length) { const e = new Error('Nothing to update'); e.status = 400; throw e; }
  params.push(id);
  await pool.query(`UPDATE contact_inquiries SET ${fields.join(', ')} WHERE id = ?`, params);
  const [rows] = await pool.query('SELECT * FROM contact_inquiries WHERE id = ?', [id]);
  return rows[0];
};

/**
 * Deletes an inquiry by id.
 */
const removeInquiry = async (id) => {
  await pool.query('DELETE FROM contact_inquiries WHERE id = ?', [id]);
};

/**
 * Sends a custom email from the admin panel and updates the linked inquiry to 'replied'.
 */
const sendCustomEmail = async ({ toEmail, clientName, subject, message, inquiryId, adminName }) => {
  const template = renderCustomAdminEmail({ clientName, subject, messageBody: message, adminName });
  const result   = await sendMail({ to: toEmail, subject, html: template.html, text: template.text, emailType: 'custom_admin', inquiryId: inquiryId ? Number(inquiryId) : null, recipientName: clientName });

  if (result.error) { const e = new Error('Failed to send email: ' + result.error); e.status = 500; throw e; }

  if (inquiryId) {
    await pool.query(
      `UPDATE contact_inquiries SET status = 'replied', admin_notes = CONCAT(IFNULL(admin_notes, ''), '\n[Custom Mail Sent]: ', ?) WHERE id = ?`,
      [subject, inquiryId]
    );
  }

  return { messageId: result.messageId };
};

module.exports = { saveInquiry, dispatchEmails, listInquiries, getInquiry, updateInquiry, removeInquiry, sendCustomEmail };
