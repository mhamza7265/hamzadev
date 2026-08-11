"use client";

import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (isSidebarOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleIsSideBarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="flex min-h-screen">
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          onMenuClick={handleIsSideBarOpen}
        />

        <div className="min-w-0 flex-1">
          <AdminHeader onMenuClick={handleIsSideBarOpen} />

          <AdminMain>{children}</AdminMain>
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
