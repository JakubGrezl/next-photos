"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { UserSchemaRegister } from "@/schema";
import { db } from "@/lib/db";
import { userByName } from "@/data/user";
import { userByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof UserSchemaRegister>) => {
    const validatedFields = UserSchemaRegister.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    } else {
        const { name, password, email, repeatPassword } = values;
        const existingEmail = await userByEmail(email);
        if (existingEmail) {
            return { error: "Email is already used!" };
        } else {
            const existingName = await userByName(name);
            if (existingName) {
                return { error: "Username is being used!!" };
            } else {
                if (password != repeatPassword) {
                    return { error: "Passwords must match!" };
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    try {
                        await db.user.create({
                            data: {
                                password: hashedPassword,
                                name,
                                email,
                            },
                        });
                        return { success: "Register successfully" };
                    } catch (error) {
                        return { error: "Something happend" };
                    }
                }

            }
        }
    }
};