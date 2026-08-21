import SessionProvider from "@/providers/SessionProvider";
import { getSession } from "@/lib/authSession";
import { redirect } from "next/navigation";
import LayoutWrapper from "@/components/admin/layout/LayoutWrapper";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import { getSettings } from "@/actions/settings";

const settings = await getSettings();

export const metadata: Metadata = {
  title: {
    default: settings.data?.adminTitle || "Admin Dashboard | Hamza Hanif",
    template: `%s | ${settings.data?.adminTitle || "Admin Dashboard"}`,
  },

  description: settings.data?.adminDescription || "Manage your portfolio.",

  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <LayoutWrapper user={session.user}>{children}</LayoutWrapper>
      </div>
      <ToastContainer position="bottom-right" theme="light" autoClose={3000} />
    </SessionProvider>
  );
}
