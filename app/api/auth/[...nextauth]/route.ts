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
        const response = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        if(!response.ok) {
          return null
        }
        const data = await response.json();

        if (data) {
          console.log(data, "datatatatatatat");
          // console.log(data, "datadatadata")
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
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.user.id;
        token.username = user.user.username;
        token.token = user.token; // Attach the JWT token to the token object
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          token: token.token,
        }; // Attach the user information to the session object
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    // error: '/error', // Custom error page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };
