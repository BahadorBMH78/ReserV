import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "custom",
      name: "Custom Provider",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        // Simulate loading state
        // You can show a loading spinner here
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const data = await response.json();
        if (data) {
          // Simulate success state
          return data;
        }
        // Simulate error state
        return null;
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async (session: any) => {
      if (!session) return;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };
