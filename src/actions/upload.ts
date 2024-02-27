"use server";

import path from 'path';
import { db } from "@/lib/db";
import fs from 'fs'
import { currentUser } from "@/lib/auth"

export const upload = async (values: { title: string, buffer: Uint8Array, type: string }) => {
    const { title, type } = values;
    const user = await currentUser();

    const userID = user?.id

    if (!userID) {
        throw new Error("User not found");
    }

    if (!title) {
        throw new Error("Title is required");
    }

    // Create a directory for the user if it doesn't exist
    const uploadDir = 'public/uploads/';
    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    } catch (error) {
        throw new Error("Failed to create uploads directory");
    }


    // Create a directory for the user if it doesn't exist
    const userDir = path.join(uploadDir, userID.toString());
    try {
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
    } catch (error) {
        throw new Error("Failed to create user directory");
    }

    // Initially create the photo record without the file path
    let photo;
    try {
        photo = await db.photo.create({
            data: {
                title: title,
                userId: userID, // Assuming there's a relation to a user
                path: "", // Temporarily empty
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }

    const extension = type.split('/')[1];
    const filename = `${photo.id}.${extension}`; // Use the generated ID as the file name
    const filepath = path.join(userID.toString(), filename);

    // Update the record with the file path
    try {
        await db.photo.update({
            where: { id: photo.id },
            data: { path: filepath }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }

    // Save the file with the new filename
    try {
        const buffer = Buffer.from(values.buffer);
        fs.writeFileSync(path.join('public/uploads/', filepath), buffer);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
