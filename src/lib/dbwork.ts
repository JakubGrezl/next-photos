import { db } from "./db";

export function getAllUsers() {
    return db.user.findMany();
}