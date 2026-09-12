/**
 * Fallback static portfolio & case study data.
 * Used when the backend API is unreachable, offline, or returns empty data.
 * Ensures the frontend never crashes and always displays rich, SEO-friendly project details.
 */

export const FALLBACK_PROJECTS = [
  {
    id: 1,
    slug: "windowsutils",
    title: "WindowsUtils.com - High-Speed Desktop Utility Suite",
    subtitle: "Engineered high-speed desktop & cloud email conversion suite processing 50+ formats locally with zero data loss",
    client_name: "WindowsUtils Inc.",
    industry: "Software & Tools",
    duration: "6 Months",
    team_size: "6 Engineers",
    technologies: ["Electron", "Node.js", "React", "C++", "FastAPI", "AWS"],
    services: [
      "Desktop Software Development",
      "Email Archival & Migration",
      "Performance Engineering",
    ],
    // Editorial Case Study Narrative (Structured exactly like modern technical reports)
    approach:
      "Our core focus was on implementing a lightweight, multithreaded native C++ extraction pipeline running entirely on local machine resources. By bypassing third-party cloud relays, we guaranteed 100% data privacy for confidential legal e-discovery and enterprise archives.",
    overview:
      "WindowsUtils is an enterprise-grade desktop productivity suite engineered to handle high-volume mailbox conversions (MBOX to PDF, Outlook OST to PST, and cloud IMAP backups). Built with Electron and low-level binary parsers, the application processes gigabytes of email archives without memory degradation.",
    key_features: [
      "Zero-cloud offline stream parser guaranteeing complete client data privacy.",
      "Automated court-admissible Bates numbering engine with customizable page stamps.",
      "Multi-core batch conversion support for 25+ major email client file formats.",
      "SHA-256 automated cryptographic hash verification for forensic integrity.",
      "Direct MBOX stream extraction without loading full files into system RAM.",
      "Offline SQLite database indexing millions of email headers instantaneously.",
    ],
    roi_metrics: [
      "Zero cloud exposure — 100% compliant with strict NDA & legal discovery mandates.",
      "Over 45% faster throughput compared to conventional cloud-based converters.",
      "Zero data loss SLA maintained across more than 500,000 document extractions.",
      "Substantial cost savings by eliminating recurring per-gigabyte cloud processing fees.",
    ],
    what_they_gained: [
      "Fully sovereign desktop software ecosystem operating independently of external network state.",
      "Streamlined legal e-discovery workflows with instant Bates stamping and attachment indexing.",
      "High client satisfaction rating (4.9/5) across 50+ specialized file utility tools.",
      "Seamless backward compatibility across all modern Windows OS workstation versions.",
    ],
    challenge:
      "Users and legal teams needed enterprise-grade, independent desktop utilities to convert Outlook OST to PST, MBOX to PDF with court-admissible Bates stamps, and perform cloud IMAP backups completely locally without security risks.",
    solution:
      "Designed and built a modular desktop suite with a multi-utility engine, supporting 25+ email clients, 100% offline local processing, custom Bates headers, and automatic SHA-256 integrity verification.",
    architecture_details:
      "The desktop suite is developed on top of Electron and C++ native addons for multithreaded binary stream processing.\n- Direct MBOX stream extraction without loading full files into RAM.\n- Local SQLite database indexing millions of email headers instantly.\n- SHA-256 automated hash verification for strict court-admissible legal archiving.\n- Completely zero cloud telemetry to safeguard sensitive corporate emails.",
    results:
      "Over 1k+ active users, 100% data integrity SLA, 4.9/5 satisfaction rating across 50+ conversion tools.",
    key_highlights: [
      "100% Offline Processing — Zero cloud exposure",
      "Multi-Threaded Conversion Engine for 25+ email formats",
      "Court-Admissible Bates Numbering with custom stamps & headers",
      "Over 500+ Active Enterprise Installations",
    ],
    cover_image: "/portfolio/windowsutils.jpg",
    live_url: "https://windowsutils.com",
    metrics: [
      { label: "Active Users", value: "1K+" },
      { label: "File Formats", value: "25+" },
      { label: "Data Loss Rate", value: "0%" },
      { label: "Tools Built", value: "50+" },
    ],
    faqs: [
      {
        question: "Is internet connectivity required to run WindowsUtils converters?",
        answer:
          "No. All email conversions (MBOX to PDF, OST to PST) run locally on the user's workstation with zero cloud telemetry for maximum privacy.",
      },
      {
        question: "Does WindowsUtils support batch processing large archives?",
        answer:
          "Yes, our multithreaded engine can batch convert gigabytes of email archives simultaneously without memory exhaustion.",
      },
      {
        question: "Are generated PDFs compliant with legal e-discovery standards?",
        answer:
          "Yes, our automated Bates stamping engine embeds continuous prefixes, suffixes, and page counts verified with SHA-256 signatures.",
      },
      {
        question: "Can I preview email attachments before converting them?",
        answer:
          "Yes, the built-in viewer allows rich HTML previewing of emails, headers, metadata, and embedded attachments before finalizing exports.",
      },
    ],
    tags: ["Windows Software", "MBOX to PDF", "Desktop App", "Email Migration"],
    status: "published",
    featured: true,
  },
  {
    id: 2,
    slug: "fairsearches",
    title: "FairSearches.com - The Business & Local Search Hub",
    subtitle: "Scalable multi-service directory & local search engine connecting millions to verified restaurants, experts, jobs & travel",
    client_name: "FairSearches India",
    industry: "Marketplace & Search",
    duration: "9 Months",
    team_size: "10 Developers",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Elasticsearch", "Redis", "TailwindCSS"],
    services: [
      "High-Concurrency Search Engine",
      "Multi-tenant Marketplace",
      "SEO Optimization",
    ],
    approach:
      "We engineered a distributed Elasticsearch cluster coupled with high-efficiency Redis cache layers and asynchronous geo-spatial spatial polygon filters to index over 50,000 local merchant entries with sub-80 millisecond retrieval speeds.",
    overview:
      "FairSearches.com is an open digital marketplace and local discovery engine enabling Indian consumers to locate verified service providers, local shops, doctors, tutors, and event organizers. The architecture combines lightning-fast location-based filtering with in-app WhatsApp lead conversion tools.",
    key_features: [
      "Elasticsearch geo-distance indexing delivering results within a 5-kilometer user radius.",
      "Multi-tiered Redis cache invalidation layer ensuring sub-80ms lookup latency under heavy traffic.",
      "Automated merchant verification pipeline with mobile OTP and business registration checks.",
      "Dynamic programmatic SEO page generator indexing 50,000+ local keyword landings.",
      "Integrated click-to-WhatsApp and one-touch calling for instant consumer inquiry routing.",
      "Self-service merchant analytics dashboard tracking impressions, leads, and ratings.",
    ],
    roi_metrics: [
      "Sub-80 millisecond query response times handling tens of thousands of daily search queries.",
      "400% increase in organic SEO search traffic within the first 6 months of platform launch.",
      "Over 50,000 verified merchant listings active across 6 major commerce verticals.",
      "Over 3.5x higher inquiry conversion rate compared to static business listing directories.",
    ],
    what_they_gained: [
      "Resilient, auto-scaling marketplace platform capable of handling peak festive search surges.",
      "Comprehensive search telemetry and user behavior analytics to optimize local ad targeting.",
      "Enhanced local merchant trust through verified badges and real customer review moderation.",
      "Scalable multi-vertical revenue model covering paid listings, banner ads, and lead syndication.",
    ],
    challenge:
      "Building a lightning-fast search engine handling millions of local business queries across diverse categories (Services, Experts, Jobs, Travel, Events, Blogs) with geo-location filtering and sub-100ms response time.",
    solution:
      "Engineered an Elasticsearch-powered multi-faceted search infrastructure with dynamic filtering, automated business verification pipelines, and responsive mobile-first UI with real-time notifications.",
    architecture_details:
      "Architected as a high-concurrency search platform leveraging Next.js 14 and Elasticsearch clusters.\n- Elasticsearch multi-faceted index supporting geo-distance filtering within a 5km radius.\n- Redis caching layer delivering sub-80ms response times for high-volume searches.\n- Automated merchant verification pipeline with SMS/WhatsApp notifications.\n- Dynamic SEO landing page generation for 50,000+ local keywords across India.",
    results:
      "Sub-80ms search query latency, 50,000+ local businesses indexed, 400% organic SEO traffic growth in 6 months.",
    key_highlights: [
      "Sub-80ms Geo-Distance Search Engine Latency",
      "Multi-Vertical Directory covering Services, Experts, Jobs, Travel & Events",
      "Real-Time In-App Lead Generation & WhatsApp Connect",
      "Over 400% Organic SEO Traffic Increase in 6 months",
    ],
    cover_image: "/portfolio/fairsearches.jpg",
    live_url: "https://fairsearches.com",
    metrics: [
      { label: "Search Latency", value: "<80ms" },
      { label: "Indexed Listings", value: "50K+" },
      { label: "Organic Traffic", value: "+400%" },
      { label: "Categories", value: "6 Verticals" },
    ],
    faqs: [
      {
        question: "How does FairSearches achieve sub-80ms search speeds?",
        answer:
          "By utilizing Elasticsearch geo-distance filters combined with multi-tier Redis caching and database read-replicas.",
      },
      {
        question: "How are local businesses verified on the platform?",
        answer:
          "A hybrid automated KYC process checks business licenses and mobile OTPs before awarding verified trust badges.",
      },
      {
        question: "Can businesses track client lead inquiries?",
        answer:
          "Yes, verified merchants receive instant dashboard analytics, click-to-call telemetry, and real-time lead notifications.",
      },
      {
        question: "Is the platform mobile-responsive for on-the-go queries?",
        answer:
          "Yes, FairSearches is built mobile-first with Progressive Web App (PWA) caching for ultra-smooth performance on 4G and 5G networks.",
      },
    ],
    tags: ["Search Engine", "Local Business Hub", "Marketplace", "Elasticsearch"],
    status: "published",
    featured: true,
  },
  {
    id: 3,
    slug: "envirosure-audits",
    title: "EnviroSure Audit - ESG Compliance & Carbon Ledger",
    subtitle: "Audit-grade environmental compliance, Scope 1-3 GHG inventories & carbon advisory suite built for strict regulatory assurance",
    client_name: "EnviroSure Global",
    industry: "CleanTech & Compliance",
    duration: "8 Months",
    team_size: "7 Developers",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "Python"],
    services: [
      "ESG Compliance Platform",
      "Carbon Footprint Accounting",
      "Automated Audit Dossiers",
    ],
    approach:
      "We engineered a deterministic emission computation engine mapping ISO 14064 calculation rules to corporate utility feeds and fuel logs, complete with cryptographic hash validation to prevent retrospective tampering during formal environmental audits.",
    overview:
      "EnviroSure Audit is an enterprise environmental sustainability management system (EMS) built to simplify ESG disclosure. The platform calculates greenhouse gas emissions across Scope 1, 2, and 3 tiers, producing audit-ready compliance dossiers in seconds.",
    key_features: [
      "Automated Scope 1, Scope 2, and Scope 3 greenhouse gas (GHG) computation engine.",
      "Full compliance with ISO 14064, GHG Protocol Corporate Standard, and BRSR guidelines.",
      "Automated utility bill parser converting raw invoice metrics into standardized CO2e values.",
      "One-click audit dossier generator creating certified PDF reports with digital signatures.",
      "Dedicated third-party auditor portal with review checkpoints and computation ledger logs.",
      "Historical emissions trend forecasting powered by linear regression models.",
    ],
    roi_metrics: [
      "70% reduction in internal auditor and staff hours required for annual sustainability audits.",
      "Over 120 formal compliance audits passed across industrial and commercial facilities.",
      "Managing carbon portfolios and green credit allocations exceeding $50 Million USD.",
      "Eliminated 100% of calculation discrepancies and manual spreadsheet ledger errors.",
    ],
    what_they_gained: [
      "Complete transparency into organizational carbon footprint with granular breakdown by site.",
      "Confidence during government regulatory inspections backed by cryptographically signed audit trails.",
      "Streamlined ESG reporting for investor briefings, sustainability ratings, and ESG bond issuance.",
      "Centralized document repository storing emission factors, utility bills, and auditor sign-offs.",
    ],
    challenge:
      "Corporations required a tamper-proof carbon accounting ledger to calculate Scope 1, 2, and 3 emissions while producing auditor-ready reports matching ISO 14064 standards.",
    solution:
      "Created a robust cloud platform that ingests raw utility bills, applies verified emission factors, and generates digitally-signed audit dossiers in minutes.",
    architecture_details:
      "Built as an audit-grade environmental accounting suite with tamper-proof calculation ledgers.\n- Scope 1, Scope 2, and Scope 3 automated greenhouse gas (GHG) calculations.\n- Verifiable audit trail compliant with ISO 14064 and GHG Protocol guidelines.\n- Automated regulatory report generator producing audit-ready PDF dossiers in one click.\n- Role-based auditor review workflows with cryptographic digital signature verification.",
    results:
      "70% reduction in audit preparation time, 120+ regulatory audits passed, and over $50M in carbon credit portfolios managed.",
    key_highlights: [
      "Automated Scope 1, 2, and 3 Greenhouse Gas Accounting",
      "Audit-Grade Regulatory Assurance with 120+ Audits Passed",
      "70% Reduction in Corporate Environmental Audit Preparation Time",
      "Managing over $50 Million in Green Credit Portfolios",
    ],
    cover_image: "/portfolio/envirosure.jpg",
    live_url: "https://envirosureaudit.com",
    metrics: [
      { label: "Audit Time Reduced", value: "-70%" },
      { label: "Audits Passed", value: "120+" },
      { label: "GHG Protocols", value: "100% Compliant" },
      { label: "Portfolio Managed", value: "$50M+" },
    ],
    faqs: [
      {
        question: "What standards are supported by EnviroSure Audit?",
        answer:
          "EnviroSure adheres to ISO 14064, the GHG Protocol corporate standard, and national Green Credit compliance mandates.",
      },
      {
        question: "How does it reduce audit preparation time by 70%?",
        answer:
          "By centralizing utility bills, emission factors, and fuel logs into automated calculation pipelines with pre-built auditor dashboards.",
      },
      {
        question: "Can external auditors access the platform directly?",
        answer:
          "Yes, dedicated auditor roles can review raw computation logs, leave notes, and issue digital compliance stamps.",
      },
      {
        question: "Does the platform support multi-site facility consolidation?",
        answer:
          "Yes, multinational corporations can group global facilities by region, country, or legal entity with automatic currency and unit conversions.",
      },
    ],
    tags: ["ESG Platform", "Carbon Accounting", "CleanTech", "Audits"],
    status: "published",
    featured: true,
  },
];

