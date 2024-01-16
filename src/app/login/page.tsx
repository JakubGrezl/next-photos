import dynamic from "next/dynamic";
import "@/styles/login.css";

export default async function Login() {
  const LoginForm = dynamic(() => import("@/components/login-form"), {
    ssr: false,
  });

  return (
    <main>
      <LoginForm />
    </main>
  );
}
