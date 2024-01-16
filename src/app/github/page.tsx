"use client";

import { useRouter } from "next/navigation";

export default async function Login() {
  const router = useRouter();

  return <>{router.push("https://github.com/JakubGrezl/next-photos")}</>;
}
