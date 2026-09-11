const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * 1. Client Welcome Email Template
 * Sent to client immediately after inquiry submission from Home or Contact page.
 */
function renderClientWelcomeEmail({ name, email, service, subject, message }) {
  const safeName = esc(name || 'Valued Client');
  const safeService = esc(service || 'Custom IT & Software Development');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Dharamvir Info Tech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0b2545 0%, #134074 100%); padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                Dharamvir <span style="color: #f59e0b;">Info Tech</span>
              </h1>
              <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                Next-Gen IT Solutions & AI Engineering
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 20px; font-weight: 700;">
                Hello ${safeName}, 👋
              </h2>
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
                Thank you for reaching out to <strong>Dharamvir Info Tech</strong>. We have successfully received your project inquiry and our technical lead is currently reviewing your requirements.
              </p>
              
              <!-- Highlight Box -->
              <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0b2545; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Summary</p>
                <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Service:</strong> ${safeService}</p>
                ${subject ? `<p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Subject:</strong> ${esc(subject)}</p>` : ''}
                <p style="margin: 4px 0; color: #64748b; font-size: 13px;"><strong>Status:</strong> <span style="display: inline-block; background-color: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 9999px; font-weight: 600; font-size: 12px;">Active / In Review</span></p>
              </div>

              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                ⚡ <strong>What happens next?</strong> One of our senior engineers or solution consultants will contact you within <strong>2 to 4 business hours</strong> with technical feasibility, timeline, and preliminary architecture advice.
              </p>

              <!-- Services Highlights -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <tr>
                  <td width="33%" style="text-align: center; padding: 8px;">
                    <p style="margin: 0; font-weight: 700; color: #0b2545; font-size: 13px;">Full-Stack Apps</p>
                    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 11px;">React • Next.js • Node</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 8px; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
                    <p style="margin: 0; font-weight: 700; color: #0b2545; font-size: 13px;">AI & Cloud</p>
                    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 11px;">Machine Learning • AWS</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 8px;">
                    <p style="margin: 0; font-weight: 700; color: #0b2545; font-size: 13px;">Dedicated Devs</p>
                    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 11px;">Hourly & Full-Time</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 28px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">
                Need urgent assistance? Simply reply to this email or call our direct helpline at <strong style="color: #0b2545;">+91 8750 299 299</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} Dharamvir Info Tech. All rights reserved.
              </p>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 12px;">
                Building scalable web apps, mobile solutions & enterprise architectures.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return {
    subject: `Welcome to Dharamvir Info Tech! We received your inquiry`,
    html,
    text: `Hello ${name},\n\nThank you for contacting Dharamvir Info Tech! We have received your inquiry regarding "${service || 'our services'}".\n\nOur technical team will review your requirements and get back to you within 2 to 4 business hours.\n\nDirect Helpline: +91 8750 299 299\nWebsite: https://dharmvirinfotech.com\n\nBest regards,\nDharamvir Info Tech Team`,
  };
}

/**
 * 2. Admin Alert Email Template
 * Sent to Admin (e.g. mukesh.vin99@gmail.com) whenever any client submits Contact form.
 */
