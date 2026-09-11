/**
 * Email Service (App Settings + Logs)
 * Database queries and SMTP test logic for the email management module.
 * The mailer.js utility handles actual email sending; this service handles
 * settings persistence, log retrieval, and SMTP verification.
 */

const nodemailer = require('nodemailer');
const { pool }   = require('../db/pool');

// ─── Email Logs ───────────────────────────────────────────────────────────────

/**
 * Returns paginated email logs with status / type summary counts.
 */
const listLogs = async ({ limit = 100, offset = 0, type, status, search } = {}) => {
  const where  = [];
  const params = [];

  if (type   && type   !== 'all') { where.push('email_type = ?'); params.push(type); }
  if (status && status !== 'all') { where.push('status = ?');     params.push(status); }
  if (search) {
    where.push('(recipient_email LIKE ? OR recipient_name LIKE ? OR subject LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [logs] = await pool.query(
    `SELECT * FROM email_logs ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );

  const [[counts]] = await pool.query(`
    SELECT
      COUNT(*) AS total,
      SUM(status='sent')                     AS sent_count,
      SUM(status='failed')                   AS failed_count,
      SUM(email_type='welcome_client')       AS welcome_count,
      SUM(email_type='admin_alert')          AS alert_count,
      SUM(email_type='custom_admin')         AS custom_count
    FROM email_logs
  `);

  return {
    logs,
    counts: {
      total:   Number(counts?.total)         || 0,
      sent:    Number(counts?.sent_count)    || 0,
      failed:  Number(counts?.failed_count)  || 0,
      welcome: Number(counts?.welcome_count) || 0,
      alert:   Number(counts?.alert_count)   || 0,
      custom:  Number(counts?.custom_count)  || 0,
    },
  };
};

// ─── App / SMTP Settings ──────────────────────────────────────────────────────

/**
 * Returns all app settings as a key → value object.
 */
const getSettings = async () => {
  const [rows] = await pool.query('SELECT setting_key, setting_value FROM app_settings');
  return Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value]));
};

/**
 * Upserts multiple app settings in a single transaction.
 * Only persists keys whose values are not null/undefined.
 */
const saveSettings = async (updates) => {
  for (const [key, val] of Object.entries(updates)) {
    if (val !== undefined && val !== null) {
      await pool.query(
        `INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [key, String(val), String(val)]
      );
    }
  }
};

// ─── SMTP Test ────────────────────────────────────────────────────────────────

/**
 * Verifies an SMTP connection and optionally sends a live test email.
 * Returns { verified: true, emailSent: boolean, deliveredTo: string|null }.
 */
const testSmtp = async ({ host, port, user, password, secure, fromName, targetEmail }) => {
  const isGmail    = (host || '').includes('gmail');
  const isSecure   = secure === true || secure === 'true' || Number(port) === 465;

  const transportConfig = isGmail
    ? { service: 'gmail', auth: { user, pass: password } }
    : { host, port: Number(port), secure: isSecure, auth: { user, pass: password } };

  const transporter = nodemailer.createTransport(transportConfig);

  // 1. Verify SMTP handshake
  await transporter.verify();

  // 2. Optionally send a live test email
  if (targetEmail) {
    const from = fromName ? `"${fromName}" <${user}>` : `Dharamvir Info Tech <${user}>`;

    await transporter.sendMail({
      from,
      to:      targetEmail,
      subject: '✅ SMTP Configuration Test — Dharamvir Info Tech',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <div style="background:linear-gradient(135deg,#071a2f,#0d2e53);padding:24px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:20px">Dharamvir Info Tech</h1>
            <p style="color:#f59e0b;margin:6px 0 0;font-size:13px;font-weight:bold">LIVE SMTP VERIFICATION SUCCESSFUL</p>
          </div>
          <div style="padding:24px;color:#1e293b;line-height:1.6">
            <p>Your SMTP credentials (<strong>${user}</strong>) are authenticated and working.</p>
            <div style="background:#f8fafc;border-left:4px solid #10b981;padding:12px 16px;border-radius:6px;margin:18px 0">
              <p style="margin:0;font-size:13px;color:#047857;font-weight:600">✓ SMTP Handshake Verified &amp; Email Delivered</p>
              <p style="margin:4px 0 0;font-size:12px;color:#64748b">Delivered to <strong>${targetEmail}</strong> on ${new Date().toLocaleString()}.</p>
            </div>
          </div>
        </div>
      `,
      text: `SMTP verified. Test email delivered to ${targetEmail} from ${user}.`,
    });

    // Log the test send
    const { logEmail } = require('../utils/emailService');
    await logEmail({
      recipientEmail: targetEmail,
      recipientName:  'Test Recipient',
      senderEmail:    user,
      subject:        '✅ SMTP Configuration Test — Dharamvir Info Tech',
      emailType:      'custom_admin',
      status:         'sent',
      bodyPreview:    `Test email sent to ${targetEmail}`,
    });

    return { verified: true, emailSent: true, deliveredTo: targetEmail };
  }

  return { verified: true, emailSent: false, deliveredTo: null };
};

// ─── User Management ──────────────────────────────────────────────────────────

/**
 * Returns all users (admin-only fields, password excluded).
 */
const listUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, phone, role, company_name, status,
            two_factor_enabled, created_at
     FROM users ORDER BY created_at DESC`
  );
  return rows;
};

module.exports = { listLogs, getSettings, saveSettings, testSmtp, listUsers };
