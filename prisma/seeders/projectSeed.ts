import { prisma } from "@/lib/prisma";

export async function projectSeed() {
  await prisma.project.deleteMany();
  for (const project of projects) {
    await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        tagline: project.tagline,
        description: project.description,
        codePreviewName: project.codePreviewName,
        previewCode: project.previewCode,
        codeLanguage: project.codeLanguage,
        liveUrl: project.liveUrl,
        repoUrl: project.repoUrl,
        clientProject: project.clientProject,
        accent: project.accent,
        icon: project.icon,
        sortOrder: project.sortOrder,

        technologies: {
          create: project.technologies.map((name, index) => ({
            name,
            sortOrder: index,
          })),
        },

        features: {
          create: project.features.map((content, index) => ({
            content,
            sortOrder: index,
          })),
        },

        highlights: {
          create: project.highlights.map((highlight, index) => ({
            label: highlight.label,
            value: highlight.value,
            sortOrder: index,
          })),
        },
      },
    });
  }
}
const projects = [
  {
    slug: "car-rental",
    title: "Decoupled Multi-Vendor Car Rental Platform",

    tagline:
      "Multi-vendor SaaS spanning Admin, Vendor, and API apps on independent AWS EC2 instances.",

    description:
      "A commercial car rental platform built on a decoupled architecture.",

    codePreviewName: "fleet.ts",
    codeLanguage: "javascript",

    previewCode: `const fleet = await Vehicle.find({
    'status': 'available',
    'vendorId': req.vendor.id
      }).populate('location');

      // sync fleet media to aws s3
      S3Storage.uploadMedia(fleet);`,

    liveUrl: "https://thedrivehub.com/",
    repoUrl: "#",

    clientProject: true,
    accent: "from-brand-500 to-accent-400",
    icon: "car",
    sortOrder: 0,

    technologies: [
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
  },
  {
    slug: "laravel-cms-app",

    title: "Custom Laravel Business Web App & CMS",

    tagline:
      "Tailored content management system featuring dynamic theme controls built for a UK client.",

    description:
      "A bespoke business web application and custom CMS delivered for an international client in the UK. Features a dynamic global color selector that updates the public storefront styling in real time, alongside blog management, stock alert triggers, and optimized Blade templates.",
    codePreviewName: "PageController.php",

    codeLanguage: "php",

    previewCode: `$cmsData = PageContent::where(
    'slug',
    $slug
)->firstOrFail();

return response()->json($cmsData);`,

    technologies: [
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
      {
        label: "Client",
        value: "UK Based",
      },
      {
        label: "Backend",
        value: "Laravel",
      },
      {
        label: "Templating",
        value: "Blade",
      },
      {
        label: "Theme System",
        value: "Dynamic",
      },
    ],

    liveUrl: "https://www.synaptekx.com/",
    repoUrl: "#",

    clientProject: true,

    accent: "from-brand-500 to-accent-400",

    icon: "cms",

    sortOrder: 1,
  },
];
