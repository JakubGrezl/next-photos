import React from "react";

import "@/styles/navbar.css";

// definovaní objektu Link

interface Link {
  src: string;
  title: string;
}

export default function Header() {
  const links: Array<Link> = [
    {
      src: "/login",
      title: "Login",
    },
    {
      src: "/register",
      title: "Register",
    },
  ];

  return (
    <React.Fragment>
      <nav>
        <h1>Next Photos</h1>
        <ul>
          {links.map((link) => (
            <li>
              <a href={link.src}>{link.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
}
