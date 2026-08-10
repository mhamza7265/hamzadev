import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export function getSession() {
  return getServerSession(authOptions);
}
