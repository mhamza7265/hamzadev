"use client";

import { Stat } from "@/types/types";
import { motion } from "framer-motion";
import { FolderKanban, Mail, Code2, Eye } from "lucide-react";

const icons = {
  projects: FolderKanban,
  messages: Mail,
  skills: Code2,
  views: Eye,
};

interface StatCardProps {
  stat: Stat;
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const Icon = icons[stat.key];
  return (
    <motion.div
      key={stat.title}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{stat.title}</p>

          <p className="mt-2 text-2xl font-bold text-white">{stat.total}</p>
        </div>

        <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {stat.key === "messages" && (
        <p className="mt-3 text-xs text-slate-500">{stat.unread} unread</p>
      )}
    </motion.div>
  );
};

export default StatCard;
