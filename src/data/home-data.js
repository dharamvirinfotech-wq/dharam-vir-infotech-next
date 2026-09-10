import {
  Headphones,
  Briefcase,
  Building2,
  Globe,
  User,
  ShieldCheck,
  Server,
  Smartphone,
  Brain,
  Code2,
  Target,
  Users,
  Zap,
  Shield,
  Cloud,
  Cpu,
  Award,
  Boxes,
  Compass,
  FileCode2,
  Palette,
  Rocket,
  RefreshCw,
  Layers,
  Workflow,
  Terminal,
  Sparkles,
  Database,
  HardDrive,
  CheckCircle,
  Globe2,
  Monitor,
  CreditCard,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Truck,
  Bot,
  MessageSquareCode,
  BarChart3,
} from "lucide-react";

// 1. Hero Carousel Slides Data
export const heroSlidesData = [
  {
    id: 1,
    categoryTag: "TECHNOLOGY",
    headingPrefix: "Apps Built to ",
    headingHighlight: "Perform and Engage Potential",
    description:
      "We deliver high-concurrency, enterprise-ready web & mobile applications designed for ultra-fast performance, intuitive UX, and rapid business scaling.",
    primaryCtaText: "Our Services",
    primaryCtaLink: "/services",
    secondaryCtaText: "Talk to Experts",
    secondaryCtaLink: "/contact",
    bgImage: "/slides/bg1.jpg",
  },
  {
    id: 2,
    categoryTag: "AGENTIC AI DEVELOPMENT",
    headingPrefix: "Build Intelligent Autonomous ",
    headingHighlight: "Agents of the Future",
    description:
      "Empower your business with cutting-edge LLM frameworks, generative AI automation, and intelligent neural workflows that think and act independently.",
    primaryCtaText: "Explore AI Solutions",
    primaryCtaLink: "/services",
    secondaryCtaText: "About Our Tech",
    secondaryCtaLink: "/about",
    bgImage: "/slides/bg2.jpg",
  },
  {
    id: 3,
    categoryTag: "TOP 1% TECH TALENT",
    headingPrefix: "Scale Your Dev Team With ",
    headingHighlight: "Dedicated Engineers",
    description:
      "Instantly onboard pre-vetted React, Node.js, Python, Mobile & DevOps engineers with 100% code ownership, agile delivery, and zero overhead.",
    primaryCtaText: "Hire Developers",
    primaryCtaLink: "/hire-developer",
    secondaryCtaText: "Contact Sales",
    secondaryCtaLink: "/contact",
    bgImage: "/slides/bg3.jpg",
  },
  {
    id: 4,
    categoryTag: "CROSS-PLATFORM MOBILE EXCELLENCE",
    headingPrefix: "Seamless Digital Mobile ",
    headingHighlight: "Experiences Everywhere",
    description:
      "Design and deploy native iOS & Android applications engineered for fluid UI/UX, low-latency API integration, and continuous engagement.",
    primaryCtaText: "View Our Portfolio",
    primaryCtaLink: "/portfolio",
    secondaryCtaText: "Get Free Estimate",
    secondaryCtaLink: "/contact",
    bgImage: "/slides/bg4.jpg",
  },
];

// 2. Stats Section Data
export const homeStatsData = [
  {
    value: "24/7",
    label: "Dedicated Support",
    icon: Headphones,
  },
  {
    value: "50+",
    label: "Projects Delivered",
    icon: Briefcase,
  },
  {
    value: "15+",
    label: "Industries We Serve",
    icon: Building2,
  },
  {
    value: "5+",
    label: "Countries Worldwide",
    icon: Globe,
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: User,
  },
  {
    value: "100%",
    label: "NDA-Protected & Secure",
    icon: ShieldCheck,
  },
];

// 3. Featured Services Cards (4 Core Services)
export const homeServicesData = [
  {
    id: "ai-solutions",
    icon: Brain,
    badge: "AI Powered",
    title: "AI & Machine Learning",
    desc: "Custom AI agents, ChatGPT/LLM integrations, predictive analytics, and intelligent workflow automation designed to accelerate business productivity.",
    link: "/services/ai-development",
  },
  {
    id: "web-dev",
    icon: Code2,
    title: "Web & Enterprise Apps",
    desc: "Custom web applications, SaaS platforms, and enterprise software built with modern tech stacks for high speed, security, and global scalability.",
    link: "/services/web-development",
  },
  {
    id: "mobile-dev",
    icon: Smartphone,
    title: "Mobile App Engineering",
    desc: "High-performance native iOS, Android, and cross-platform Flutter/React Native mobile applications with intuitive UI/UX and cloud backends.",
    link: "/services/mobile-development",
  },
  {
    id: "cloud-devops",
    icon: Server,
    title: "Cloud & DevOps Solutions",
    desc: "Cloud architecture (AWS/GCP/Azure), CI/CD pipeline automation, microservices, and 24/7 enterprise infrastructure management.",
    link: "/services/product-engineering",
  },
];

