import "@/styles/login.css";
import dynamic from "next/dynamic";

export default async function Register() {
  const RegisterForm = dynamic(() => import("@/components/register-form"), {
    ssr: false,
  });

  return (
    <main>
      <RegisterForm />
    </main>
  );
}
