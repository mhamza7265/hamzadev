import SessionProvider from "@/providers/SessionProvider";
import { getSession } from "@/lib/authSession";
import { redirect } from "next/navigation";
import LayoutWrapper from "@/components/admin/layout/LayoutWrapper";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamza Hanif | Admin Panel",
  description:
    "Full-stack web applications, scalable APIs, and cloud deployments.",
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
