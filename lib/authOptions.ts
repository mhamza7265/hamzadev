import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("AUTH 1: authorize started");

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log("AUTH 2: querying database");
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        console.log("AUTH 3: database query finished");

        if (!user || !user.password) {
          console.log("AUTH 4: user not found");
          return null;
        }

        console.log("AUTH 5: user found");

        console.log("AUTH 6: bcrypt started");
        const matched = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        console.log("AUTH 7: bcrypt finished");

        if (!matched) {
          console.log("AUTH 8: password mismatch");
          return null;
        }
        console.log("AUTH 9: authentication successful");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
