import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectToDatabase();
        
        // 1. Check if user exists in database
        const user = await User.findOne({ email: credentials?.email });
        
        if (user) {
          const isValid = await bcrypt.compare(credentials?.password || "", user.password);
          if (isValid) {
            return { id: user._id.toString(), name: user.name || "Admin", email: user.email };
          }
        }

        // 2. Fallback to environment variables if no user in DB or DB user check fails
        // This ensures the initial admin can still log in
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin (Env)", email: process.env.ADMIN_EMAIL };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
