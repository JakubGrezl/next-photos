import { z } from "zod";

export const UserSchema = z.object({
    email: z.string().email({ message: "Zadej email!" }),
    password: z.string().min(1, { message: "Zadej heslo!" }),
});

export const UserSchemaRegister = UserSchema.extend({
    name: z.string().min(1, { message: "Zadej jméno!" }),
    email: z.string().email({ message: "Zadej email!" }),
    password: z.string().min(1, { message: "Zadej heslo!" }),
    repeatPassword: z.string().min(1, { message: "Zadej heslo!" }),
});