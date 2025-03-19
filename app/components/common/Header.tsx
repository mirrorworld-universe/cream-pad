"use client";
import { Flex } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import PrimaryButton from "./PrimaryButton";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { formatStr } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Header() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  return (
    <Flex className="px-[70px] py-4 text-[#121212] bg-white font-baloo2 justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img
          onClick={() => router.push("/")}
          className="h-10 cursor-pointer"
          src="/images/logo-cream-pad.svg"
          alt="logo"
        />
      </div>

      <div className="h-14 px-4 rounded-full bg-[#F5F5F7] flex gap-10 items-center">
        <Link
          href={"/auction"}
          className="font-bold px-6 py-2 bg-white rounded-full cursor-pointer"
        >
          Auction
        </Link>
        <div
          onClick={() =>
            window.open(
              "https://github.com/jackPanyj/oos/blob/main/uPic/CreamPad_Whitepaper.pdf",
              "_blank"
            )
          }
          className="font-bold px-6 py-2 cursor-pointer"
        >
          Doc
        </div>
      </div>

      <div className="w-[295px] flex items-center justify-end">
        {!connected ? (
          <PrimaryButton
            className="text-xl"
            onClick={() => openModalDirectly(MODAL_HASH_MAP.walletConnect)}
          >
            Connect
          </PrimaryButton>
        ) : (
          <div className="flex items-center gap-2">
            <div className="p-3 bg-[#F6F6F3] rounded-full">
              <img
                className="size-8"
                src="/images/sonic-token.png"
                alt="sonic"
              />
            </div>
            <PrimaryButton className="text-xl bg-[#F6F6F3] text-[#121212]">
              {formatStr(publicKey?.toString())}
            </PrimaryButton>
          </div>
        )}
      </div>
    </Flex>
  );
}
