"use server";
import * as z from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { UserSchema } from "@/schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof UserSchema>) => {
    // validace loginu pres user schema
    const validatedFields = UserSchema.safeParse(values);

    if (!validatedFields.success) {
        console.log(validatedFields.error)
    } else {
        const { email, password } = validatedFields.data;

        try {
            // vola authorization v auth.config.ts
            await signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "Invalid credentials!" };
                    default:
                        return { error: "Something went wrong!" };
                }
            }
            throw error;
        };
    }
};