export type Stat = {
  title: string;
  key: "messages" | "skills" | "projects" | "views";
  total: number;
  unread?: number;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  codePreviewName: string | null;
  previewCode: string | null;
  codeLanguage: string | null;
  highlightedCode: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  clientProject: boolean;
  accent: string | null;
  icon: string | null;
  technologies: Technology[];
  features: Feature[];
  highlights: Highlight[];
};

export type Technology = {
  id: number;
  name: string;
  projectId: number;
  sortOrder: number;
};

export type Feature = {
  id: number;
  content: string;
  projectId: number;
  sortOrder: number;
};

export type Highlight = {
  id: number;
  label: string;
  value: string;
  projectId: number;
  sortOrder: number;
};

export type ProfileType = {
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

export type SkillCategory = "Frontend" | "Backend" | "Cloud_DevOps";

export type SkillTag = "Advanced" | "Expert" | "Proficient" | "Intermediate";

export type Skill = {
  id: number;
  name: string;
  category: SkillCategory;
  tag: SkillTag;
  icon?: React.ReactNode;
};

export type AnalyticsEvent =
  | "page_view"
  | "github_click"
  | "linkedin_click"
  | "email_click"
  | "project_demo_click"
  | "project_github_click"
  | "project_live_url_click"
  | "project_case_study_click"
  | "generate_lead";

type CountryCount = {
  country: string | null;
  count: number;
};

type DeviceCount = {
  device: string | null;
  count: number;
};

type EventCount = {
  event: string;
  count: number;
};

type ProjectClick = {
  project: string | null;
  count: number;
};

type ReferrerCount = {
  referrer: string | null;
  count: number;
};

type AnalyticsCount = {
  key: string | null;
  count: number;
};

export type AnalyticsData = {
  countries: CountryCount[];
  devices: DeviceCount[];
  eventCounts: EventCount[];
  projectClick: ProjectClick[];
  referrers: ReferrerCount[];
};
