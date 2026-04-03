
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import db from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { getUserById } from "./data/user";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { compareAsc, format } from "date-fns";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            createdAt?: String | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        createdAt?: Date;
    }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
   events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({token, session}) {
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.createdAt = token.createdAt ? format(token.createdAt, "yyyy-MM-dd") : null;
            }

            // if(token.role && session.user) {
            //     session.user.role = token.role as UserRole;
            // }

            return session;
        },
        async jwt({ token }) {
            if(!token.sub) return token
            
            const exitingUser = await getUserById(token.sub);

            if(!exitingUser) return token

            token.createdAt = exitingUser.createdAt;
            // token.role = exitingUser.role
            
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})