"use client";
import { theme } from "@/app/theme";
import { ChakraProvider } from "@chakra-ui/react";

export default function ChaProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
