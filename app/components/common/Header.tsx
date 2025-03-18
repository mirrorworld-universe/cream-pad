"use client";
import { Flex } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import PrimaryButton from "./PrimaryButton";

export default function Header() {
  const { connected } = useWallet();

  return (
    <Flex className="px-[70px] py-4 text-[#121212] bg-white font-baloo2 justify-between">
      <div className="flex items-center gap-2">
        <img className="h-10" src="/images/logo-cream-pad.svg" alt="logo" />
      </div>

      <div className="h-14 px-4 rounded-full bg-[#F5F5F7] flex gap-10 items-center">
        <div className="font-bold px-6 py-2 bg-white rounded-full cursor-pointer">
          Auction
        </div>
        <div className="font-bold px-6 py-2 cursor-pointer">Doc</div>
      </div>

      <div className="w-[295px] flex items-center justify-end">
        <PrimaryButton onClick={() => {}}>Connect</PrimaryButton>
      </div>
    </Flex>
  );
}
