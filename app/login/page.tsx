import Login from "@/components/Login";
import { getSession } from "@/lib/authSession";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  console.log("page:session", session);
  if (session) {
    redirect("/admin");
  }
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Login />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
};

export default page;
