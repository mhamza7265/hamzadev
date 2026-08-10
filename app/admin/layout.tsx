import AdminHeader from "@/components/admin/AdminHeader";
import AdminMain from "@/components/admin/AdminMain";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SessionProvider from "@/providers/SessionProvider";
import { getSession } from "@/lib/authSession";
import { redirect } from "next/navigation";

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
        <div className="flex min-h-screen">
          <AdminSidebar />

          <div className="min-w-0 flex-1">
            <AdminHeader />

            <AdminMain>{children}</AdminMain>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
