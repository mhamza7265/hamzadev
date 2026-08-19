import Login from "@/components/auth/Login";
import { getSession } from "@/lib/authSession";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Login />
    </div>
  );
};

export default page;
