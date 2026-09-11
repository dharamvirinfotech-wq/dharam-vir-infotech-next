require('dotenv').config();
const { pool } = require('../src/db/pool');

async function run() {
  const updates = [
    {
      slug: 'windowsutils',
      architecture_details: `The desktop suite is developed on top of Electron and C++ native addons for multithreaded binary stream processing.
- Direct MBOX stream extraction without loading full files into RAM.
- Local SQLite database indexing millions of email headers instantly.
- SHA-256 automated hash verification for strict court-admissible legal archiving.
- Completely zero cloud telemetry to safeguard sensitive corporate emails.`,
      key_highlights: JSON.stringify([
        '100% Offline Processing — Zero cloud exposure',
        'Multi-Threaded Conversion Engine for 25+ email formats',
        'Court-Admissible Bates Numbering with custom stamps & headers',
        'Over 1 Million+ Active Windows PC installations'
      ]),
      faqs: JSON.stringify([
        {
          question: "Is internet connectivity required to run WindowsUtils converters?",
          answer: "No. All email conversions (MBOX to PDF, OST to PST) run locally on the user's workstation with zero cloud telemetry for maximum privacy."
        },
        {
          question: "Does WindowsUtils support batch processing large archives?",
          answer: "Yes, our multithreaded engine can batch convert gigabytes of email archives simultaneously without memory exhaustion."
        },
        {
          question: "Are generated PDFs compliant with legal e-discovery standards?",
          answer: "Yes, our automated Bates stamping engine embeds continuous prefixes, suffixes, and page counts verified with SHA-256 signatures."
        }
      ])
    },
    {
      slug: 'fairsearches',
      architecture_details: `Architected as a high-concurrency search platform leveraging Next.js 14 and Elasticsearch clusters.
- Elasticsearch multi-faceted index supporting geo-distance filtering within a 5km radius.
- Redis caching layer delivering sub-80ms response times for high-volume searches.
- Automated merchant verification pipeline with SMS/WhatsApp notifications.
- Dynamic SEO landing page generation for 50,000+ local keywords across India.`,
      key_highlights: JSON.stringify([
        'Sub-80ms Geo-Distance Search Engine Latency',
        'Multi-Vertical Directory covering Services, Experts, Jobs, Travel & Events',
        'Real-Time In-App Lead Generation & WhatsApp Connect',
        'Over 400% Organic SEO Traffic Increase in 6 months'
      ]),
      faqs: JSON.stringify([
        {
          question: "How does FairSearches achieve sub-80ms search speeds?",
          answer: "By utilizing Elasticsearch geo-distance filters combined with multi-tier Redis caching and database read-replicas."
        },
        {
          question: "How are local businesses verified on the platform?",
          answer: "A hybrid automated KYC process checks business licenses and mobile OTPs before awarding verified trust badges."
        },
        {
          question: "Can businesses track client lead inquiries?",
          answer: "Yes, verified merchants receive instant dashboard analytics, click-to-call telemetry, and real-time lead notifications."
        }
      ])
    },
    {
      slug: 'envirosure-audits',
      architecture_details: `Built as an audit-grade environmental accounting suite with tamper-proof calculation ledgers.
- Scope 1, Scope 2, and Scope 3 automated greenhouse gas (GHG) calculations.
- Verifiable audit trail compliant with ISO 14064 and GHG Protocol guidelines.
- Automated regulatory report generator producing audit-ready PDF dossiers in one click.
- Role-based auditor review workflows with cryptographic digital signature verification.`,
      key_highlights: JSON.stringify([
        'Automated Scope 1, 2, and 3 Greenhouse Gas Accounting',
        'Audit-Grade Regulatory Assurance with 120+ Audits Passed',
        '70% Reduction in Corporate Environmental Audit Preparation Time',
        'Managing over $50 Million in Green Credit Portfolios'
      ]),
      faqs: JSON.stringify([
        {
          question: "What standards are supported by EnviroSure Audit?",
          answer: "EnviroSure adheres to ISO 14064, the GHG Protocol corporate standard, and national Green Credit compliance mandates."
        },
        {
          question: "How does it reduce audit preparation time by 70%?",
          answer: "By centralizing utility bills, emission factors, and fuel logs into automated calculation pipelines with pre-built auditor dashboards."
        },
        {
          question: "Can external auditors access the platform directly?",
          answer: "Yes, dedicated auditor roles can review raw computation logs, leave notes, and issue digital compliance stamps."
        }
      ])
    }
  ];

  for (const u of updates) {
    await pool.query(
      `UPDATE case_studies SET
         architecture_details = ?,
         key_highlights = ?,
         faqs = ?
       WHERE slug = ?`,
      [u.architecture_details, u.key_highlights, u.faqs, u.slug]
    );
    console.log('Updated details for:', u.slug);
  }
}

run()
  .then(() => {
    console.log('All detailed data populated successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error updating details:', err);
    process.exit(1);
  });
