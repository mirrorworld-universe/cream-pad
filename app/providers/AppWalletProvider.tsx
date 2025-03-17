import { useChains } from "@/app/hooks";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";
import { walletList } from "../wallet/wallet-list";

export default function AppWalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { chains } = useChains();

  const wallets = useMemo(() => {
    return [...walletList.map((wallet) => wallet.adapter)];
  }, []);

  return (
    <ConnectionProvider endpoint={chains[0]?.rpc}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
