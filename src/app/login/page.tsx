"use client";

import dynamic from "next/dynamic";
import "@/styles/login.css";

export default function Login() {
  const LoginForm = dynamic(() => import("@/components/login-form"), {
    ssr: false,
  });

  return (
    <main>
      <LoginForm />
    </main>
  );
}
