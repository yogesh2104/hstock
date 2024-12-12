//@ts-nocheck
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "./db";

export const { 
  handlers:{GET,POST}, 
  signIn, 
  signOut, 
  auth 
} = NextAuth({
  adapter: PrismaAdapter(db),
  secret:process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          const email = credentials.email;
          const user = await db.user.findUnique({
            where: { 
              email:email as string
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compareSync(
            credentials.password as string,
            user.password as string
          );

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            name:user.name,
            email: user.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async jwt({token,user,session}){
      if(user){
        return{
          ...token,
          id: user.id,
          name:user.name,
          email: user.email,
        }
      }
      return token
    },
    async session({ session, token, user}){
      return{
        ...session,
        user:{
          ...session.user,
          id:token.id,
          name:token.name,
          email: token.email,
        }
      }
      // return session
    }
  },
  pages:{
    signIn:"/sign-in"
  }
});