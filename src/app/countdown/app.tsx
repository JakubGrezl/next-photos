"use client";

import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function App() {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    setCountdown("2024-06-10T08:00:00");
  }, []);

  if (countdown)
    return (
      <div className="bg-black flex relative justify-center items-center h-screen w-full ">
        <Image
          src="/gg.png"
          layout="fill"
          alt="sad"
          className="opacity-30 h-screen w-full"
        />
        <span className="text-white text-lg absolute">
          Obhajoby jsou za: <Countdown date={countdown} />
        </span>
      </div>
    );
}
