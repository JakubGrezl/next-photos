import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db"
import authConfig from "@/auth.config";

// prisma auth konfigurace
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        }

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // spreduje providers z auth.config.ts
    ...authConfig,
});