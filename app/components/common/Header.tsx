"use client";
import {
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import PrimaryButton from "./PrimaryButton";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { formatStr } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArrowIcon from "../icons/ArrowIcon";
import { whitepaper } from "@/app/data/auctions";
export default function Header() {
  const { connected, publicKey, disconnect } = useWallet();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex className="px-[70px] py-4 text-[#121212] bg-white font-baloo2 justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img
          onClick={() => router.push("/")}
          className="h-[46px] cursor-pointer"
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
          onClick={() => window.open(whitepaper, "_blank")}
          className="font-bold px-6 py-2 cursor-pointer"
        >
          whitepaper
        </div>
      </div>

      <div className="flex items-center justify-end">
        {!connected ? (
          <PrimaryButton
            className="text-xl h-14"
            onClick={() => openModalDirectly(MODAL_HASH_MAP.walletConnect)}
          >
            Connect
          </PrimaryButton>
        ) : (
          <Popover
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            trigger="click"
            placement="bottom-end"
          >
            <PopoverTrigger>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-[#F6F6F3] rounded-full">
                  <img
                    className="size-6"
                    src="/images/sonic-token.png"
                    alt="sonic"
                  />
                </div>
                <PrimaryButton className="text-base bg-[#F6F6F3] text-[#121212] gap-2 hover:bg-[#F6F6F3]">
                  {formatStr(publicKey?.toString())}
                  <ArrowIcon className="rotate-90 size-5" />
                </PrimaryButton>
              </div>
            </PopoverTrigger>
            <PopoverContent
              _focusWithin={{ border: "none" }}
              boxShadow={"0px 0px 16px 0px rgba(68, 68, 68, 0.25)"}
              className="w-fit outline-none px-0 border-none rounded-[32px] bg-white"
            >
              <div
                onClick={() => {
                  disconnect();
                  onClose();
                }}
                className="rounded-full bg-white px-4 py-2 font-baloo2 font-bold cursor-pointer"
              >
                Disconnect
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </Flex>
  );
}