// 4. About Section Features & Highlights
export const homeAboutFeatures = [
  { icon: Target, title: "Result-Driven Strategy", desc: "Measurable ROI, growth metrics, and high-impact digital execution." },
  { icon: Users, title: "Top Tech Engineers", desc: "Senior developers, UI/UX designers, and Cloud Solution architects." },
  { icon: Zap, title: "Next-Gen Tech Stack", desc: "React, Node, AI/ML, Cloud Native, Microservices, and Mobile apps." },
  { icon: Shield, title: "Enterprise Grade Security", desc: "ISO 27001 standard practices, 100% IP rights, and NDA protection." },
];

export const homeAboutHighlights = [
  "Custom Web & Mobile Development",
  "Dedicated Developer Hiring Models",
  "End-to-End Product Engineering",
  "24/7 Global Maintenance & Support",
];

// 5. Why Choose Us Value Props
export const homeWhyChooseUsData = [
  {
    id: "ai-engineering",
    icon: Cpu,
    title: "AI-Driven Neural Engineering",
    desc: "Leverage intelligent agentic workflows, LLM integrations, and predictive machine learning models designed to automate operational tasks and amplify business speed.",
    badge: "Next-Gen AI",
  },
  {
    id: "top-talent",
    icon: Award,
    title: "Top 1% Senior Tech Talent",
    desc: "Onboard handpicked senior full-stack developers, mobile specialists, and Cloud DevOps architects who integrate into your workflow with zero ramp-up time.",
    badge: "Elite Engineers",
  },
  {
    id: "ip-privacy",
    icon: ShieldCheck,
    title: "100% IP Ownership & NDA",
    desc: "Maintain complete legal rights to your source code, proprietary algorithms, and enterprise architecture with zero vendor lock-in and strict NDA enforcement.",
    badge: "Full Ownership",
  },
  {
    id: "cloud-performance",
    icon: Zap,
    title: "High-Concurrency Cloud Speed",
    desc: "Deploy microservices built to seamlessly handle millions of concurrent transactions with sub-second response times and 99.99% uptime SLAs.",
    badge: "Ultra Fast",
  },
  {
    id: "modular-arch",
    icon: Boxes,
    title: "Future-Proof Clean Code",
    desc: "Construct decoupled modular architectures and robust codebases designed for rapid feature deployment, effortless scaling, and zero technical debt.",
    badge: "Clean Architecture",
  },
  {
    id: "global-support",
    icon: Headphones,
    title: "24/7 Global DevOps Operations",
    desc: "Receive round-the-clock infrastructure monitoring, instant security patching, and continuous performance optimization across all global time zones.",
    badge: "Always Online",
  },
];

// 6. Industries Section Data
export const homeIndustriesData = [
  {
    id: "windows-tools",
    icon: Monitor,
    title: "Windows Utility & Desktop Software",
    desc: "Build robust native Windows desktop tools, PDF utilities, email processing software, system automation scripts, and high-performance desktop applications.",
    badge: "Desktop Utility",
    link: "/services/product-engineering",
  },
  {
    id: "fintech",
    icon: CreditCard,
    title: "FinTech & Payment Systems",
    desc: "Engineer PCI-compliant digital payment gateways, secure banking portals, automated financial analytics, and fraud detection platforms.",
    badge: "FinTech",
    link: "/services/web-development",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare & MedTech Solutions",
    desc: "Develop HIPAA-compliant patient management portals, EHR integrations, AI diagnostic tools, and real-time telemedicine mobile applications.",
    badge: "HealthTech",
    link: "/services/mobile-development",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "Multi-Vendor E-Commerce",
    desc: "Build high-concurrency online marketplaces, real-time inventory management engines, personalized AI recommendations, and custom checkout flows.",
    badge: "Retail",
    link: "/services/web-development",
  },
  {
    id: "realestate",
    icon: Building2,
    title: "PropTech & Real Estate Platforms",
    desc: "Construct interactive property listing portals, 3D virtual tour integrations, automated lead pipelines, and tenant CRM platforms.",
    badge: "PropTech",
    link: "/services/web-development",
  },
  {
    id: "edtech",
    icon: GraduationCap,
    title: "EdTech & Learning Management",
    desc: "Create adaptive e-learning SaaS platforms, virtual classrooms, automated AI grading engines, and interactive student mobile apps.",
    badge: "EdTech",
    link: "/services/mobile-development",
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics & Fleet Automation",
    desc: "Optimize supply chain operations with real-time GPS fleet tracking, warehouse management software, route optimization, and automated dispatch.",
    badge: "Logistics",
    link: "/services/product-engineering",
  },
];

