require('dotenv').config();
const mysql = require('mysql2/promise');

async function migrate() {
  const {
    DB_HOST = 'localhost',
    DB_PORT = 3306,
    DB_USER = 'root',
    DB_PASSWORD = '',
    DB_NAME = 'dvitlive',
  } = process.env;

  const root = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await root.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await root.query(`USE \`${DB_NAME}\`;`);

  await root.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(190) NOT NULL UNIQUE,
      phone VARCHAR(30) DEFAULT NULL,
      password_hash VARCHAR(255) DEFAULT NULL,
      role ENUM('admin','employee','employee') NOT NULL DEFAULT 'user',
      company_name VARCHAR(150) DEFAULT NULL,
      status ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active',
      two_factor_enabled TINYINT(1) NOT NULL DEFAULT 0,
      avatar_url VARCHAR(500) DEFAULT NULL,
      provider ENUM('local','google','facebook') NOT NULL DEFAULT 'local',
      provider_id VARCHAR(190) DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_users_role (role),
      INDEX idx_users_status (status),
      INDEX idx_users_provider (provider, provider_id)
    ) ENGINE=InnoDB;
  `);

  // Make password_hash nullable for OAuth users (idempotent)
  try {
    await root.query(`ALTER TABLE users MODIFY password_hash VARCHAR(255) DEFAULT NULL;`);
  } catch (_) { /* ignore */ }

  // Add columns if upgrading an existing DB
  const ensureColumn = async (col, ddl) => {
    const [rows] = await root.query(
      `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = ?`,
      [DB_NAME, col]
    );
    if (rows[0].c === 0) await root.query(`ALTER TABLE users ADD COLUMN ${ddl};`);
  };
  await ensureColumn('avatar_url', `avatar_url VARCHAR(500) DEFAULT NULL`);
  await ensureColumn('provider', `provider ENUM('local','google','facebook') NOT NULL DEFAULT 'local'`);
  await ensureColumn('provider_id', `provider_id VARCHAR(190) DEFAULT NULL`);

  // Contact Us inquiries
  await root.query(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(30) DEFAULT NULL,
      subject VARCHAR(255) DEFAULT NULL,
      service VARCHAR(150) DEFAULT NULL,
      message TEXT NOT NULL,
      status ENUM('new','replied','closed') NOT NULL DEFAULT 'new',
      admin_notes TEXT DEFAULT NULL,
      ip_address VARCHAR(64) DEFAULT NULL,
      user_agent VARCHAR(500) DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_inq_status (status),
      INDEX idx_inq_email (email),
      INDEX idx_inq_created (created_at)
    ) ENGINE=InnoDB;
  `);

  // Password reset tokens
  await root.query(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token_hash CHAR(64) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      used TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_pr_user (user_id),
      INDEX idx_pr_token (token_hash),
      CONSTRAINT fk_pr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);

  // Talk To Experts consultation requests (from mega-menu CTA)
  await root.query(`
    CREATE TABLE IF NOT EXISTS expert_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(30) DEFAULT NULL,
      company VARCHAR(150) DEFAULT NULL,
      category ENUM('services','technologies','hire','promotion','general') NOT NULL DEFAULT 'general',
      topic VARCHAR(190) DEFAULT NULL,
      budget VARCHAR(50) DEFAULT NULL,
      timeline VARCHAR(50) DEFAULT NULL,
      message TEXT DEFAULT NULL,
      source_page VARCHAR(255) DEFAULT NULL,
      status ENUM('new','contacted','scheduled','closed') NOT NULL DEFAULT 'new',
      admin_notes TEXT DEFAULT NULL,
      ip_address VARCHAR(64) DEFAULT NULL,
      user_agent VARCHAR(500) DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_exp_status (status),
      INDEX idx_exp_category (category),
      INDEX idx_exp_created (created_at)
    ) ENGINE=InnoDB;
  `);

  // Hire Developer requests (from DeveloperProfile sticky form) with live geolocation
  await root.query(`
    CREATE TABLE IF NOT EXISTS hire_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT DEFAULT NULL,
      developer_slug VARCHAR(150) NOT NULL,
      developer_name VARCHAR(150) NOT NULL,
      developer_role VARCHAR(150) DEFAULT NULL,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(30) DEFAULT NULL,
      company VARCHAR(150) DEFAULT NULL,
      engagement_type ENUM('full-time','part-time','contract','project-based') NOT NULL DEFAULT 'full-time',
      budget VARCHAR(50) DEFAULT NULL,
      timeline VARCHAR(50) DEFAULT NULL,
      project_description TEXT NOT NULL,
      latitude DECIMAL(10,7) DEFAULT NULL,
      longitude DECIMAL(10,7) DEFAULT NULL,
      location_accuracy DECIMAL(10,2) DEFAULT NULL,
      location_address VARCHAR(500) DEFAULT NULL,
      status ENUM('new','contacted','scheduled','approved','rejected','completed','closed') NOT NULL DEFAULT 'new',
      admin_notes TEXT DEFAULT NULL,
      ip_address VARCHAR(64) DEFAULT NULL,
      user_agent VARCHAR(500) DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_hire_status (status),
      INDEX idx_hire_dev (developer_slug),
      INDEX idx_hire_user (user_id),
      INDEX idx_hire_created (created_at),
      CONSTRAINT fk_hire_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB;
  `);

  // Idempotent column-widen for existing databases that were migrated before
  // the approve/reject/complete statuses were introduced.
  try {
    await root.query(`
      ALTER TABLE hire_requests
      MODIFY COLUMN status ENUM('new','contacted','scheduled','approved','rejected','completed','closed')
      NOT NULL DEFAULT 'new'
    `);
  } catch (e) { /* ignore if already up to date */ }

  // Developer profiles (managed from admin panel; consumed by public hire pages)
  await root.query(`
    CREATE TABLE IF NOT EXISTS developers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(150) NOT NULL UNIQUE,
      name VARCHAR(150) NOT NULL,
      role VARCHAR(150) NOT NULL,
      experience VARCHAR(50) NOT NULL,
      hourly_rate VARCHAR(50) DEFAULT NULL,
      rating DECIMAL(3,1) NOT NULL DEFAULT 4.5,
      location VARCHAR(150) DEFAULT NULL,
      avatar VARCHAR(10) DEFAULT NULL,
      bio TEXT DEFAULT NULL,
      availability VARCHAR(100) DEFAULT 'Full-time',
      projects_completed INT NOT NULL DEFAULT 0,
      education VARCHAR(255) DEFAULT NULL,
      skills JSON DEFAULT NULL,
      languages JSON DEFAULT NULL,
      certifications JSON DEFAULT NULL,
      categories JSON DEFAULT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      featured TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_dev_status (status),
      INDEX idx_dev_slug (slug)
    ) ENGINE=InnoDB;
  `);

  // Seed a few developers if empty
  const [[{ c: devCount }]] = await root.query('SELECT COUNT(*) AS c FROM developers');
  if (devCount === 0) {
    const seed = [
      ['rahul-sharma', 'Rahul Sharma', 'Senior Full Stack Developer', '8+ Years', '$25-35', 4.9, 'Bangalore, India', 'RS',
       'Passionate senior developer with 8+ years building scalable applications.', 'Full-time / Part-time', 54,
       'B.Tech Computer Science, IIT Delhi',
       JSON.stringify(['Team Lead','Architecture','Mentoring','Code Review','System Design']),
       JSON.stringify(['English (Fluent)','Hindi (Native)']),
       JSON.stringify(['AWS Certified Solutions Architect','Google Cloud Professional']),
       JSON.stringify(['fullstack','backend']), 1],
      ['priya-patel', 'Priya Patel', 'Frontend Developer', '6+ Years', '$20-30', 4.8, 'Pune, India', 'PP',
       'Detail-oriented developer specializing in beautiful, performant user interfaces.', 'Full-time', 42,
       'M.Tech Software Engineering, BITS Pilani',
       JSON.stringify(['UI/UX','Performance','Testing','Responsive Design','Accessibility']),
       JSON.stringify(['English (Fluent)','Hindi (Native)','Gujarati']),
       JSON.stringify(['Meta Front-End Developer Certificate']),
       JSON.stringify(['frontend']), 1],
      ['amit-kumar', 'Amit Kumar', 'Backend Developer', '5+ Years', '$18-25', 4.7, 'Hyderabad, India', 'AK',
       'Backend-focused developer building robust APIs and optimizing databases.', 'Full-time / Contract', 38,
       'B.Tech IT, IIIT Hyderabad',
       JSON.stringify(['API Design','Database','Security','Microservices','Docker']),
       JSON.stringify(['English (Fluent)','Hindi (Native)','Telugu']),
       JSON.stringify(['Certified Kubernetes Administrator']),
       JSON.stringify(['backend']), 0],
    ];
    for (const row of seed) {
      await root.query(
        `INSERT INTO developers (slug,name,role,experience,hourly_rate,rating,location,avatar,bio,availability,projects_completed,education,skills,languages,certifications,categories,featured)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        row
      );
    }
  }

  console.log(`Migration complete on database "${DB_NAME}"`);
  await root.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
