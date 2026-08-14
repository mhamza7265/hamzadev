export type SkillCategory = "Frontend" | "Backend" | "Cloud_DevOps";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  tag: "Expert" | "Advanced" | "Proficient" | "Intermediate";
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  highlights: { label: string; value: string }[];
  liveUrl?: string;
  repoUrl?: string;
  clientProject: boolean;
  accent: string; // tailwind gradient classes
  icon: "car" | "cart" | "chat" | "cms";
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "frontend" | "gateway" | "database" | "cdn" | "storage";
}

export const profile = {
  name: "Hamza Hanif",
  firstName: "Hamza",
  title: "Full-Stack Engineer & Web Developer",
  tagline:
    "Building scalable, decoupled web applications, cloud-backed architectures, and high-performance user experiences.",
  location: "Lahore, Pakistan",
  email: "contact@hamzahanif.dev",
  github: "https://github.com/mhamza7265",
  linkedin: "https://www.linkedin.com/in/mhamza7265",
  resumeUrl: "#",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", level: 95, tag: "Expert" },
  { name: "TypeScript", category: "Frontend", level: 92, tag: "Expert" },
  { name: "Tailwind CSS", category: "Frontend", level: 94, tag: "Expert" },
  { name: "Redux Toolkit", category: "Frontend", level: 88, tag: "Advanced" },
  { name: "HTML5 / CSS3", category: "Frontend", level: 96, tag: "Expert" },
  {
    name: "RESTful API Integration",
    category: "Frontend",
    level: 90,
    tag: "Expert",
  },
  // Backend
  { name: "Node.js", category: "Backend", level: 90, tag: "Expert" },
  { name: "Express.js", category: "Backend", level: 89, tag: "Expert" },
  { name: "Laravel", category: "Backend", level: 85, tag: "Advanced" },
  { name: "REST APIs", category: "Backend", level: 92, tag: "Expert" },
  { name: "JWT Authentication", category: "Backend", level: 90, tag: "Expert" },
  {
    name: "WebSockets / Real-Time",
    category: "Backend",
    level: 82,
    tag: "Advanced",
  },
  // Cloud / DevOps
  { name: "MongoDB", category: "Cloud_DevOps", level: 90, tag: "Expert" },
  { name: "MySQL", category: "Cloud_DevOps", level: 87, tag: "Advanced" },
  {
    name: "AWS (EC2, S3)",
    category: "Cloud_DevOps",
    level: 84,
    tag: "Advanced",
  },
  { name: "Vercel", category: "Cloud_DevOps", level: 88, tag: "Expert" },
  { name: "Git / GitHub", category: "Cloud_DevOps", level: 93, tag: "Expert" },
];

