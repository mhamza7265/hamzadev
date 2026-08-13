import { z } from "zod";

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
