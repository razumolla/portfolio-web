import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configuration for NextAuth
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
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        session.id = token.id;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/auth/${account.provider}/callback?access_token=${account.access_token}`
          );
          const data = await response.json();

          console.log("data ****", data);

          if (data && data.user) {
            token.jwt = data.jwt;
            token.id = data.user.id; // Ensure that data.user exists
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

export { handler as GET, handler as POST }; // Handles GET and POST requests for NextAuth