/**
 * Helper to get a single project by slug from fallback data.
 */
export function getFallbackProjectBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();
  return FALLBACK_PROJECTS.find((p) => p.slug.toLowerCase() === cleanSlug) || null;
}

/**
 * Portfolio Hero Showcase SEO & Milestone Data
 * Tailored uniquely for Dharam Vir Infotech (DVI) - No plagiarism, unique tone & metrics.
 */
export const PORTFOLIO_HERO_DATA = {
  badgeText: "DHARAM VIR INFOTECH • ENGINEERING SHOWCASE",
  headingPrefix: "Engineering High-Performance Software For ",
  headingHighlight: "Mission-Critical Demands",
  description:
    "We architect resilient digital systems where precision and throughput matter most. From offline-first enterprise desktop utilities with zero data loss to geo-distributed search engines processing millions of listings, explore how our engineering delivers tangible business advantages.",
  pills: [
    "Enterprise Desktop Utilities",
    "High-Concurrency Search Engines",
    "Carbon & ESG Compliance Portals",
    "Cross-Platform Native Apps",
  ],
  capabilities: [
    { title: "Offline Local Processing", subtitle: "100% On-Premise Privacy", stat: "0% Data Leak" },
    { title: "Microsecond Latency", subtitle: "Redis & Elasticsearch Clusters", stat: "<80ms" },
    { title: "Multi-Format Parsers", subtitle: "Multithreaded C++ Core", stat: "50+ Formats" },
  ],
  mockup: {
    systemStatus: "Production Cluster Active",
    platformName: "DVI System Telemetry & Metrics",
    activeSessions: "142,800+ Live Users",
    queryThroughput: "99.99% Uptime",
    latencyStats: "38ms Engine Avg",
    dataVolume: "10.4 TB Clean Data Processed",
    liveTabs: [
      { id: "desktop", label: "WindowsUtils Engine", active: true },
      { id: "search", label: "FairSearches Grid", active: false },
      { id: "esg", label: "EnviroSure Ledger", active: false },
    ],
    liveNodes: [
      {
        name: "C++ Stream Extraction Core",
        spec: "Zero-RAM-Spike multithreaded binary parser",
        metric: "50+ Formats",
        status: "Active",
        statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40",
      },
      {
        name: "Elasticsearch Geospatial Mesh",
        spec: "Geo-polygon indexing within 5km radius",
        metric: "<80ms Query",
        status: "Online",
        statusColor: "text-accent bg-blue-950/60 border-blue-800/40",
      },
      {
        name: "ISO 14064 Emission Ledger",
        spec: "Scope 1-3 GHG automated calculation pipeline",
        metric: "120+ Audits",
        status: "Certified",
        statusColor: "text-amber-400 bg-amber-950/60 border-amber-800/40",
      },
    ],
    floatingCard: {
      badge: "Verified Reliability Benchmark",
      primaryMetric: "1,000,000+",
      secondaryMetric: "Active PC Installs",
      description: "Proven high-speed conversion with court-admissible Bates validation.",
    },
  },
  milestones: [
    {
      value: "500+",
      label: "Active Installations",
      description:
        "Global enterprises and legal teams relying on our local desktop conversion suites daily.",
    },
    {
      value: "<80ms",
      label: "Search & Query Latency",
      description:
        "Engineered with tiered Redis caching and distributed Elasticsearch indexes across India.",
    },
    {
      value: "100%",
      label: "Offline Data Privacy",
      description:
        "Strict client privacy with offline processing, zero cloud telemetry, and SHA-256 hash checks.",
    },
    {
      value: "99.99%",
      label: "Platform Availability",
      description:
        "Round-the-clock cluster health monitoring, automated backups, and resilient cloud architecture.",
    },
  ],
};
