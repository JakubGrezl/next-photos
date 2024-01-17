import React from "react";
import "@/styles/navbar.css";
import Link from "next/link";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <React.Fragment>
      <nav>
        <h1>Next Photos</h1>
        <ul>
          {session ? (
            <>
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
              <Link href="/profile">Profile</Link>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
          <Link href="/map">Map</Link>
          <Link href="/">Home</Link>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