export const projects: Project[] = [
  {
    id: "car-rental",
    title: "Decoupled Multi-Vendor Car Rental Platform",
    tagline:
      "Multi-vendor SaaS spanning Admin, Vendor, and API apps on independent AWS EC2 instances.",
    description:
      "A commercial car rental platform built on a decoupled architecture. Three independent applications — an admin control center, a vendor management dashboard, and a public-facing API gateway — communicate over versioned REST contracts. Each service deploys to its own AWS EC2 instance so teams can scale and ship independently.",
    stack: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS EC2",
    ],
    features: [
      "Multi-vendor architecture with isolated Admin, Vendor, and API applications",
      "JWT authentication with role-based access control across vendors",
      "Dynamic booking engine supporting real-time fleet availability and pricing",
      "Deployed across independent AWS EC2 instances for horizontal scalability",
      "Centralized state via Redux Toolkit with optimistic UI updates",
      "Versioned REST API contracts enabling independent frontend/backend releases",
    ],
    highlights: [
      { label: "Tenants", value: "3 Apps" },
      { label: "Backend", value: "Node + Express" },
      { label: "Deploy", value: "AWS EC2" },
      { label: "Auth", value: "JWT + RBAC" },
    ],
    liveUrl: "https://thedrivehub.com/",
    repoUrl: "#",
    clientProject: true,
    accent: "from-brand-500 to-accent-400",
    icon: "car",
  },
  {
    id: "laravel-cms-app",
    title: "Custom Laravel Business Web App & CMS",
    tagline:
      "Tailored content management system featuring dynamic theme controls built for a UK client.",
    description:
      "A bespoke business web application and custom CMS delivered for an international client in the UK. Features a dynamic global color selector that updates the public storefront styling in real time, alongside blog management, stock alert triggers, and optimized Blade templates.",
    stack: [
      "Laravel",
      "Blade",
      "MySQL",
      "Tailwind CSS",
      "JavaScript",
      "REST APIs",
    ],
    features: [
      "Custom Content Management System tailored to client publishing workflows",
      "Global dynamic color palette selector allowing live frontend theme customization from admin panel",
      "Integrated blog publishing platform with custom category and article controls",
      "Automated product inventory management with low-stock threshold alert triggers",
      "Server-side Blade view optimization for fast page loads and responsive design",
      "MySQL database schema optimized for content relationships and catalog operations",
    ],
    highlights: [
      { label: "Client", value: "UK Based" },
      { label: "Backend", value: "Laravel" },
      { label: "Templating", value: "Blade" },
      { label: "Theme System", value: "Dynamic" },
    ],
    liveUrl: "https://www.synaptekx.com/",
    repoUrl: "#",
    clientProject: true,
    accent: "from-brand-500 to-accent-400",
    icon: "cms",
  },
  // {
  //   id: "laravel-ecommerce",
  //   title: "Custom Laravel E-Commerce & CMS",
  //   tagline:
  //     "Tailored content management system and storefront built for an international UK client.",
  //   description:
  //     "A bespoke e-commerce platform with a custom CMS, delivered for a UK-based client. The admin dashboard controls product inventory, content pages, and orders through a fast REST API layer. Built on Laravel with a MySQL data model designed for high-volume catalog operations.",
  //   stack: ["Laravel", "MySQL", "Tailwind CSS", "REST APIs"],
  //   features: [
  //     "Custom Content Management System tailored to client editorial workflows",
  //     "Automated product inventory management with stock-threshold alerts",
  //     "Tailored admin dashboard with role-aware merchandising controls",
  //     "Fast REST API integration for catalog, cart, and checkout flows",
  //     "MySQL schema optimized for high-volume product and order data",
  //     "Responsive storefront styled with Tailwind CSS",
  //   ],
  //   highlights: [
  //     { label: "Client", value: "UK Based" },
  //     { label: "Backend", value: "Laravel" },
  //     { label: "Database", value: "MySQL" },
  //     { label: "CMS", value: "Custom" },
  //   ],
  //   liveUrl: "#",
  //   repoUrl: "#",
  //   accent: "from-amber-500 to-rose-400",
  //   icon: "cart",
  // },
  // {
  //   id: "realtime-chat",
  //   title: "Real-Time Chat & Admin Workspace",
  //   tagline:
  //     "Instant messaging with online presence, role-based admin access, and live analytics.",
  //   description:
  //     "A real-time chat workspace combining instant messaging with an admin analytics dashboard. WebSockets power live message delivery and online-presence indicators, while a role-based admin layer exposes real-time usage analytics and moderation controls.",
  //   stack: [
  //     "React",
  //     "TypeScript",
  //     "Express.js",
  //     "WebSockets",
  //     "MongoDB",
  //     "Tailwind CSS",
  //   ],
  //   features: [
  //     "Instant messaging with WebSocket-powered real-time delivery",
  //     "Online-state presence indicators across connected clients",
  //     "Role-based admin access for workspace moderation",
  //     "Real-time dashboard analytics with live usage metrics",
  //     "Typed end-to-end with TypeScript across client and server",
  //     "MongoDB change streams feeding live dashboard updates",
  //   ],
  //   highlights: [
  //     { label: "Realtime", value: "WebSockets" },
  //     { label: "Frontend", value: "React + TS" },
  //     { label: "Presence", value: "Live" },
  //     { label: "Admin", value: "RBAC" },
  //   ],
  //   liveUrl: "#",
  //   repoUrl: "#",
  //   accent: "from-emerald-500 to-cyan-400",
  //   icon: "chat",
  // },
];

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "frontend",
    title: "Frontend Application",
    subtitle: "React + Redux Toolkit",
    description:
      "The user-facing app runs as a standalone build. It consumes versioned REST contracts and owns all rendering, state, and routing — fully decoupled from the API and database tiers.",
    icon: "frontend",
  },
  {
    id: "gateway",
    title: "API Gateway",
    subtitle: "Node.js + Express.js",
    description:
      "A stateless REST API layer handles auth, business logic, and tenant routing. JWT guards every request, and the service scales horizontally behind a load balancer.",
    icon: "gateway",
  },
  {
    id: "database",
    title: "Database Tier",
    subtitle: "MongoDB",
    description:
      "MongoDB stores tenant-scoped collections with indexed queries. Connection pooling and read-aware query patterns keep latency low under load.",
    icon: "database",
  },
  {
    id: "cdn",
    title: "AWS EC2 Instances",
    subtitle: "Independent Deploy Targets",
    description:
      "Frontend, API, and database each run on dedicated EC2 instances. Independent deploy pipelines let each service ship and scale on its own cadence.",
    icon: "cdn",
  },
  {
    id: "storage",
    title: "S3 Object Storage",
    subtitle: "Media & Assets",
    description:
      "Vehicle images and uploaded media live in S3 buckets with signed URLs, keeping the API stateless and asset delivery fast and cacheable.",
    icon: "storage",
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Freelance Web Developer & Consultant",
    company: "Self-Employed",
    period: "2024 — present",
    location: "Remote",
    summary:
      "Delivered custom CMS and e-commerce solutions for global clients, spanning the MERN stack and Laravel with a focus on tailored dashboards and fast APIs.",
    bullets: [
      "Delivered custom CMS and e-commerce solutions for international clients",
      "Built tailored admin dashboards and automated inventory workflows",
      "Integrated fast REST APIs for catalog, cart, and checkout flows",
      "Consulted on architecture and deployment for MERN and Laravel projects",
    ],
    stack: ["Laravel", "MERN", "MySQL", "Tailwind CSS"],
  },
  {
    role: "Full-Stack Developer",
    company: "Codx Softwares",
    period: "2025 — 2026",
    location: "Remote",
    summary:
      "Building commercial web applications end to end — from REST API design to AWS deployment — and mentoring junior developers on frontend standards.",
    bullets: [
      "Built and shipped commercial web apps across the MERN and Laravel stacks",
      "Designed REST APIs consumed by decoupled React frontends",
      "Deployed applications on AWS EC2 with S3-backed asset storage",
      "Mentored junior developers on React, TypeScript, and frontend standards",
    ],
    stack: ["React", "Node.js", "Laravel", "AWS", "MongoDB", "MySQL"],
  },
  {
    role: "Frontend Web Developer",
    company: "4Dots Training & Advisory Ltd",
    period: "2023 — 2024",
    location: "Remote",
    summary: "Building and enhancing core in-house web products using Laravel.",
    bullets: [
      "Maintained and developed client-facing UI layouts for core company products using Laravel Blade",
      "Integrated frontend Blade templates seamlessly with backend controllers, routes, and data models",
      "Optimized UI components for cross-browser compatibility and responsive desktop/mobile views",
      "Collaborated closely with backend developers to streamline feature rollouts and UI bugs",
    ],
    stack: [
      "Laravel",
      "Blade",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "MySQL",
    ],
  },
];

export const sidebarOverviewMenu = [
  { href: "/admin", title: "Dashboard", icon: "dashboard" },
  { href: "/admin/projects", title: "Projects", icon: "project" },
  { href: "/admin/experience", title: "Experience", icon: "experience" },
  { href: "/admin/skills", title: "Skills", icon: "skill" },
] as const;

export const sidebarAccountMenu = [
  { href: "/admin/profile", title: "Profile", icon: "profile" },
  { href: "/admin/settings", title: "Settings", icon: "setting" },
] as const;
