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
