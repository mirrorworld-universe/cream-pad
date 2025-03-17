"use client";
import AppWalletProvider from "./AppWalletProvider";
import ChaProvider from "./ChaProvider";
import QueryProvider from "./QueryProvider";
import { CacheProvider } from "@chakra-ui/next-js";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <CacheProvider>
        <ChaProvider>
          <AppWalletProvider>{children}</AppWalletProvider>
        </ChaProvider>
      </CacheProvider>
    </QueryProvider>
  );
}
