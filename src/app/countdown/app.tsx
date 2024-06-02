"use client";

import Countdown, {
  CountdownRenderProps,
  CountdownRendererFn,
} from "react-countdown";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function App() {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    setCountdown("2024-06-10T08:00:00");
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
      <div className="bg-black flex flex-row relative justify-center items-center h-screen w-full lg:m-0 m-5">
        <Image
          src="/gg.png"
          layout="fill"
          alt="sad"
          className="opacity-30 h-full w-full"
        />
        <span className="text-white lg:text-lg text-sm absolute">
          Obhajoby jsou za: <Countdown date={countdown} renderer={renderer} />
        </span>

        <span className="text-sm text-white flex self-end">
          spokojenej tomáši??
        </span>
      </div>
    );
}
