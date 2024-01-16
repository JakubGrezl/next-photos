import "../styles/globals.css";

import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";

import Header from "@/components/header";
import RotatingBackround from "@/components/rotating-background";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Photos",
  description: "Next Photos",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={montserrat.className}>
          <RotatingBackround />
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
