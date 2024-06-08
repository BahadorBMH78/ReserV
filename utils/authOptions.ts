import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { api } from "@/app/api/api";

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
        console.log(api + "/users/login");
        const response = await fetch(api + "users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          return null;
        }
        const data = await response.json();

        if (data) {
          console.log(data, "Response data");
          return data;
        }
        return null;
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        console.log(user, "User data");
        token.id = user.user.id;
        token.username = user.user.username;
        token.token = user.token;
        token.profilePicture = user.user.profilePicture;
        token.firstname = user.user.firstname;
        token.lastname = user.user.lastname;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        console.log(token, "Token data");
        session.user = {
          id: token.id,
          username: token.username,
          token: token.token,
          profilePicture: token.profilePicture,
          firstname: token.firstname,
          lastname: token.lastname 
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions }