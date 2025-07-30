import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/zod/validation";
import db from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password, role } = parsed.data;

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!existingUser.length) return null;

        const user = existingUser[0];
        const validPassword = await bcrypt.compare(password, user.password); 

        if (!validPassword) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
});
export { handler as GET, handler as POST };
