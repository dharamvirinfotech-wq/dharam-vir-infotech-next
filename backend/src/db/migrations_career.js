require('dotenv').config();
const { pool } = require('./pool');

async function migrate() {
  console.log('Running career and visitor migrations...');

  // 1. job_postings
  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_postings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(150) UNIQUE NOT NULL,
      title VARCHAR(200) NOT NULL,
      department VARCHAR(100) NOT NULL,
      location VARCHAR(150) DEFAULT 'Remote / Noida, India',
      job_type VARCHAR(50) DEFAULT 'Full-Time',
      experience VARCHAR(50) DEFAULT '3+ Years',
      salary VARCHAR(100) NULL,
      description TEXT NULL,
      responsibilities JSON NULL,
      requirements JSON NULL,
      skills JSON NULL,
      status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('✓ Table job_postings created.');

  // 2. job_applications
  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      job_id INT NULL,
      job_slug VARCHAR(150) NULL,
      job_title VARCHAR(200) NOT NULL,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      experience VARCHAR(50) NULL,
      expected_salary VARCHAR(100) NULL,
      portfolio_url VARCHAR(255) NULL,
      resume_url VARCHAR(500) NULL,
      cover_letter TEXT NULL,
      visitor_id VARCHAR(100) NULL,
      ip_address VARCHAR(45) NULL,
      user_agent TEXT NULL,
      latitude DECIMAL(10, 8) NULL,
      longitude DECIMAL(11, 8) NULL,
      location_address VARCHAR(255) NULL,
      status ENUM('new', 'reviewing', 'shortlisted', 'rejected', 'hired') DEFAULT 'new',
      admin_notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_job_id (job_id),
      INDEX idx_email (email),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('✓ Table job_applications created.');

  // 3. unique_visitors (Unique User Tracking - Zero Duplicates)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS unique_visitors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      visitor_id VARCHAR(100) UNIQUE NOT NULL,
      ip_address VARCHAR(45) NULL,
      user_agent TEXT NULL,
      device_type VARCHAR(50) DEFAULT 'Desktop',
      browser VARCHAR(50) NULL,
      os VARCHAR(50) NULL,
      latitude DECIMAL(10, 8) NULL,
      longitude DECIMAL(11, 8) NULL,
      city VARCHAR(100) NULL,
      country VARCHAR(100) NULL,
      first_page VARCHAR(255) NULL,
      last_page VARCHAR(255) NULL,
      visit_count INT DEFAULT 1,
      first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_visitor_id (visitor_id),
      INDEX idx_ip (ip_address)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('✓ Table unique_visitors created.');

  // 4. notifications (In-App & Browser Notifications for Admin)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      type VARCHAR(50) DEFAULT 'job_application',
      link VARCHAR(255) NULL,
      is_read BOOLEAN DEFAULT FALSE,
      metadata JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_is_read (is_read)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('✓ Table notifications created.');

  // 5. Seed initial job postings if empty
  const [existing] = await pool.query('SELECT COUNT(*) as count FROM job_postings');
  if (existing[0].count === 0) {
    console.log('Seeding initial job postings from data/careers...');
    const seedJobs = [
      {
        slug: 'senior-react-developer',
        title: 'Senior React.js Developer',
        department: 'Frontend Engineering',
        location: 'Remote / Noida, India',
        job_type: 'Full-Time',
        experience: '4+ Years',
        salary: '$1,500 - $2,800 / Month',
        description: 'We are looking for a passionate Senior React.js Developer to architect and build high-performance, scalable web applications for global enterprise clients.',
        responsibilities: [
          'Develop user interface components and implement them following React.js workflows.',
          'Optimize components for maximum performance across web-capable devices and browsers.',
          'Collaborate with backend engineers, UI/UX designers, and product managers.',
          'Conduct code reviews, mentor junior developers, and establish frontend best practices.'
        ],
        requirements: [
          'Proficient in JavaScript, TypeScript, HTML5, CSS3, and Tailwind CSS.',
          'Strong experience with React.js workflows (Redux, Zustand, React Query).',
          'Familiarity with RESTful APIs, GraphQL, and modern front-end build pipelines.',
          'Experience with Git and CI/CD pipelines.'
        ],
        skills: ['React.js', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS', 'REST API', 'Git']
      },
      {
        slug: 'nodejs-backend-specialist',
        title: 'Node.js Backend Specialist',
        department: 'Backend Engineering',
        location: 'Remote / Noida, India',
        job_type: 'Full-Time',
        experience: '3+ Years',
        salary: '$1,400 - $2,600 / Month',
        description: 'Join our core backend team to engineer high-throughput microservices, REST APIs, and database architectures using Node.js, Express, and PostgreSQL/MySQL.',
        responsibilities: [
          'Architect and maintain scalable RESTful APIs and WebSocket services.',
          'Optimize database queries, indexing, and caching mechanisms using Redis and MySQL.',
          'Implement robust security protocols, authentication (JWT/OAuth), and data encryption.',
          'Monitor application performance and troubleshoot backend bottlenecks.'
        ],
        requirements: [
          'Solid knowledge of Node.js, Express.js, TypeScript, and asynchronous programming.',
          'Hands-on experience with SQL (MySQL/PostgreSQL) and NoSQL (MongoDB, Redis).',
          'Understanding of microservices architecture, Docker, and AWS cloud services.',
          'Experience writing automated unit and integration tests.'
        ],
        skills: ['Node.js', 'Express', 'TypeScript', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'AWS']
      },
      {
        slug: 'fullstack-mern-engineer',
        title: 'Full Stack Engineer (MERN)',
        department: 'Software Development',
        location: 'Remote',
        job_type: 'Full-Time',
        experience: '3-5 Years',
        salary: '$1,600 - $3,000 / Month',
        description: 'Looking for a versatile Full Stack Developer proficient in MongoDB, Express.js, React.js, and Node.js to deliver end-to-end web products.',
        responsibilities: [
          'Design and implement end-to-end features from database schemas to responsive UI frontend.',
          'Work closely with product leadership to scope requirements and deliver milestone builds.',
          'Ensure cross-browser compatibility, web accessibility, and high performance.'
        ],
        requirements: [
          '3+ years building production applications using React, Node.js, Express, and databases.',
          'State management expertise and REST/GraphQL API consumption.',
          'Independent problem solver with excellent communication skills.'
        ],
        skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Next.js', 'Tailwind']
      },
      {
        slug: 'ui-ux-product-designer',
        title: 'Lead UI/UX Product Designer',
        department: 'Product Design',
        location: 'Hybrid / Noida, India',
        job_type: 'Full-Time',
        experience: '3+ Years',
        salary: '$1,200 - $2,200 / Month',
        description: 'We need a visual storyteller who designs delightful, accessible, and intuitive digital interfaces for SaaS products and mobile platforms.',
        responsibilities: [
          'Create wireframes, user personas, interactive prototypes, and design systems in Figma.',
          'Collaborate with developers to ensure pixel-perfect design implementation.',
          'Conduct usability testing and iterate designs based on feedback.'
        ],
        requirements: [
          'Strong portfolio demonstrating enterprise web & mobile UX/UI work.',
          'Proficiency in Figma, Adobe Creative Cloud, and design tokens.',
          'Deep understanding of typography, color theory, and responsive grids.'
        ],
        skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research', 'Wireframing']
      }
    ];

    for (const job of seedJobs) {
      await pool.query(`
        INSERT INTO job_postings (slug, title, department, location, job_type, experience, salary, description, responsibilities, requirements, skills, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
      `, [
        job.slug,
        job.title,
        job.department,
        job.location,
        job.job_type,
        job.experience,
        job.salary,
        job.description,
        JSON.stringify(job.responsibilities),
        JSON.stringify(job.requirements),
        JSON.stringify(job.skills)
      ]);
    }
    console.log(`✓ Seeded ${seedJobs.length} initial job postings.`);
  }

  console.log('✓ All migrations completed successfully!');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
