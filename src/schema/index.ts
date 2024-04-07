import { z } from "zod";
const MAX_FILE_SIZE : number = 100;
const ACCEPTED_IMAGE_TYPES : string[] = ["image/jpeg", "image/jpg", "image/png"];

export const UserSchema = z.object({
    email: z.string().email({ message: "Zadej email!" }),
    password: z.string().min(4, { message: "Zadej heslo!" }),
});

export const UserSchemaRegister = UserSchema.extend({
    name: z.string().min(1, { message: "Zadej jméno!" }),
    email: z.string().email({ message: "Zadej email!" }),
    password: z.string().min(1, { message: "Zadej heslo!" }),
    repeatPassword: z.string()
})

export const FileUpload = z.object({
    title: z.string().optional(),
    file: z.any()
})