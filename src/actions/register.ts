"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { UserSchemaRegister } from "@/schema";
import { db } from "@/lib/db";
import { userByName } from "@/data/user";

export const register = async (values: z.infer<typeof UserSchemaRegister>) => {
    // validuje se formular, predany v values, pomoci schematu v UserSchemaRegister
    const validatedFields = UserSchemaRegister.safeParse(values);

    // poresit validaci 

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, password, email } = values;

    // kontrola, jestli existuje uz user
    db.user.findUnique({
        where: {
            email: email,
        },
    })

    // hashovani pres bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await userByName(name);

    if (existingUser) {
        return { error: "Jméno už někdo používá!" };
    } else {
        await db.user.create({
            data: {
                password: hashedPassword,
                name,
                email,
            },
        });
    }

    return { success: "User created!" };
};