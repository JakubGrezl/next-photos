// prisma jedinacek

import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// globalThis.prisma = najde, jestli existuje v globalnich promennych prisma client instanci, pokud ne vytvori novou instanci
export const db = globalThis.prisma || new PrismaClient();

// preventuje opakovanemu tvoreni jedinacka
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;