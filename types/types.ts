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
