"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Plus, Mail, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";

const icons = { add: Plus, view: Mail, edit: Pencil };

type IconName = keyof typeof icons;

type Action = {
  label: string;
  icon: IconName;
};

interface QuickActionsProps {
  quickActions: Action[];
}

const QuickActions = ({ quickActions }: QuickActionsProps) => {
  const router = useRouter();
  const { start } = useProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className="rounded-xl border border-slate-800 bg-slate-900/70"
    >
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="font-semibold text-white">Quick Actions</h2>

        <p className="mt-0.5 text-xs text-slate-500">Commonly used actions</p>
      </div>

      <div className="space-y-2 p-4">
        {quickActions.map((action) => {
          const Icon = icons[action.icon];

          return (
            <button
              key={action.label}
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800/50 hover:text-white"
              onClick={() => {
                if (action.label === "Edit Profile") {
                  router.push("/admin/profile");
                  start();
                }
                if (action.label === "View Messages") {
                  router.push("/admin/messages");
                  start();
                }
              }}
            >
              <Icon className="h-4 w-4 text-blue-400" />

              <span>{action.label}</span>

              <ArrowRight className="ml-auto h-4 w-4 text-slate-600" />
            </button>
          );
        })}
      </div>

      {/* Portfolio status */}
      {/* <div className="mx-4 mb-4 rounded-lg border border-slate-800 bg-slate-950/40 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-sm font-medium text-white">
                Portfolio Live
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">Last updated today</p>

            <button
              type="button"
              className="mt-3 flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              View portfolio
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div> */}
    </motion.div>
  );
};

export default QuickActions;
