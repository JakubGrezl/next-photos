"use client";

import Countdown, {
  CountdownRenderProps,
  CountdownRendererFn,
} from "react-countdown";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Divider } from "@mui/material";

export default function App() {
  const [countdown, setCountdown] = useState<string>();
  const [dokumentace, setDokumentace] = useState<string>();

  useEffect(() => {
    setCountdown("2024-06-10T08:00:00");
    setDokumentace("2024-06-07T23:59:59");
  }, []);

  const renderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return <span>Prohrali jsme</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {days > 0 && `${days} dní`}
          {days > 0 && hours > 0 && ", "}
          {hours > 0 && `${hours} hodin`}
          {(days > 0 || hours > 0) && minutes > 0 && ", "}
          {minutes > 0 && `${minutes} minut`}
          {(days > 0 || hours > 0 || minutes > 0) && seconds > 0 && " a "}
          {seconds > 0 && `${seconds} sekund`}
        </span>
      );
    }
  };

  if (countdown)
    return (
      <div className="bg-black flex flex-row relative justify-center items-center h-screen w-full lg:p-0 p-5">
        <Image
          src="/gg.png"
          layout="fill"
          alt="sad"
          className="opacity-30 h-full w-full"
        />
        <div className="text-white lg:text-lg text-sm absolute text-center">
          Obhajoby jsou za: <Countdown date={countdown} renderer={renderer} />
          <br />
          Dokumentace mají být odevzdané za:{" "}
          <Countdown date={dokumentace} renderer={renderer} />
        </div>

        <span className="text-sm text-white flex self-end">
          spokojenej tomáši??
        </span>
      </div>
    );
}
