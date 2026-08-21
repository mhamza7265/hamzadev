"use client";

import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

const LayoutWrapper = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: { name?: string | null };
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
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
          <AdminHeader user={user} onMenuClick={handleIsSideBarOpen} />

          <AdminMain>{children}</AdminMain>
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
