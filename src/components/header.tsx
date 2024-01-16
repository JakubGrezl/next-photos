import React from "react";
import "@/styles/navbar.css";
import Link from "next/link";

const Header = async () => {
  return (
    <React.Fragment>
      <nav>
        <h1>Next Photos</h1>
        <ul>
          <Link href="/map">Map</Link>
          <Link href="/">Home</Link>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
