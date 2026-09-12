require('dotenv').config();
const { pool } = require('../src/db/pool');

async function run() {
  const projects = [
    {
      slug: 'windowsutils',
      title: 'WindowsUtils.com - Desktop Utility Suite',
      subtitle: 'Engineered high-speed desktop & cloud email conversion suite processing 50+ formats locally with zero data loss',
      client_name: 'WindowsUtils Inc.',
      industry: 'Software & Tools',
      duration: '6 months',
      team_size: '6 Engineers',
      technologies: JSON.stringify(['Electron', 'Node.js', 'React', 'C++', 'FastAPI', 'AWS']),
      services: JSON.stringify(['Desktop Software Development', 'Email Archival & Migration', 'Performance Engineering']),
      challenge: 'Users and legal teams needed enterprise-grade, independent desktop utilities to convert Outlook OST to PST, MBOX to PDF with court-admissible Bates stamps, and perform cloud IMAP backups completely locally without security risks.',
      solution: 'Designed and built a modular desktop suite with a multi-utility engine, supporting 25+ email clients, 100% offline local processing, custom Bates headers, and automatic SHA-256 integrity verification.',
      results: 'Over 1M+ active users, 100% data integrity SLA, 4.9/5 satisfaction rating across 50+ conversion tools.',
      live_url: 'https://windowsutils.com',
      metrics: JSON.stringify([
        { label: 'Active Users', value: '500+' },
        { label: 'File Formats', value: '25+' },
        { label: 'Data Loss Rate', value: '0%' },
        { label: 'Tools Built', value: '50+' }
      ]),
      tags: JSON.stringify(['Windows Software', 'MBOX to PDF', 'Desktop App', 'Email Migration']),
      status: 'published',
      featured: 1,
      sort_order: 1
    },
    {
      slug: 'fairsearches',
      title: 'FairSearches.com - The Business & Local Search Hub',
      subtitle: 'Scalable multi-service directory & local search engine connecting millions to verified restaurants, experts, jobs & travel',
      client_name: 'FairSearches India',
      industry: 'Marketplace & Search',
      duration: '9 months',
      team_size: '10 Developers',
      technologies: JSON.stringify(['Next.js', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Redis', 'TailwindCSS']),
      services: JSON.stringify(['High-Concurrency Search Engine', 'Multi-tenant Marketplace', 'SEO Optimization']),
      challenge: 'Building a lightning-fast search engine handling millions of local business queries across diverse categories (Services, Experts, Jobs, Travel, Events, Blogs) with geo-location filtering and sub-100ms response time.',
      solution: 'Engineered an Elasticsearch-powered multi-faceted search infrastructure with dynamic filtering, automated business verification pipelines, and responsive mobile-first UI with real-time notifications.',
      results: 'Sub-80ms search query latency, 50,000+ local businesses indexed, 400% organic SEO traffic growth in 6 months.',
      live_url: 'https://fairsearches.com',
      metrics: JSON.stringify([
        { label: 'Search Latency', value: '<80ms' },
        { label: 'Indexed Listings', value: '50K+' },
        { label: 'Organic Traffic', value: '+400%' },
        { label: 'Categories', value: '6 Verticals' }
      ]),
      tags: JSON.stringify(['Search Engine', 'Local Business Hub', 'Marketplace', 'Elasticsearch']),
      status: 'published',
      featured: 1,
      sort_order: 2
    },
    {
      slug: 'envirosure-audits',
      title: 'EnviroSure Audit - ESG Compliance Platform',
      subtitle: 'Audit-grade environmental compliance, GHG inventories & carbon advisory suite built for regulatory assurance',
      client_name: 'EnviroSure Audits',
      industry: 'CleanTech & Compliance',
      duration: '7 months',
      team_size: '7 Engineers',
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Docker', 'Chart.js', 'AWS']),
      services: JSON.stringify(['Enterprise ESG Software', 'Compliance Reporting Engine', 'Cloud Architecture']),
      challenge: 'Organizations faced complex regulatory audits for environmental compliance, GHG carbon accounting, and Green Credit Programs that required tamper-proof calculation trails and audit-grade documentation.',
      solution: 'Engineered an end-to-end ESG compliance system calculating Scope 1, 2, and 3 emissions with automated compliance checklists, PDF report generation, and third-party assurance verification workflows.',
      results: '70% reduction in audit prep time, successfully passed 120+ regulatory audits, managing $50M+ in green credit portfolios.',
      live_url: 'https://envirosureaudit.com',
      metrics: JSON.stringify([
        { label: 'Audit Time Reduced', value: '-70%' },
        { label: 'Audits Passed', value: '120+' },
        { label: 'GHG Protocols', value: '100% Compliant' },
        { label: 'Portfolio Managed', value: '$50M+' }
      ]),
      tags: JSON.stringify(['ESG', 'Environmental Audit', 'CleanTech', 'GHG Inventory']),
      status: 'published',
      featured: 1,
      sort_order: 3
    }
  ];

  for (const p of projects) {
    await pool.query(
      `INSERT INTO case_studies
         (slug, title, subtitle, client_name, industry, duration, team_size, technologies, services, challenge, solution, results, live_url, metrics, tags, status, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         subtitle = VALUES(subtitle),
         client_name = VALUES(client_name),
         industry = VALUES(industry),
         duration = VALUES(duration),
         team_size = VALUES(team_size),
         technologies = VALUES(technologies),
         services = VALUES(services),
         challenge = VALUES(challenge),
         solution = VALUES(solution),
         results = VALUES(results),
         live_url = VALUES(live_url),
         metrics = VALUES(metrics),
         tags = VALUES(tags),
         status = VALUES(status),
         featured = VALUES(featured),
         sort_order = VALUES(sort_order)`,
      [
        p.slug, p.title, p.subtitle, p.client_name, p.industry, p.duration, p.team_size,
        p.technologies, p.services, p.challenge, p.solution, p.results, p.live_url,
        p.metrics, p.tags, p.status, p.featured, p.sort_order
      ]
    );
    console.log('Successfully upserted portfolio project:', p.slug);
  }
}

run()
  .then(() => {
    console.log('All portfolio projects seeded successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
