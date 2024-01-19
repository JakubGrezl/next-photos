"use client";

import "@/styles/form.css";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { UserSchema } from "@/schema";
import { login } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <div className="form-wrapper centered-from-header">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} action="submit">
        <div className={cn({ "input-wrapper": true, disabled: isPending })}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            disabled={isPending}
            // spreading => atributy se přidají do input
            {...form.register("email")}
          />
        </div>
        <div className={cn({ "input-wrapper": true, disabled: isPending })}>
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
  );
};

export default Form;