// 7. AI Solutions Section Data
export const homeAiSolutionsData = [
  {
    id: "agentic-ai",
    icon: Bot,
    title: "Autonomous Agentic Workflows",
    desc: "Deploy intelligent autonomous AI agents that handle multi-step tasks, evaluate decision trees, and execute complex business logic seamlessly.",
    badge: "Agentic AI",
  },
  {
    id: "predictive-ml",
    icon: Cpu,
    title: "Enterprise Predictive ML Models",
    desc: "Train custom neural networks and machine learning pipelines that forecast market trends, detect anomalies, and optimize operational resource allocation.",
    badge: "Predictive AI",
  },
  {
    id: "custom-llm",
    icon: Zap,
    title: "Generative AI & Custom LLMs",
    desc: "Fine-tune proprietary Large Language Models (LLMs) integrated securely with your private enterprise knowledge base and internal APIs.",
    badge: "Custom LLMs",
  },
  {
    id: "conversational-ai",
    icon: MessageSquareCode,
    title: "Conversational Virtual Assistants",
    desc: "Elevate client engagement with 24/7 multi-lingual AI assistants equipped with natural language understanding and context awareness.",
    badge: "Smart Assistants",
  },
  {
    id: "legacy-modernization",
    icon: RefreshCw,
    title: "Cloud & Legacy Modernization",
    desc: "Modernize monolithic legacy architectures into agile, cloud-native microservices powered by automated AI refactoring and optimization.",
    badge: "Cloud AI",
  },
  {
    id: "data-analytics",
    icon: BarChart3,
    title: "Real-Time Data Intelligence",
    desc: "Turn raw unstructured data streams into high-impact executive dashboards and real-time actionable business intelligence.",
    badge: "Data Analytics",
  },
];

// 8. Process Steps Data
export const homeProcessStepsData = [
  {
    number: 1,
    title: "Discovery & Analysis",
    desc: "Understand objectives, challenges, user needs, and technical requirements.",
    icon: Compass,
  },
  {
    number: 2,
    title: "Consulting & Planning",
    desc: "Define project scope, architecture, timelines, and technology strategy.",
    icon: FileCode2,
  },
  {
    number: 3,
    title: "UI/UX Design",
    desc: "Create intuitive user experiences and modern interfaces focused on engagement.",
    icon: Palette,
  },
  {
    number: 4,
    title: "Development",
    desc: "Build secure and scalable software solutions using agile development practices.",
    icon: Code2,
  },
  {
    number: 5,
    title: "Quality Assurance",
    desc: "Conduct thorough testing to ensure performance, security, and reliability.",
    icon: ShieldCheck,
  },
  {
    number: 6,
    title: "Deployment",
    desc: "Launch applications efficiently with cloud-ready infrastructure and monitoring.",
    icon: Rocket,
  },
  {
    number: 7,
    title: "Support & Optimization",
    desc: "Provide continuous maintenance, updates, and performance enhancements.",
    icon: RefreshCw,
  },
];

