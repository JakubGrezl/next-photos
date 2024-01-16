"use server";
import * as z from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { UserSchema } from "@/schema";

export const login = async (values: z.infer<typeof UserSchema>) => {
    const validatedFields = UserSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
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
    }
};