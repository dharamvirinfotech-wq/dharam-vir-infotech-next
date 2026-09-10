const nodemailer = require('nodemailer');

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    console.warn('[mailer] SMTP not configured — emails will be skipped.');
    return null;
  }
  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || 'false') === 'true' || port === 465,
    auth: { user, pass },
  });
  return cachedTransporter;
}

/**
 * Send an email. Silently no-ops (with a warning) if SMTP isn't configured,
 * so a hire-request submission never fails because of email transport issues.
 */
async function sendMail({ to, subject, html, text, replyTo }) {
  const transporter = getTransporter();
  if (!transporter) return { skipped: true };
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  try {
    const info = await transporter.sendMail({
      from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
      replyTo,
    });
    return { messageId: info.messageId };
  } catch (err) {
    console.error('[mailer] sendMail failed:', err.message);
    return { error: err.message };
  }
}

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function googleMapsLink(lat, lng) {
  if (lat == null || lng == null) return null;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function buildHireRequestSummaryRows(req) {
  const map = googleMapsLink(req.latitude, req.longitude);
  const rows = [
    ['Developer', `${req.developer_name}${req.developer_role ? ` (${req.developer_role})` : ''}`],
    ['Name', req.name],
    ['Email', req.email],
    ['Phone', req.phone || '—'],
    ['Company', req.company || '—'],
    ['Engagement', req.engagement_type],
    ['Budget', req.budget || '—'],
    ['Timeline', req.timeline || '—'],
    ['Project', req.project_description],
    ['Coordinates', req.latitude && req.longitude ? `${req.latitude}, ${req.longitude}` : '—'],
    ['Approx. Address', req.location_address || '—'],
    ['Map', map ? `<a href="${esc(map)}">Open in Google Maps</a>` : '—'],
  ];
  return rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;white-space:nowrap;">${esc(
          k
        )}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${
          k === 'Map' ? v : esc(v)
        }</td></tr>`
    )
    .join('');
}

function renderUserConfirmation(req) {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#0f172a;">
    <h2 style="color:#0b2545;">Thanks ${esc(req.name)} — we received your hire request</h2>
    <p>We've received your request to hire <strong>${esc(req.developer_name)}</strong>. Our team will review the details and contact you within 24 hours.</p>
    <h3 style="margin-top:24px;color:#0b2545;">Your request summary</h3>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${buildHireRequestSummaryRows(req)}</table>
    <p style="margin-top:24px;font-size:13px;color:#475569;">If anything looks wrong, simply reply to this email and we'll update it.</p>
    <p style="font-size:13px;color:#475569;">— Dharam Vir Infotech</p>
  </div>`;
  return {
    subject: `We received your request to hire ${req.developer_name}`,
    html,
    text: `Hi ${req.name},\n\nWe received your hire request for ${req.developer_name}. Our team will contact you within 24 hours.\n\nReference ID: ${req.id}\n`,
  };
}

function renderInternalNotification(req) {
  const map = googleMapsLink(req.latitude, req.longitude);
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#0f172a;">
    <h2 style="color:#b45309;">New hire request #${esc(req.id)}</h2>
    <p>A new hire request was submitted on the website.</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${buildHireRequestSummaryRows(req)}</table>
    ${map ? `<p style="margin-top:16px;"><a href="${esc(map)}" style="background:#0b2545;color:#fff;padding:10px 16px;text-decoration:none;border-radius:6px;display:inline-block;">View live location on Google Maps</a></p>` : ''}
  </div>`;
  return {
    subject: `[Hire Request #${req.id}] ${req.developer_name} — ${req.name}`,
    html,
    text: `New hire request #${req.id}\nDeveloper: ${req.developer_name}\nFrom: ${req.name} <${req.email}>\nPhone: ${req.phone || '—'}\nCompany: ${req.company || '—'}\nLocation: ${req.location_address || '—'} (${req.latitude || '?'}, ${req.longitude || '?'})\n${map ? `Map: ${map}\n` : ''}`,
    replyTo: req.email,
  };
}

module.exports = {
  sendMail,
  renderUserConfirmation,
  renderInternalNotification,
  googleMapsLink,
};
