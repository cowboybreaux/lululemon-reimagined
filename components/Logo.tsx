import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "badge" | "mark";
}

export default function Logo({
  className = "h-10 w-auto",
}: LogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      aria-label="lululemon logo"
    >
      <Image
        src="/images/lululogo.png"
        alt="lululemon"
        width={500}
        height={500}
        priority
        className="w-full h-full object-contain"
      />
    </div>
  );
}