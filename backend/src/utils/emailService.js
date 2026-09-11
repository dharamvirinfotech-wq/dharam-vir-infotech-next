const { pool } = require('../db/pool');

/**
 * Fetch dynamic SMTP and App settings from DB (app_settings table),
 * falling back to process.env.
 */
async function getEmailSettings() {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM app_settings');
    const settings = {};
    for (const r of rows) {
      settings[r.setting_key] = r.setting_value;
    }

    return {
      host: settings.smtp_host || process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(settings.smtp_port || process.env.SMTP_PORT || 587),
      secure: String(settings.smtp_secure || process.env.SMTP_SECURE || 'false') === 'true',
      user: settings.smtp_user || process.env.SMTP_USER || 'mukesh.vin99@gmail.com',
      pass: settings.smtp_password || process.env.SMTP_PASSWORD || 'ntff lcpo esyc jmqp',
      mailFrom: settings.mail_from || process.env.MAIL_FROM || `Dharamvir Info Tech <${settings.smtp_user || process.env.SMTP_USER || 'mukesh.vin99@gmail.com'}>`,
      adminNotifyEmail: settings.admin_notify_email || process.env.ADMIN_NOTIFY_EMAIL || 'mukesh.vin99@gmail.com'
    };
  } catch (err) {
    console.error('[emailService] Failed to load app_settings, using env:', err.message);
    return {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      user: process.env.SMTP_USER || 'mukesh.vin99@gmail.com',
      pass: process.env.SMTP_PASSWORD || 'ntff lcpo esyc jmqp',
      mailFrom: process.env.MAIL_FROM || 'Dharamvir Info Tech <mukesh.vin99@gmail.com>',
      adminNotifyEmail: process.env.ADMIN_NOTIFY_EMAIL || 'mukesh.vin99@gmail.com'
    };
  }
}

/**
 * Log all emails sent or failed into email_logs table for Admin Panel inspection
 */
async function logEmail({ recipientEmail, recipientName, senderEmail, subject, emailType, status, inquiryId = null, errorMessage = null, bodyPreview = null }) {
  try {
    await pool.query(
      `INSERT INTO email_logs (recipient_email, recipient_name, sender_email, subject, email_type, status, inquiry_id, error_message, body_preview)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipientEmail,
        recipientName || null,
        senderEmail,
        subject,
        emailType || 'other',
        status,
        inquiryId || null,
        errorMessage || null,
        (bodyPreview || '').slice(0, 500)
      ]
    );
  } catch (err) {
    console.error('[emailService] logEmail DB error:', err.message);
  }
}

module.exports = {
  getEmailSettings,
  logEmail
};
