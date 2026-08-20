import { z } from "zod";

export const SkillDialogSchema = z.object({
  name: z.string().nonempty("Skill name is required"),
  category: z.string().nonempty("Skill category is required"),
  tag: z.string().nonempty("Skill tag is required"),
});

export const SkillDialogServerSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required"),
  category: z.enum(["Frontend", "Backend", "Cloud_DevOps"]),
  tag: z.enum(["Advanced", "Expert", "Proficient", "Intermediate"]),
});

export const ProfileSchema = z.object({
  name: z.string().nonempty("Name is required"),
  firstName: z.string().nonempty("First name is required"),
  professionalTitle: z.string().nonempty("Title is required"),
  tagline: z.string().nonempty("Tagline is required"),
  location: z.string().nonempty("Location is required"),
  email: z.string().nonempty("Email is required"),
  github: z.string().nonempty("GitHub link is required"),
  linkedin: z.string().nonempty("LinkedIn link is required"),
  resumeLink: z.string().nonempty("Resume link is required"),
});

export const contactFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(5, "Message is required"),
});

export const analyticsSchema = z.object({
  eventId: z.uuid(),

  event: z.enum([
    "page_view",
    "github_click",
    "linkedin_click",
    "email_click",
    "project_demo_click",
    "project_github_click",
    "generate_lead",
  ]),

  path: z.string().max(500).optional(),
  referrer: z.string().max(2000).optional(),
  title: z.string().max(500).optional(),

  projectId: z.string().max(100).optional(),

  metadata: z.record(z.string(), z.json()).optional(),
});

export const loginSchema = z.object({
  email: z.email().nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPwSchema = z.object({
  email: z.email().nonempty("Email is required"),
});

export const verifyTokenSchema = z.object({
  token: z.string().regex(/^[0-9a-fA-F]{64}$/, {
    message: "Must be a valid 64-character crypto hex token",
  }),
});

export const resetTokenSchema = z.object({
  token: z.string().regex(/^[0-9a-fA-F]{64}$/, {
    message: "Must be a valid 64-character crypto hex token",
  }),
});

export const resetPwSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Sets the error specifically to the confirmPassword field
  });

export const resetPwServerSchema = z.object({
  token: z.string().regex(/^[0-9a-fA-F]{64}$/, {
    message: "Must be a valid 64-character crypto hex token",
  }),
  password: z.string().min(1, "Password is required"),
});
