/* eslint-disable @typescript-eslint/no-explicit-any */
import { NightlyWalletAdapter } from "@solana/wallet-adapter-wallets";
import { BackpackWalletAdapter } from "./backpack-adapter";
import { OKXWalletAdapter } from "./okx-adapter";

export const walletList = [
  {
    id: "okx",
    name: "OKX Wallet",
    adapter: new OKXWalletAdapter()
  },
  {
    id: "backpack",
    name: "Backpack",
    adapter: new BackpackWalletAdapter()
  },
  {
    id: "nightly",
    name: "Nightly",
    adapter: new NightlyWalletAdapter()
  }
];
