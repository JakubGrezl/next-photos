"use client";

import dynamic from "next/dynamic";

export default function Login() {
  const LoginForm = dynamic(() => import("@/components/login-form"), {
    ssr: false,
  });

  return (
    <main className="h-screen">
      <LoginForm />
    </main>
  );
}