// 9. Technologies Section Data
export const homeTechnologiesCategories = [
  {
    id: "frontend",
    title: "Frontend Dev",
    subtitle: "Interactive & blazing fast interfaces",
    items: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: Globe2 },
      { name: "Angular", icon: Layers },
      { name: "Vue.js", icon: Workflow },
    ],
  },
  {
    id: "backend",
    title: "Backend Systems",
    subtitle: "Highly secure & scalable systems",
    items: [
      { name: "Node.js", icon: Server },
      { name: "Python", icon: Terminal },
      { name: "Java", icon: Cpu },
      { name: ".NET", icon: Boxes },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Solutions",
    subtitle: "Flawless mobile user experiences",
    items: [
      { name: "Flutter", icon: Zap },
      { name: "React Native", icon: Smartphone },
      { name: "iOS", icon: Sparkles },
      { name: "Android", icon: Code2 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Services",
    subtitle: "Robust cloud hosting & infrastructure",
    items: [
      { name: "AWS", icon: Cloud },
      { name: "Azure", icon: Server },
      { name: "Google Cloud", icon: Globe2 },
      { name: "Docker", icon: Boxes },
    ],
  },
  {
    id: "database",
    title: "Database Engines",
    subtitle: "Rock-solid data storage & architecture",
    items: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: HardDrive },
      { name: "Redis", icon: Zap },
      { name: "GraphQL", icon: CheckCircle },
    ],
  },
];

// 10. Featured Projects Data
export const homeFeaturedProjects = [
  {
    title: "Global E-Commerce Platform",
    category: "Web Engineering",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    desc: "Built a high-concurrency multi-vendor e-commerce platform processing 100,000+ monthly transactions with real-time analytics.",
    link: "/portfolio",
  },
  {
    title: "AI Healthcare Patient Portal",
    category: "Mobile & AI",
    tags: ["React Native", "Python", "FastAPI", "HIPAA"],
    desc: "Designed a secure mobile health app for telemedicine appointments, AI symptoms assessment, and electronic health records.",
    link: "/portfolio",
  },
  {
    title: "PropTech Real Estate Platform",
    category: "Enterprise Web",
    tags: ["Next.js", "TailwindCSS", "Mapbox", "AWS"],
    desc: "Engineered an interactive real estate portal with 3D virtual tours, automated lead pipelines, and instant mortgage calculators.",
    link: "/portfolio",
  },
  {
    title: "EdTech Learning Management",
    category: "SaaS & AI",
    tags: ["TypeScript", "AI Recommendation", "Docker", "Redis"],
    desc: "Created an adaptive learning SaaS platform featuring AI-generated quizzes, live virtual classrooms, and automated grading.",
    link: "/portfolio",
  },
];

// 11. Home Page FAQs
export const homeFaqData = [
  {
    id: "custom-software",
    question: "What Does A Custom Software Development Company Do?",
    answer: "A custom software development company designs, builds, tests, and deploys tailored digital applications, web platforms, and mobile software engineered specifically to meet your organization's unique business goals, workflows, and operational requirements.",
  },
  {
    id: "outsourced-dev",
    question: "Why Choose Outsourced Software Development?",
    answer: "Outsourcing software development significantly reduces operational overhead, grants immediate access to top-tier senior tech talent, accelerates product time-to-market, and allows your core leadership to focus entirely on scaling business operations.",
  },
  {
    id: "consulting-services",
    question: "Does Dharam Vir Infotech Provide Software Consulting Services?",
    answer: "Yes! We provide strategic IT consulting, enterprise architecture planning, legacy system modernization, tech stack audits, and end-to-end digital transformation roadmaps to optimize your technology infrastructure.",
  },
  {
    id: "enterprise-solutions",
    question: "Do You Develop Enterprise Software Solutions?",
    answer: "Absolutely. We specialize in building high-concurrency enterprise web applications, AI-powered CRM systems, scalable microservices architectures, cloud-native ERPs, and automated workflow pipelines designed to scale effortlessly.",
  },
  {
    id: "tech-stack",
    question: "What Technologies Does Dharam Vir Infotech Use?",
    answer: "We leverage modern industry-standard technologies including React, Next.js, Node.js, Python, Flutter, React Native, Java, .NET, Go, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, and Agentic AI frameworks.",
  },
  {
    id: "web-mobile-apps",
    question: "Can You Build Web And Mobile Applications?",
    answer: "Yes, we engineer full-cycle responsive web applications and cross-platform native mobile apps (for iOS and Android) featuring fluid UI/UX design, low-latency API integration, and enterprise-grade security standards.",
  },
  {
    id: "ai-benefits",
    question: "How Do AI-Powered Software Solutions Benefit Businesses?",
    answer: "AI-powered solutions automate repetitive operational tasks, deliver predictive real-time business insights, enhance client engagement via autonomous intelligent agents, and drive higher operational ROI and productivity.",
  },
];
