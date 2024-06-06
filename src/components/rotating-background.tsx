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

    window.addEventListener("resize", resizeBackground);
    resizeBackground();

    return () => window.removeEventListener("resize", resizeBackground);
  }, []);

  return <div id="bgimg"></div>;
}
