export type Stat = {
  title: string;
  key: "messages" | "skills" | "projects" | "views";
  total: number;
  unread?: number;
};