function renderAdminAlertEmail({ id, name, email, phone, service, subject, message, ip, created_at }) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Client Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    
    <div style="background-color: #0b2545; padding: 24px; color: #ffffff;">
      <span style="background-color: #f59e0b; color: #0b2545; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">New Inquiry #${id || 'NEW'}</span>
      <h2 style="margin: 12px 0 0 0; font-size: 20px; font-weight: 700;">New Contact Form Submission</h2>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 35%;">Client Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${esc(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${esc(email)}" style="color: #2563eb; text-decoration: none;">${esc(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${esc(phone || 'Not Provided')}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Requested Service:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${esc(service || 'General Inquiry')}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Subject:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${esc(subject || '—')}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">IP Address:</td>
          <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-family: monospace;">${esc(ip || '—')}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase;">Client Message:</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; color: #1e293b; white-space: pre-wrap; line-height: 1.5;">${esc(message)}</div>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="http://localhost:3000/admin/inquiries" style="background-color: #0b2545; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block;">Open In Admin Panel</a>
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 12px 24px; text-align: center; color: #94a3b8; font-size: 12px;">
      Automatic lead alert from Dharamvir Info Tech Portal
    </div>
  </div>
</body>
</html>
`;

  return {
    subject: `🚨 [New Lead] ${name} - ${service || subject || 'Inquiry'}`,
    html,
    text: `New Lead Submitted:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service}\nMessage: ${message}`,
  };
}

/**
 * 3. Custom Admin Email Template
 * Used when Admin writes a custom email directly to a specific client from Admin Panel.
 */
function renderCustomAdminEmail({ clientName, subject, messageBody, adminName = 'Dharamvir Info Tech Team' }) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${esc(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <tr>
            <td style="background-color: #0b2545; padding: 24px 32px;">
              <h2 style="margin: 0; color: #ffffff; font-size: 20px;">Dharamvir <span style="color: #f59e0b;">Info Tech</span></h2>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px 0; color: #0f172a; font-size: 16px; font-weight: 600;">Dear ${esc(clientName || 'Client')},</p>
              
              <div style="color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${esc(messageBody)}</div>

              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0b2545;">${esc(adminName)}</p>
                <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Dharamvir Info Tech Solutions</p>
                <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Helpline: +91 8750 299 299 | https://dharmvirinfotech.com</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
              You received this message in connection with your inquiry with Dharamvir Info Tech.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return {
    subject,
    html,
    text: `Dear ${clientName},\n\n${messageBody}\n\nBest regards,\n${adminName}\nDharamvir Info Tech`,
  };
}

/**
 * 4. Candidate Career Application Welcome Email
 * Sent to job applicant immediately after submitting application from Career page.
 */
function renderCareerWelcomeEmail({ fullName, jobTitle, email }) {
  const safeName = esc(fullName || 'Applicant');
  const safeJob = esc(jobTitle || 'Open Position');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - Dharamvir Info Tech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #071a2f 0%, #134074 100%); padding: 36px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Dharamvir <span style="color: #f59e0b;">Info Tech</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                Talent & Recruitment Portal
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 20px; font-weight: 700;">
                Hello ${safeName}, 🎉
              </h2>
              <p style="margin: 0 0 16px 0; color: #334155; font-size: 15px; line-height: 1.6;">
                Thank you for applying for the position of <strong>${safeJob}</strong> at <strong>Dharamvir Info Tech</strong>. We have safely received your application and resume.
              </p>

              <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Application Status</p>
                <p style="margin: 2px 0; color: #1e293b; font-size: 14px;"><strong>Applied Position:</strong> ${safeJob}</p>
                <p style="margin: 2px 0; color: #64748b; font-size: 13px;"><strong>Current Stage:</strong> <span style="background-color: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 9999px; font-weight: 600; font-size: 11px;">Profile Review</span></p>
              </div>

              <h3 style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 20px 0 10px 0;">What happens next?</h3>
              <ol style="margin: 0 0 20px 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.7;">
                <li>Our Talent Acquisition team will review your background and experience.</li>
                <li>Shortlisted candidates will receive an invitation for an initial HR Screening call.</li>
                <li>Following the screening, a technical assessment and team interview will be scheduled.</li>
              </ol>

              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
                If your profile aligns with our requirements, our hiring team will reach out directly. In the meantime, feel free to explore our projects and innovations at <a href="https://dharmvirinfotech.com" style="color: #f59e0b; text-decoration: none; font-weight: 600;">dharmvirinfotech.com</a>.
              </p>

              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 14px;">Warm regards,</p>
                <p style="margin: 2px 0 0 0; color: #f59e0b; font-weight: 700; font-size: 14px;">Talent & People Team</p>
                <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Dharamvir Info Tech Pvt. Ltd.</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
              You received this automated confirmation because you submitted a job application at Dharamvir Info Tech.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return {
    subject: `Application Received: ${safeJob} at Dharamvir Info Tech`,
    html,
    text: `Dear ${safeName},\n\nThank you for applying for the ${safeJob} role at Dharamvir Info Tech. We have received your application and resume. Our hiring team will review your profile and reach out if there is a match.\n\nBest regards,\nTalent Team\nDharamvir Info Tech`,
  };
}

module.exports = {
  renderClientWelcomeEmail,
  renderAdminAlertEmail,
  renderCustomAdminEmail,
  renderCareerWelcomeEmail
};
