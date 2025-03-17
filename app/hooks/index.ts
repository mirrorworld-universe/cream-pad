import { create } from "zustand";

export const useChains = create(() => ({
  chains: [
    {
      name: "Sonic-Testnet",
      rpc: "https://api.testnet.sonic.game"
    }
  ]
}));
