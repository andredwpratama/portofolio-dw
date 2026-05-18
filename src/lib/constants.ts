export const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const PROJECTS = [
  {
    title: "AdMind",
    description:
      "AI Marketing Intelligence Platform that aggregates ad data from multiple platforms, providing automated insights and a natural language chat analyst.",
    tech: ["Next.js", "Drizzle ORM", "SQLite", "OpenRouter"],
    github: "https://github.com/andredwpratama/admin-dw",
    demo: "https://admin-dw.vercel.app/",
    image: "/projects/admind.png",
    color: "bg-secondary-fixed",
  },
  {
    title: "Melon Gaming",
    description:
      "Official website for a game development company specializing in MelonJS and web-based games, featuring high-performance SSR and interactive components.",
    tech: ["Angular 19", "SSR", "Tailwind CSS", "Swiper.js"],
    github: "https://github.com/melonjs/melonJS",
    demo: "https://melongaming.com",
    image: "/projects/melongaming.png",
    color: "bg-surface-container-highest",
  },
  {
    title: "COGS Calculator",
    description:
      "Robust Service Cost Calculator for cost engineers to estimate Cost of Goods Manufactured with real-time visibility and GP% logic.",
    tech: ["Next.js 15", "React 19", "Tailwind v4", "Drizzle"],
    github: "https://github.com/andredwpratama/cogs-calculator-dw",
    demo: "https://cogs-calculator-dw.vercel.app/",
    image: "/projects/cogm.png",
    color: "bg-tertiary-fixed",
  },
  {
    title: "Warehouse Ticketing",
    description:
      "Professional booking and ticketing system for warehouse slot management, featuring real-time availability and automated email notifications.",
    tech: ["Next.js 16", "React 19", "Tailwind v4", "Neon DB", "Nodemailer"],
    github: "https://github.com/andredwpratama/warehouse-ticketing-dw",
    demo: "https://warehouse-ticketing-dw.vercel.app/",
    image: "/projects/warehouse.png",
    color: "bg-primary-container",
  },
];

export const TECH_STACK = {
  frontend: [
    { name: "JavaScript", proficiency: 92 },
    { name: "React", proficiency: 60 },
    { name: "Next.js", proficiency: 70 },
    { name: "Tailwind CSS", proficiency: 88 },
    { name: "TypeScript", proficiency: 88 },
    { name: "Angular", proficiency: 85 },
    { name: "GSAP (Animations)", proficiency: 68 },
  ],
  backend: [
    { name: "Node.js", proficiency: 80 },
    { name: "Express.js", proficiency: 78 },
    { name: "REST API Design", proficiency: 88 },
    { name: "JWT Authentication", proficiency: 85 },
    { name: "Drizzle ORM", proficiency: 75 },
    { name: "PostgreSQL", proficiency: 70 },
  ],
  database: [
    { name: "SQLite", proficiency: 65 },
    { name: "MySQL", proficiency: 82 },
    { name: "Neon / Postgres", proficiency: 60 },
    { name: "Redis", proficiency: 70 },
  ],
  ai: [
    { name: "OpenRouter", proficiency: 65 },
    { name: "Prompt AI", proficiency: 85 },
    { name: "AI Agent Development", proficiency: 75 },
  ],
  tools: [
    { name: "Git & GitHub", proficiency: 80 },
    { name: "AWS S3", proficiency: 72 },
    { name: "Cloudflare R2", proficiency: 76 },
  ],
};

export const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Enviromate Technology International",
    period: "Oct 2025 - PRESENT",
    description: [
      "Developed and shipped fullstack features (Angular + Node.js/Express) in production, improving user flow efficiency by ±30% and reducing drop-off across key flows.",
      "Integrated Midtrans Payment Gateway for membership system — including webhook handling and automated notifications — achieving ±95% transaction success rate.",
      "Optimized REST APIs, database queries (MySQL/Sequelize), and frontend rendering, reducing error rate to <2% and improving average response time by ±40%.",
      "Maintained Redis caching and BullMQ queue system, achieving <1% downtime during high-traffic periods.",
      "Built an AI agent powered by generative AI for an in-website code editor, reducing manual coding assistance time by ±50%.",
      "Built automation testing (unit to E2E) using Playwright, achieving ±80% test coverage and reducing regression bugs in production by ±35%.",
    ],
    tech: ["Angular", "Node.js", "Express", "MySQL", "Sequelize", "Redis", "BullMQ", "Playwright"],
    cardColor: "bg-surface-container-lowest",
    nodeColor: "bg-primary-container",
  },
  {
    role: "Business Mapping & Improvement Intern",
    company: "PT Triatra Sinergia Pratama",
    period: "Sep 2024 - Mar 2025",
    description: [
      "Mapped Service Job Order & Switching flows, identifying 3 process inefficiencies.",
      "Created 2 improvement stories using Six Sigma & Design Thinking methodologies.",
      "Supported service innovation initiatives, contributing to +15% market visibility improvement.",
      "Built a working prototype of the improvement solution using Next.js, Node.js, and Neon database.",
    ],
    tech: ["Six Sigma", "Design Thinking", "Process Mapping", "Next.js", "Node.js", "Neon"],
    cardColor: "bg-primary-container",
    nodeColor: "bg-secondary",
  },
  {
    role: "Data Analyst Intern",
    company: "KPU Bea dan Cukai Tipe A Tanjung Priok",
    period: "Jul 2024 - Aug 2024",
    description: [
      "Analyzed and visualized financial data, improving reporting efficiency by 20%.",
      "Resolved data quality issues, raising data accuracy and integrity by 15%.",
      "Built dashboards and applied data cleaning techniques to enhance decision-making insights.",
    ],
    tech: ["Data Analysis", "Dashboard", "Data Visualization"],
    cardColor: "bg-surface-container-lowest",
    nodeColor: "bg-tertiary-container",
  },
];

export const BIO = {
  intro:
    "I am a fullstack engineer who treats code like raw material. I don't just build apps; I construct robust digital machinery. Obsessed with performance, clean architecture, and brutal honesty in design.",
  funFact:
    "When I'm not untangling spaghetti code, I'm probably breaking production on a side project or drinking dangerous amounts of cold brew.",
  facts: {
    coffee_cups_per_day: 4,
    preferred_os: "Windows",
    tabs_open_currently: 142,
    superpower: "Reading docs",
    kryptonite: "IE11",
    hobbies: ["Mechanical Keyboards", "Over-engineering", "Gaming"],
  },
};

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/andredwpratama",
    icon: "code",
    description: "Review my raw commits and open source chaos.",
    color: "bg-primary-container",
    hoverColor: "hover:bg-primary-fixed",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/andredwpratama",
    icon: "work",
    description: "The professional facade.",
    color: "bg-tertiary-container",
    hoverColor: "hover:bg-tertiary-fixed",
  },
];
