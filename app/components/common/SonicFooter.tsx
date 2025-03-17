"use client";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import clsx from "clsx";
import SiteLogo from "./SiteLogo";
import JumpIcon from "../icons/JumpIcon";

export default function SonicFooter({ className, ...props }: FlexProps) {
  const data = [
    {
      text: "Official Website",
      url: "https://www.sonic.game"
    },
    {
      text: "Discord",
      url: "https://discord.com/invite/joinmirrorworld"
    },
    {
      text: "Twitter",
      url: "https://x.com/SonicSVM"
    },
    {
      text: "Explorer",
      url: "https://explorer.sonic.game"
    }
  ];
  return (
    <Flex
      {...props}
      className={clsx(
        "mx-auto flex-col px-4 gap-8 pb-6 w-full mt-20 max-w-view shrink-0",
        className
      )}
    >
      <Box className="flex gap-10 w-full flex-col md:flex-row items-start md:items-center justify-between">
        <SiteLogo site="Bridge" />
        <Flex
          className={clsx(
            "text-primary w-full flex-col gap-4 sonic-title3",
            "md:text-tertary md:flex-row md:gap-10 md:justify-end"
          )}
        >
          {data.map((item) => (
            <Flex key={item.text} className="justify-between cursor-pointer">
              <Text className="hover:text-primary transition-colors">
                {item.text}
              </Text>
              <Box className="md:hidden">
                <JumpIcon className="opacity-30" />
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
      <div className="border-line border-b h-px" />
      <Flex className="items-center gap-4 text-tertary font-manrope flex-wrap">
        <p className="w-full md:w-fit">© Copyright 2024 Sonic</p>
        <div className="h-2.5 w-px bg-line hidden md:block" />
        <p
          onClick={() =>
            window.open(
              "https://docs.google.com/document/d/1kGnKan6PDHA5mzVlUOqx2skCoSpjtwnTGZiTKc0jtaU/pub",
              "_blank"
            )
          }
          className="cursor-pointer hover:text-primary transition-colors"
        >
          Term of Use
        </p>
        <div className="h-2.5 w-px bg-line" />
        <p
          onClick={() =>
            window.open(
              "https://docs.google.com/document/d/e/2PACX-1vRbCG8os3oojtNwDbVVwnif_DILgjTnYY_807b8JcWUxG606n6yMuxZsPfmlABqUQf6taJBgDb3p25N/pub",
              "_blank"
            )
          }
          className="cursor-pointer hover:text-primary transition-colors"
        >
          Privacy Policy
        </p>
      </Flex>
    </Flex>
  );
}
