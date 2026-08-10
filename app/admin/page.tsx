import { dashboardData } from "@/actions/dashboard";
import StatCard from "@/components/admin/home/StatCard";
import WelcomeText from "@/components/admin/home/WelcomeText";
import { getSession } from "@/lib/authSession";
import MessagesCard from "@/components/admin/home/MessagesCard";
import QuickActions from "@/components/admin/home/QuickActions";

type StatIcon = "projects" | "messages" | "skills" | "views";

type Stat = {
  title: string;
  value: string;
  description: string;
  icon: StatIcon;
};

type ActionsIcon = "add" | "view" | "edit";

type Actions = {
  label: string;
  icon: ActionsIcon;
};

const stats: Stat[] = [
  {
    title: "Projects",
    value: "8",
    description: "2 added this month",
    icon: "projects",
  },
  {
    title: "Messages",
    value: "12",
    description: "3 unread",
    icon: "messages",
  },
  {
    title: "Skills",
    value: "18",
    description: "Across 6 categories",
    icon: "skills",
  },
  {
    title: "Profile Views",
    value: "1,284",
    description: "+18% this month",
    icon: "views",
  },
];

const projects = [
  {
    name: "E-commerce Platform",
    category: "Full Stack",
    status: "Published",
    updated: "2 hours ago",
  },
  {
    name: "Real-time Chat Application",
    category: "Web Application",
    status: "Published",
    updated: "Yesterday",
  },
  {
    name: "AI Business Tool",
    category: "SaaS",
    status: "Draft",
    updated: "3 days ago",
  },
];

const quickActions: Actions[] = [
  {
    label: "Add Project",
    icon: "add",
  },
  {
    label: "View Messages",
    icon: "view",
  },
  {
    label: "Edit Profile",
    icon: "edit",
  },
];

export default async function DashboardPage() {
  const session = await getSession();
  const data = await dashboardData();
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <WelcomeText name={session?.user?.name || "Null"} />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          return <StatCard key={index} stat={stat} index={index} />;
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Messages */}
        <MessagesCard messages={data.messages.slice(0, 3)} />

        {/* Quick Actions */}
        <QuickActions quickActions={quickActions} />
      </div>

      {/* Recent Projects */}
      {/* <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="rounded-xl border border-slate-800 bg-slate-900/70"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="font-semibold text-white">Recent Projects</h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Recently added or updated projects
            </p>
          </div>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-800">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-slate-800/30 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  <FolderKanban className="h-4 w-4 text-slate-400" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {project.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {project.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {project.status === "Published" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Clock3 className="h-4 w-4 text-amber-400" />
                  )}

                  <span
                    className={`text-xs font-medium ${
                      project.status === "Published"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <span className="hidden text-xs text-slate-500 sm:block">
                  {project.updated}
                </span>

                <button
                  type="button"
                  className="cursor-pointer rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                  aria-label={`Edit ${project.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div> */}
    </div>
  );
}
