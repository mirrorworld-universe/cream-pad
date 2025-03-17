"use client";
import { Center } from "@chakra-ui/react";
import { icons } from "../components/icons";

export default function Page() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] place-content-center place-items-center gap-2 py-9 font-manrope">
      {icons.map((Icon, key) => (
        <Center
          key={key}
          className="flex-col cursor-pointer bg-bg-popup h-full w-full p-4 rounded-sm gap-2"
        >
          <Icon className="size-10 text-icon hover:text-primary transition-colors" />
          <p className="text-secondary hover:text-primary">
            {Icon.displayName}
          </p>
        </Center>
      ))}
    </div>
  );
}
