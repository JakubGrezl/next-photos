import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email({ message: "Zadej email!" }),
  password: z.string().min(4, { message: "Zadej heslo!" }),
});

export const UserSchemaRegister = UserSchema.extend({
  name: z.string().min(1, { message: "Zadej jméno!" }),
  email: z.string().email({ message: "Zadej email!" }),
  password: z.string().min(1, { message: "Zadej heslo!" }),
  repeatPassword: z.string(),
});

export const FileUpload = z.object({
  title: z.string().optional(),
  file: z.any(),
});

export const PPSchema = z.object({
  file: z.any(),
});

export const Comment = z.object({
  text: z.string().min(4, { message: "Zadej text!" }),
});

export const MetadataChange = z.object({
  title: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  camera: z.string().optional(),
  lens: z.string().optional(),
  editedIn: z.string().optional(),
  createdAt: z.date().optional(),
  exposure: z.number().optional(),
  iso: z.number().optional(),
  aperture: z.number().optional(),
  focalLength: z.number().optional(),
  flash: z.string().optional(),
  whiteBalance: z.string().optional(),
  date: z.date().optional(),
});
