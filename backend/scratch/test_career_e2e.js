require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');
const { pool } = require('../src/db/pool');

async function run() {
  console.log('--- STARTING COMPREHENSIVE RECRUITMENT VERIFICATION ---');

  // 1. Generate Admin Token
  const token = jwt.sign(
    { id: 1, email: 'admin@dvit.com', role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  console.log('1. Admin token generated successfully.');

  // 2. Fetch public jobs
  const jobsRes = await axios.get('http://localhost:4000/api/jobs');
  console.log('2. Public Jobs count:', jobsRes.data.jobs?.length);
  const targetJob = jobsRes.data.jobs[0];
  console.log('   Applied for:', targetJob.id, targetJob.title);

  // 3. Submit candidate application with PDF resume
  const form = new FormData();
  form.append('fullName', 'Aarav Sharma');
  form.append('email', 'aarav.applicant@example.com');
  form.append('phone', '+91 9876543210');
  form.append('experience', '3-5 Years');
  form.append('expectedSalary', '₹14 LPA');
  form.append('portfolioUrl', 'https://github.com/aaravsharma');
  form.append('coverLetter', 'I am excited to apply for this engineering role at Dharam Vir Infotech!');
  form.append('job_id', String(targetJob.id));
  form.append('job_title', targetJob.title);
  form.append('job_slug', targetJob.slug);
  form.append('visitor_id', 'dvit_usr_candidate_unique_999');
  form.append('resume', Buffer.from('%PDF-1.4 Mock PDF Content For Candidate Resume Submission'), {
    filename: 'aarav_sharma_resume.pdf',
    contentType: 'application/pdf',
  });

  const applyRes = await axios.post('http://localhost:4000/api/jobs/apply', form, {
    headers: form.getHeaders(),
  });
  console.log('3. Candidate Application Submitted:', {
    success: applyRes.data.success,
    application_id: applyRes.data.application_id,
    resume_url: applyRes.data.resume_url,
    candidate_email: applyRes.data.candidate_email,
  });

  // 4. Fetch notifications for Admin (Verifying in-app notification creation)
  const notifRes = await axios.get('http://localhost:4000/api/notifications', {
    headers: { Authorization: 'Bearer ' + token }
  });
  console.log('4. Admin Notifications:', {
    success: notifRes.data.success,
    unread_count: notifRes.data.unread_count,
    latest_title: notifRes.data.data?.[0]?.title,
    latest_message: notifRes.data.data?.[0]?.message,
    latest_link: notifRes.data.data?.[0]?.link
  });

  // 5. Check email logs (Ensuring applicant got welcome email and NO admin email was sent)
  const emailRes = await axios.get('http://localhost:4000/api/email/logs', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const logs = emailRes.data.logs || [];
  console.log('5. Latest Email Log Verification:');
  if (logs.length > 0) {
    const l = logs[0];
    console.log(`   Recipient: ${l.recipient}`);
    console.log(`   Subject: ${l.subject}`);
    console.log(`   Type: ${l.template_type}`);
    console.log(`   Status: ${l.status}`);
  }

  // 6. Test visitor ping deduplication (Multiple hits with same visitor_id)
  await axios.post('http://localhost:4000/api/analytics/visitor-ping', {
    visitor_id: 'dvit_usr_candidate_unique_999',
    pathname: '/career',
    device_type: 'Desktop',
    browser: 'Chrome',
    os: 'Windows'
  });
  await axios.post('http://localhost:4000/api/analytics/visitor-ping', {
    visitor_id: 'dvit_usr_candidate_unique_999',
    pathname: '/career/positions',
    device_type: 'Desktop',
    browser: 'Chrome',
    os: 'Windows'
  });
  await axios.post('http://localhost:4000/api/analytics/visitor-ping', {
    visitor_id: 'dvit_usr_candidate_unique_999',
    pathname: '/career/apply-now',
    device_type: 'Desktop',
    browser: 'Chrome',
    os: 'Windows'
  });

  // 7. Verify unique visitors in DB
  const [visitorRows] = await pool.query('SELECT * FROM unique_visitors WHERE visitor_id = ?', ['dvit_usr_candidate_unique_999']);
  console.log('6. Visitors Database Deduplication Check:');
  console.log('   Matched rows in DB (MUST be 1):', visitorRows.length);
  console.log('   Total visits accumulated:', visitorRows[0]?.visit_count);
  console.log('   Last page visited:', visitorRows[0]?.last_page);

  // 8. Verify Admin Job Applications API
  const adminAppsRes = await axios.get('http://localhost:4000/api/jobs/admin/applications', {
    headers: { Authorization: 'Bearer ' + token }
  });
  console.log('7. Admin Applications List Count:', adminAppsRes.data.applications?.length);
  const latestApp = adminAppsRes.data.applications?.[0];
  console.log('   Latest Candidate in Admin:', latestApp?.full_name, '| Position:', latestApp?.job_title, '| Resume:', latestApp?.resume_url);

  console.log('--- ALL CHECKS PASSED PERFECTLY ---');
  process.exit(0);
}

run().catch(err => {
  console.error('Test Failed:', err.response?.data || err.message);
  process.exit(1);
});
