// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Return true to allow sign in
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/google/callback?access_token=${account.access_token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Strapi auth failed with status: ${response.status}`);
            const errorText = await response.text();
            console.error("Error response:", errorText);
            return token;
          }

          const data = await response.json();
          console.log("Strapi auth response:", data);

          if (data.jwt && data.user) {
            token.jwt = data.jwt;
            token.id = data.user.id;
            token.user = data.user;
          } else {
            console.error("User data is missing in the response:", data);
          }
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
