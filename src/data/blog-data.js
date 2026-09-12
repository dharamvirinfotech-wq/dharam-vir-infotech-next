/**
 * Centralized Single Source of Truth for Blog Posts & Technical Articles
 * Dharam Vir Infotech - High-Velocity Engineering & Enterprise Software Insights
 */

export const BLOG_CATEGORIES = [
  "All",
  "AI & Automation",
  "Software Development",
  "Mobile Apps",
  "Cloud & DevOps",
  "System Software",
];

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "what-is-agentic-ai-revolutionizing-it-operations",
    title: "What is Agentic AI — And Why It's Revolutionizing Enterprise IT Operations in 2026",
    excerpt:
      "Unlike passive chatbots, autonomous AI agents execute multi-step engineering tasks, self-heal cloud infrastructure, and eradicate operational friction.",
    category: "AI & Automation",
    badge: "FEATURED INSIGHT",
    date: "Sep 08, 2026",
    readTime: "6 min read",
    author: {
      name: "Er. Dharamvir Kumar",
      role: "Chief Technology Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    image: "/blogs/agentic-ai-operations.jpg",
    tags: ["Agentic AI", "Autonomous Systems", "IT Automation", "Machine Learning"],
    summary:
      "Autonomous AI systems are shifting enterprise IT from reactive alert dashboards to self-directed orchestration. Here is how leading CTOs implement agentic workflows safely.",
    content: [
      {
        heading: "From Scripted Bots to Autonomous Reasoning",
        paragraphs: [
          "For decades, IT automation meant rigid if-this-then-that scripts. If a server exceeded 90% memory threshold, an alert went out to a sleep-deprived DevOps engineer on call.",
          "Agentic AI transforms this paradigm completely. Rather than waiting for human intervention, an autonomous agent inspects telemetry, reasons across multiple log streams, isolates the runaway memory process, generates a localized fix, and tests the container in isolation before gracefully recycling it.",
        ],
      },
      {
        heading: "The 3 Pillars of Production Agentic Architecture",
        paragraphs: [
          "1. Perception & Observability: High-throughput ingestion of distributed OpenTelemetry traces, database locks, and user telemetry.",
          "2. Deterministic Guardrails: Giving an agent access to cloud APIs requires strict cryptographic boundaries, least-privilege IAM roles, and human-in-the-loop review triggers for destructive tasks.",
          "3. Continuous Memory & Feedback: Storing incident post-mortems in vector databases so the system continually improves resolution latency over time.",
        ],
      },
      {
        heading: "Real-World Business ROI",
        paragraphs: [
          "Enterprises deploying agentic workflows report an average 74% reduction in Mean Time to Resolution (MTTR) and over 40% reduction in Level-1 infrastructure ticket escalation.",
          "At Dharam Vir Infotech, our custom agentic pipelines integrate seamlessly with client GitHub repositories and AWS/GCP clusters, providing verified autonomous stability around the clock.",
        ],
      },
    ],
    keyTakeaways: [
      "Agentic AI shifts teams from reactive alerting to proactive self-healing.",
      "Strict least-privilege IAM guardrails are essential before giving agents write access.",
      "74% average reduction in operational MTTR observed in production environments.",
    ],
  },
  {
    id: 2,
    slug: "architecting-resilient-cloud-native-microservices",
    title: "Architecting Resilient Cloud-Native Microservices with Kubernetes and Terraform",
    excerpt:
      "A deep technical breakdown of multi-region failover, automated GitOps deployment pipelines, and zero-downtime database replication strategies.",
    category: "Cloud & DevOps",
    badge: "DEVOPS DEEP-DIVE",
    date: "Aug 29, 2026",
    readTime: "8 min read",
    author: {
      name: "Saurav Mukherjee",
      role: "Principal Cloud DevOps Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    image: "/blogs/cloud-native-microservices.jpg",
    tags: ["Kubernetes", "Cloud Migration", "Terraform", "GitOps", "Microservices"],
    summary:
      "Modern enterprises cannot tolerate cloud outages. Learn how we engineer decoupled Kubernetes clusters with automated traffic failover under 15 minutes.",
    content: [
      {
        heading: "The Myth of 100% Single-Cloud Availability",
        paragraphs: [
          "Every major cloud provider experiences localized data center outages, fiber cuts, and DNS disruptions. Designing for enterprise resilience means assuming failure is inevitable and engineering multi-region redundancy as code.",
          "By defining your complete cloud topography in Terraform (IaC) and deploying via declarative ArgoCD pipelines, your engineering organization can spin up an identical secondary production cluster in under 12 minutes.",
        ],
      },
      {
        heading: "Active-Active vs Active-Passive Replication",
        paragraphs: [
          "For mission-critical fintech and marketplace platforms, we deploy asynchronous read-replicas with live Change Data Capture (CDC). During scheduled cutovers or unexpected hardware faults, automated DNS routing redirects incoming client requests without dropped TCP sessions.",
        ],
      },
    ],
    keyTakeaways: [
      "Declarative Infrastructure as Code ensures repeatable disaster recovery under 15 minutes.",
      "GitOps with ArgoCD prevents configuration drift between staging and production clusters.",
      "Live CDC database synchronization eliminates data loss during cloud cutover.",
    ],
  },
  {
    id: 3,
    slug: "scalable-enterprise-web-apps-with-nextjs-and-react",
    title: "Why Modern Enterprise Software Demands Next.js & Modular Component Architecture",
    excerpt:
      "How hybrid server rendering, edge caching, and strict component boundaries slash technical debt and scale to millions of concurrent sessions.",
    category: "Software Development",
    badge: "FRONTEND ARCHITECTURE",
    date: "Aug 18, 2026",
    readTime: "5 min read",
    author: {
      name: "Pooja Sharma",
      role: "Lead Full-Stack Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    image: "/blogs/react-enterprise-architecture.jpg",
    tags: ["Next.js", "React", "Enterprise Web", "TypeScript", "Performance"],
    summary:
      "Monolithic client-side SPAs quickly bloat. Discover how server components and edge middleware deliver sub-second time-to-interactive for enterprise dashboards.",
    content: [
      {
        heading: "Overcoming SPA Bundle Bloat",
        paragraphs: [
          "Large enterprise web applications often suffer from multi-megabyte JavaScript bundles that take 4+ seconds to parse on mobile devices. Next.js Server Components shift data-heavy computation to the server, streaming minimal HTML payloads to the client.",
          "Coupled with strict atomic design systems and Tailwind utility isolation, development teams ship features 3x faster without breaking unrelated layout contracts.",
        ],
      },
    ],
    keyTakeaways: [
      "Server-side rendering reduces initial JavaScript payload by up to 60%.",
      "Unified design systems eliminate CSS specificity wars and speed up development.",
      "Edge caching delivers sub-100ms response times for global enterprise users.",
    ],
  },
  {
    id: 4,
    slug: "flutter-cross-platform-mobile-engineering-in-production",
    title: "Cutting Mobile Engineering Costs by 40% with Flutter Without Sacrificing Native Speed",
    excerpt:
      "Practical benchmarks comparing Swift/Kotlin native builds against optimized Flutter rendering engines across 50+ diverse device specifications.",
    category: "Mobile Apps",
    badge: "MOBILE ENGINEERING",
    date: "Aug 06, 2026",
    readTime: "7 min read",
    author: {
      name: "Rahul Verma",
      role: "Senior Mobile Solutions Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    image: "/blogs/flutter-cross-platform-engineering.jpg",
    tags: ["Flutter", "Mobile Engineering", "iOS", "Android", "Cross-Platform"],
    summary:
      "Maintaining two disparate engineering teams for iOS and Android introduces synchronization delays and doubled QA costs. Flutter's Impeller engine changes the equation.",
    content: [
      {
        heading: "The Impeller Rendering Revolution",
        paragraphs: [
          "Early cross-platform tools suffered from jank during initial shader compilation. With Flutter's Impeller graphics engine, shaders are pre-compiled ahead of time, ensuring butter-smooth 120Hz animations on both high-end iPhones and budget Android smartphones.",
          "A single shared codebase allows product teams to release features simultaneously on the Apple App Store and Google Play Store with zero platform discrepancies.",
        ],
      },
    ],
    keyTakeaways: [
      "Pre-compiled shaders eliminate jank and maintain 120Hz display refresh rates.",
      "Single codebase cuts ongoing maintenance and QA testing cycles by 40%.",
      "Direct native platform channels grant complete access to biometric and camera hardware.",
    ],
  },
  {
    id: 5,
    slug: "engineering-high-speed-desktop-utilities-with-native-cpp",
    title: "Low-Level C++ Systems Engineering: How We Build Zero-Leak Desktop Utilities",
    excerpt:
      "Processing gigabytes of PST, MBOX, and PDF binaries locally on customer machines without memory exhaustion or external cloud dependencies.",
    category: "System Software",
    badge: "SYSTEMS PROGRAMMING",
    date: "Jul 22, 2026",
    readTime: "9 min read",
    author: {
      name: "Er. Dharamvir Kumar",
      role: "Chief Technology Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    image: "/blogs/desktop-utilities-high-speed-parsers.jpg",
    tags: ["C++", "Desktop Software", "Memory Safety", "Windows Software", "Electron"],
    summary:
      "When enterprise legal teams need to parse confidential email mailboxes, cloud uploads are strictly forbidden. Learn how we engineer native multi-threaded desktop engines.",
    content: [
      {
        heading: "Why Cloud-First Isn't Always the Answer",
        paragraphs: [
          "In litigation e-discovery and forensic compliance, strict corporate NDAs prohibit uploading internal email databases to external SaaS servers. Desktop utilities that operate 100% offline on the customer's machine are an absolute prerequisite.",
          "By pairing Electron with low-level C++ native addons via N-API, we deliver intuitive modern user interfaces powered by lightning-fast binary stream processors.",
        ],
      },
      {
        heading: "Zero Data Loss Through Memory Pointers",
        paragraphs: [
          "Rather than loading full multi-gigabyte mailbox files into system RAM, our parsers utilize memory-mapped file streams and circular worker pools. This guarantees zero memory degradation even after 48 hours of continuous batch processing.",
        ],
      },
    ],
    keyTakeaways: [
      "100% offline execution satisfies strict NDA and e-discovery legal requirements.",
      "Memory-mapped file streams prevent system crashes during multi-gigabyte conversions.",
      "Cryptographic SHA-256 validation guarantees verifiable document integrity.",
    ],
  },
];

/**
 * Technical Insights & Blog FAQs for the Blog Page
 */
export const blogFaqsData = [
  {
    id: "faq-blog-1",
    question: "How often does Dharam Vir Infotech publish technical blogs & architectural papers?",
    answer:
      "We publish bi-weekly engineering deep-dives, production post-mortems, and architectural benchmarks directly authored by our senior software engineers and cloud architects.",
  },
  {
    id: "faq-blog-2",
    question: "Are the case studies and technical tutorials based on real client deployments?",
    answer:
      "Yes. Every technical post stems from production systems we design and manage, including multi-threaded desktop utilities (WindowsUtils), geo-search engines (FairSearches), and ESG carbon ledgers (EnviroSure Audit).",
  },
  {
    id: "faq-blog-3",
    question: "Can I request a custom technical breakdown or architectural consultation?",
    answer:
      "Absolutely. If your team is evaluating Next.js, Kubernetes migration, Agentic AI, or Flutter mobile engineering, you can reach out via our contact page for a direct engineering consultation.",
  },
  {
    id: "faq-blog-4",
    question: "Do you publish source code or starter templates for these architectures?",
    answer:
      "We frequently open-source boilerplates, N-API C++ addons, and Terraform modules on our official GitHub repository for developer community benefit.",
  },
  {
    id: "faq-blog-5",
    question: "How can I subscribe to get notified about new technical releases?",
    answer:
      "You can enter your corporate email in our 'Tech Radar' subscription box above to receive curated bi-weekly engineering digests with zero promotional spam.",
  },
];

/**
 * Helper to look up a blog post by its URL slug
 */
export function getBlogPostBySlug(slug) {
  if (!slug) return null;
  return BLOG_POSTS.find((post) => post.slug === slug) || null;
}


