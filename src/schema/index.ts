import { z } from "zod";
const MAX_FILE_SIZE : number = 100;
const ACCEPTED_IMAGE_TYPES : string[] = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function checkFileType(file: File) { // file type checking
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (ACCEPTED_IMAGE_TYPES.includes(fileType!)) return true; 
    }
    return false;
}



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
        // .refine((file) => file?.size < MAX_FILE_SIZE, "Max size is 3MB.") // file size validation
        // .refine((file) => checkFileType(file), "Only .jpg, .gif, .png formats are supported."),
})