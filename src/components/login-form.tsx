"use client";
import "@/styles/form.css";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserSchema } from "@/schema";
import { login } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default async function Form() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      login(values);
    });
  };
  return (
    <main>
      <div className="form-wrapper centered-from-header">
        <h1>Login</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} action="submit">
          <p>Error-log:</p>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              disabled={isPending}
              // spreading => atributy se přidají do inputu
              {...form.register("email")}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              disabled={isPending}
              // spreading => atributy se přidají do inputu
              {...form.register("password")}
            />
          </div>
          <input
            type="submit"
            className="submit-button"
            value="Přihlásit"
            disabled={isPending}
          />
        </form>
      </div>
    </main>
  );
}
