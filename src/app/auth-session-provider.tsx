"use client";

import { useEffect, useState } from "react";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default async function App({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>();

  setSession(await auth());

  useEffect(() => {
    const fetchAuth = async () => {
      return await auth();
    };
    fetchAuth().then((variable) => {
      setSession(variable);
    });
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
