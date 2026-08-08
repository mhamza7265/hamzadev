import Login from "@/components/Login";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Login />
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
};

export default page;
