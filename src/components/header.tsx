import React from "react";
import Link from "next/link";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-black text-2xl">
          Next Photos
        </Link>
        <ul className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
          {session ? (
            <>
              <li>
                <Link href="/api/auth/signout?callbackUrl=/" passHref>
                  <p className="text-black hover:underline">Logout</p>
                </Link>
              </li>
              <li>
                <Link href="/profile" passHref>
                  <p className="text-black hover:underline">Profile</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" passHref>
                  <p className="text-black hover:underline">Login</p>
                </Link>
              </li>
              <li>
                <Link href="/register" passHref>
                  <p className="text-black hover:underline">Register</p>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/map" passHref>
              <p className="text-black hover:underline">Map</p>
            </Link>
          </li>
          <li>
            <Link href="/tutorial" passHref>
              <p className="text-black hover:underline">Tutorial</p>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <p className="text-black hover:underline">Home</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
