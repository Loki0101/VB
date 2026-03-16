import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("NextAuth Route Handler initialized");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        process.stdout.write("Authorize attempt with password: " + credentials?.password + "\n");
        if (credentials?.password === "visionaryburma2026") {
          process.stdout.write("Auth success\n");
          return {
            id: "admin",
            email: "admin@visionaryburma.com",
            name: "Administrator",
          };
        }
        process.stdout.write("Auth failed\n");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
