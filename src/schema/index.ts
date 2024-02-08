import { any, z } from "zod";
const MAX_FILE_SIZE = 100000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
    title: z.string().max(255).min(1),
    file: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
    buffer: z.any()
});


// nevim proc ale zod validace neumozni ani poslat ten formular, kdyz ty veci nejsou potvrzeny