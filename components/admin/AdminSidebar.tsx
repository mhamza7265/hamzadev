"use client";

import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  MessageSquare,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      <div className="fixed top-0">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">
              <span className="text-slate-300 dark:text-ink-300">{"<"}</span>
              <span className="text-slate-100">Hamza</span>
              <span className="text-brand-500">.dev</span>
              <span className="text-slate-300 dark:text-ink-300">{" />"}</span>
            </span>

            <div>
              <p className="text-sm font-semibold text-white">Portfolio</p>

              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Overview
          </p>

          <a
            href="/admin"
            className="flex items-center gap-3 rounded-lg bg-brand-500/10 px-3 py-2.5 text-sm font-medium text-brand-400 cursor-pointer"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </a>

          <a
            href="/admin/projects"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <FolderKanban className="h-5 w-5" />
            Projects
          </a>

          <a
            href="/admin/experience"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <BriefcaseBusiness className="h-5 w-5" />
            Experience
          </a>

          <a
            href="/admin/messages"
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5" />
              Messages
            </span>

            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-xs text-brand-400">
              4
            </span>
          </a>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Account
          </p>

          <a
            href="/admin/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <UserRound className="h-5 w-5" />
            Profile
          </a>

          <a
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>

        {/* Sign out */}
        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
