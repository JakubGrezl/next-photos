import "../styles/globals.css";

import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";

import Header from "./header";
import "../styles/background.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="background">
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
