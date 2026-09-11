/**
 * Contact Controller
 * Handles HTTP request/response for contact inquiries and admin email replies.
 * Delegates database queries and email dispatch to contact.service.js.
 */

const contactService = require('../services/contact.service');

// Public: submit contact form (From Home Page or Contact Us Page)
exports.create = async (req, res, next) => {
  try {
    const { name, email, phone = null, subject = null, service = null, message } = req.body;
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().slice(0, 64);
    const userAgent = (req.headers['user-agent'] || '').toString().slice(0, 500);

    const inquiryId = await contactService.saveInquiry({
      name,
      email,
      phone,
      subject,
      service,
      message,
      ip,
      userAgent,
    });

    // Send immediate response back to client so UI does not hang
    res.status(201).json({ id: inquiryId, message: 'Inquiry received' });

    // Asynchronously dispatch emails
    contactService.dispatchEmails({
      inquiryId,
      name,
      email,
      phone,
      service,
      subject,
      message,
      ip,
    });
  } catch (err) {
    next(err);
  }
};

// Admin: list with filters
exports.list = async (req, res, next) => {
  try {
    const { status, search, service, limit = 100, offset = 0 } = req.query;
    const data = await contactService.listInquiries({ status, search, service, limit, offset });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: get single inquiry
exports.get = async (req, res, next) => {
  try {
    const inquiry = await contactService.getInquiry(req.params.id);
    res.json({ inquiry });
  } catch (err) {
    next(err);
  }
};

// Admin: update inquiry status or notes
exports.updateStatus = async (req, res, next) => {
  try {
    const { status, admin_notes } = req.body;
    const inquiry = await contactService.updateInquiry(req.params.id, { status, admin_notes });
    res.json({ inquiry });
  } catch (err) {
    next(err);
  }
};

// Admin: delete inquiry
exports.remove = async (req, res, next) => {
  try {
    await contactService.removeInquiry(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

// Admin: Send custom email to a client directly from Admin Panel
exports.sendCustomEmail = async (req, res, next) => {
  try {
    const toEmail = req.body.recipient_email || req.body.to;
    const clientName = req.body.recipient_name || req.body.clientName || 'Valued Client';
    const inquiryId = req.body.inquiry_id || req.body.inquiryId || null;
    const { subject, message } = req.body;

    if (!toEmail || !subject || !message) {
      return res.status(400).json({ message: 'Recipient email, subject, and message are required.' });
    }

    const result = await contactService.sendCustomEmail({
      toEmail,
      clientName,
      subject,
      message,
      inquiryId,
      adminName: req.user?.full_name || 'Dharamvir Info Tech Team',
    });

    res.json({ success: true, message: 'Custom email sent successfully!', messageId: result.messageId });
  } catch (err) {
    next(err);
  }
};
