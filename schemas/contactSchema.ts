import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(5, "Message is required"),
});
