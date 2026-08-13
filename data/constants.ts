import { Path } from "react-hook-form";

export type ProfileFormData = {
  name: string;
  firstName: string;
  professionalTitle: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeLink: string;
};

interface FormField {
  name: Path<ProfileFormData>; // 👈 Strictly typed to your form keys
  label: string;
  placeholder: string;
}

export const profilePersonalInfoFields: FormField[] = [
  { label: "Name", name: "name", placeholder: "Hamza Hanif" },
  { label: "First Name", name: "firstName", placeholder: "Hamza" },
  {
    label: "Professional Title",
    name: "professionalTitle",
    placeholder: "Full Stack Web Developer",
  },
  {
    label: "Tagline",
    name: "tagline",
    placeholder: "Building modern, scalable web applications.",
  },
  { label: "Location", name: "location", placeholder: "Lahore, Pakistan" },
  { label: "Email", name: "email", placeholder: "contact@hamzahanif.com" },
];

export const profileSocialFields: FormField[] = [
  {
    label: "GitHub",
    name: "github",
    placeholder: "https://github.com/username",
  },
  {
    label: "LinkedIn",
    name: "linkedin",
    placeholder: "https://linkedin.com/in/username",
  },
  {
    label: "Resume Link",
    name: "resumeLink",
    placeholder: "https://example.com/resume.pdf",
  },
];
