import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "./axiosConfig";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);

        //API Fec
        try {
          const { data } = await api.post("/auth/login", credentials);
          console.log("API Response Data:", data);
          if (!data) {
            throw new Error("Invalid credentials");
          }
          return data;
        } catch (error) {
          if (error.response) {
            // Server responded with a status other than 2xx
            console.error("API Response Error Data:", error.response.data);
            console.error("API Response Status:", error.response.status);
            console.error("API Response Headers:", error.response.headers);
          } else if (error.request) {
            // No response was received from the server
            console.error("No response received:", error.request);
          } else {
            // Something else happened in setting up the request
            console.error("Error Message:", error.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...token };
        session.id = token.id;
      }
      return session;
    },
  },
});
