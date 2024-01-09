import React from "react";
import "@/styles/navbar.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Header = async () => {
  const session = await getServerSession(options);
  return (
    <React.Fragment>
      <nav>
        <h1>Next Photos</h1>
        <ul>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
