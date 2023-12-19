"use client";

import React, { useEffect } from "react";
import "@/styles/background.css";

export default function RotatingBackround() {
  useEffect(() => {
    const resizeBackground = () => {
      const bg = document.getElementById("bgimg");

      if (bg) {
        const max = Math.max(window.innerWidth, window.innerHeight);
        bg.style.width = `${2.5 * max}px`;
        bg.style.height = `${2.5 * max}px`;
        bg.style.marginTop = `${-1.25 * max}px`;
        bg.style.marginLeft = `${-1.25 * max}px`;
      }
    };

    // Spustí funkci při prvním načtení a při každé změně velikosti okna
    window.addEventListener("resize", resizeBackground);
    resizeBackground(); // Spustí také při prvním načtení

    // Odstraní event listener při odmontování komponenty
    return () => window.removeEventListener("resize", resizeBackground);
  }, []);

  return <div id="bgimg"></div>;
}
