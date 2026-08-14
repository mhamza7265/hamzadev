# Personal Portfolio

A full-stack personal portfolio built with **Next.js, TypeScript, Prisma, and PostgreSQL**. The project includes a public portfolio website and an admin dashboard for managing portfolio content.

## Features

- Responsive portfolio website
- Hero, About, Skills, Projects, and Contact sections
- Contact form with email notifications
- Admin authentication
- Admin dashboard
- Skills management (create, edit, delete)
- Server-side data validation
- Responsive dark-themed dashboard
- PostgreSQL database with Prisma ORM
- Server-side rendering and data fetching
- Server-side data revalidation

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Toastify

### Backend

- Next.js Server Actions
- Next.js Route Handlers
- Prisma
- PostgreSQL
- Zod
- Resend

### Authentication

- NextAuth.js

### Deployment

- Vercel
- Neon PostgreSQL

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

Install dependencies:

```bash
npm install
```

Create your local environment file from the provided example:

```bash
cp .env.example .env
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Run the database seed:

```bash
npx prisma db seed
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```bash
http://localhost:3000
```

### Project Status

The portfolio website is actively being developed. The public-facing website is being built alongside an admin dashboard for managing portfolio content.

The admin dashboard currently includes authentication and skills management, with additional content management features still in development.

### Author

## Hamza Hanif

Full Stack Web Developer

- GitHub: [Hamza Hanif](https://github.com/mhamza7265)
- LinkedIn: [Hamza Hanif](https://www.linkedin.com/in/mhamza7265/)
