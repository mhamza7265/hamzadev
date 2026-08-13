"use client";

import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminHeader({
  user,
  onMenuClick,
}: {
  user?: { name?: string | null };
  onMenuClick: () => void;
}) {
  const { data: session } = useSession();

  console.log("AdminHeader:session", session);
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:px-6 lg:px-8 sticky top-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white lg:hidden"
          onClick={() => onMenuClick()}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>

          <p className="hidden text-xs text-slate-500 sm:block">
            Manage your portfolio
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-white">{user?.name}</p>

          <p className="text-xs text-slate-500">Administrator</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-sm font-semibold text-white">
          {session?.user?.name?.slice(0, 1)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
