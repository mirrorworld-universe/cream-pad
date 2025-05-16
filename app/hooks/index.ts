import { create } from "zustand";

export const RPC_URL = {
  testnet: "https://api.testnet.sonic.game",
  mainnet: "https://api.mainnet-alpha.sonic.game"
};

interface RpcState {
  rpc: string;
  setRpc: (rpc: string) => void;
}

export const useRpc = create<RpcState>((set) => ({
  rpc: process.env.NEXT_PUBLIC_RPC_URL || RPC_URL.testnet,
  setRpc: (rpc: string) => set({ rpc })
}));
