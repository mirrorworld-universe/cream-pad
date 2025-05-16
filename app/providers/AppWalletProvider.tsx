import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";
import { walletList } from "../wallet/wallet-list";
import { useRpc } from "../hooks";

export default function AppWalletProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { rpc } = useRpc();

  const wallets = useMemo(() => {
    return [...walletList.map((wallet) => wallet.adapter)];
  }, []);

  return (
    <ConnectionProvider endpoint={rpc}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
