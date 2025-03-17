"use client";
import { useMediaQuery } from "@chakra-ui/react";

export default function Home() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <div className="py-10 flex-col gap-2 grid w-full grid-cols-2 mx-auto"></div>
  );
}
