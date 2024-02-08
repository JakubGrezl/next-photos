"use server";

import path from 'path';
import { db } from "@/lib/db";
import { currentUser, getUserID } from "@/lib/auth";
import fs from 'fs'

export const upload = async (values: { title: string, buffer: Uint8Array, type: string }) => {

    const { title, type } = values;
    const userID = await getUserID();

    if (!userID) {
        throw new Error("User not found");
    }

    if (!title) {
        throw new Error("Title is required");
    }

    // Create a directory for the user if it doesn't exist
    const userDir = path.join('public/uploads/', userID.toString());
    try {
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
    } catch (error) {
        throw new Error("Failed to create user directory");
    }

    const extension = type.split('/')[1];
    const filepath = path.join(`${userID.toString()}/${title}.${extension}`);

    // Save the file
    try {
        await db.photo.create({
            data: {
                title: title,
                path: filepath
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }

    try {
        const buffer = Buffer.from(values.buffer);
        fs.writeFileSync('public/uploads/' + filepath, buffer);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
