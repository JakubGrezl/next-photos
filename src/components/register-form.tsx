"use client";

import "@/styles/form.css";
import { z } from "zod";
import { useState } from "react";
import { UserSchemaRegister } from "@/schema";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/register";
import { cn } from "@/lib/utils";

export default function Form() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof UserSchemaRegister>>({
    resolver: zodResolver(UserSchemaRegister),
    defaultValues: {
      password: "",
      repeatPassword: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchemaRegister>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success + ", please wait for redirect");
          setTimeout(() => {
            router.push("/profile");
          }, 3000);
        }
      });
    });
  };

  return (
    <main>
      <div className="form-wrapper absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1>Register</h1>
        {error && <p className="error form-annoucment">{error}</p>}
        {success && <p className="success form-annoucment">{success}</p>}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={cn({ "input-wrapper": true, disabled: isPending })}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              disabled={isPending}
              {...form.register("name")}
            />
          </div>
          <div className={cn({ "input-wrapper": true, disabled: isPending })}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              disabled={isPending}
              {...form.register("email")}
            />
          </div>
          <div className={cn({ "input-wrapper": true, disabled: isPending })}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              disabled={isPending}
              {...form.register("password")}
            />
          </div>
          <div className={cn({ "input-wrapper": true, disabled: isPending })}>
            <label htmlFor="repeat-password">Repeat Password</label>
            <input
              type="password"
              id="repeat-password"
              disabled={isPending}
              {...form.register("repeatPassword")}
            />
          </div>

          <input
            type="submit"
            className="submit-button"
            disabled={isPending}
            value="Registrovat"
          />
        </form>
      </div>
    </main>
  );
}
