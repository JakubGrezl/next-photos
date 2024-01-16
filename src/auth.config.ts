import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { UserSchema } from "@/schema";
import { userByEmail } from "@/data/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = await UserSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await userByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;