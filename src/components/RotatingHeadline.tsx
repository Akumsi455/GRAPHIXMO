"use client";

import { useEffect, useState } from "react";

const phrases = [
  "flyers & social media",
  "Instagram posts & stories",
  "posters & banners",
  "business cards & logos",
  "marketing ads & covers",
];

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setVisible(false);
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
      Create stunning{" "}
      <span
        className={`gradient-text inline-block transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        aria-live="polite"
      >
        {phrases[index]}
      </span>{" "}
      designs in minutes
    </h1>
  );
}
