/**
 * Email & Settings Controller
 * Handles HTTP request/response for email logs, SMTP configurations, and tests.
 * Delegates data handling and SMTP testing to email-settings.service.js.
 */

const emailSettingsService = require('../services/email-settings.service');

// 1. GET /email/logs (Admin/Editor)
exports.getLogs = async (req, res, next) => {
  try {
    const { limit = 100, offset = 0, type, status, search } = req.query;
    const data = await emailSettingsService.listLogs({ limit, offset, type, status, search });
    res.json({
      success: true,
      logs: data.logs,
      counts: data.counts,
    });
  } catch (err) {
    next(err);
  }
};

// 2. GET /email/settings (Admin)
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await emailSettingsService.getSettings();
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

// 3. POST /email/settings (Admin)
exports.updateSettings = async (req, res, next) => {
  try {
    const { smtp_host, smtp_port, smtp_user, smtp_password, mail_from, admin_notify_email, smtp_secure } = req.body;
    const updates = {
      smtp_host,
      smtp_port,
      smtp_user,
      smtp_password,
      mail_from,
      admin_notify_email,
      smtp_secure: String(smtp_secure || 'false'),
    };

    await emailSettingsService.saveSettings(updates);
    res.json({ success: true, message: 'Settings saved successfully' });
  } catch (err) {
    next(err);
  }
};

// 4. POST /email/test-smtp (Admin)
exports.testSmtp = async (req, res, next) => {
  try {
    const {
      host, port, user, password, secure,
      smtp_host, smtp_port, smtp_user, smtp_password, smtp_secure,
      testEmail, test_email, smtp_from_name,
    } = req.body;

    const finalHost = smtp_host || host || 'smtp.gmail.com';
    const finalPort = Number(smtp_port || port || 465);
    const finalUser = (smtp_user || user || '').trim();
    const rawPass = smtp_password || password || '';
    const finalPass = rawPass ? rawPass.trim() : '';
    const isSecure = (smtp_secure === 'true' || smtp_secure === true || secure === 'true' || secure === true || finalPort === 465);
    const targetEmail = (testEmail || test_email || '').trim();

    if (!finalUser || !finalPass) {
      return res.status(400).json({
        success: false,
        message: 'SMTP Username (Gmail address) and App Password are required.',
      });
    }

    const result = await emailSettingsService.testSmtp({
      host: finalHost,
      port: finalPort,
      user: finalUser,
      password: finalPass,
      secure: isSecure,
      fromName: smtp_from_name,
      targetEmail,
    });

    if (result.emailSent) {
      return res.json({
        success: true,
        message: `SMTP verified & test email delivered to ${result.deliveredTo}!`,
      });
    }

    res.json({ success: true, message: 'SMTP connection verified successfully!' });
  } catch (err) {
    console.error('[test-smtp error]:', err);
    res.status(400).json({ success: false, message: 'SMTP test failed: ' + err.message });
  }
};
