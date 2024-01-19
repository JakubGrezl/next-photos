"use client";

import "@/styles/form.css";
import { z } from "zod";
import { useState } from "react";
import { UserSchemaRegister } from "@/schema";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/register";
import { cn } from "@/lib/utils";

export default async function Form() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
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
    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <main>
      <div className="form-wrapper centered-from-header">
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}

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
