"use client";
import { Flex, Button } from "@chakra-ui/react";
import SiteLogo from "./SiteLogo";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import AccountInfo from "../header/AccountInfo";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";

const navBar = [
  {
    label: "History",
    url: "/history"
  },
  {
    label: "FAQ",
    url: "/faq"
  }
];

export default function Header() {
  const { connected } = useWallet();

  return (
    <Flex className="px-4 md:px-10 h-20 justify-between items-center sticky z-50 top-0 bg-bg1 shrink-0">
      <Flex className="font-extrabold items-center gap-2 text-[22px] cursor-pointer uppercase">
        <SiteLogo site="Bridge" />
      </Flex>

      <Flex className="uppercase gap-14 h-12 font-semibold ml-auto text-primary">
        {navBar.map((nav, key) => (
          <Link
            key={key}
            href={nav.url}
            className="cursor-pointer flex items-center justify-center"
          >
            {nav.label}
          </Link>
        ))}

        {!connected ? (
          <Button
            size={"large"}
            onClick={() => openModalDirectly(MODAL_HASH_MAP.walletConnect)}
          >
            Connect Wallet
          </Button>
        ) : (
          <AccountInfo />
        )}
      </Flex>
    </Flex>
  );
}
