export const NAV_LINKS = [
  { label: "Hero", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
];

export const PROJECTS = [
  {
    title: "COGM Calculator",
    description: "Robust Service Cost Calculator for cost engineers to estimate Cost of Goods Manufactured with real-time visibility and GP% logic.",
    tech: ["Next.js 15", "React 19", "Tailwind v4", "Drizzle"],
    github: "https://github.com",
    demo: "https://cogm-calculator-dw.vercel.app/",
    image: "/projects/cogm.webp",
  },
  {
    title: "AdMind",
    description: "AI Marketing Intelligence Platform that aggregates ad data from multiple platforms, providing automated insights and a natural language chat analyst.",
    tech: ["Next.js", "Drizzle ORM", "SQLite", "OpenRouter"],
    github: "https://github.com/andredwpratama/admin-dw",
    demo: "https://admin-dw.vercel.app/",
    image: "/projects/admind.webp",
  },
  {
    title: "Warehouse Ticketing",
    description: "Professional booking and ticketing system for warehouse slot management, featuring real-time availability and automated email notifications.",
    tech: ["Next.js 16", "React 19", "Tailwind v4", "Neon DB", "Nodemailer"],
    github: "https://github.com/andredwpratama/warehouse-ticketing-dw",
    demo: "https://warehouse-ticketing-dw.vercel.app/",
    image: "/projects/warehouse.png",
  },
  {
    title: "Melon Gaming",
    description: "Official website for a game development company specializing in MelonJS and web-based games, featuring high-performance SSR and interactive components.",
    tech: ["Angular 19", "SSR", "Tailwind CSS", "Swiper.js"],
    github: "https://github.com/melonjs/melonJS",
    demo: "https://melongaming.com",
    image: "/projects/melongaming.png",
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
