import {
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import clsx from "clsx";

import { formatStr } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import CopyText from "../common/CopyText";
import CloseIcon from "../icons/CloseIcon";
import DocumentIcon from "../icons/DocumentIcon";
import ExitIcon from "../icons/ExitIcon";
import SettingsIcon from "../icons/SettingsIcon";
import WalletIcon from "../icons/WalletIcon";
import { useRouter } from "next/navigation";

export default function AccountInfo() {
  const { publicKey, wallet } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = publicKey.toString();

  const accountInfoMenu = [
    {
      text: "Tx History",
      icon: <DocumentIcon className="size-6" />,
      url: "/history"
    },
    {
      text: "Set up Network",
      icon: <SettingsIcon className="size-6" />,
      url: ""
    },
    {
      text: "Disconnect",
      icon: <ExitIcon className="size-6" />,
      url: ""
    }
  ];

  return (
    <>
      <Show above="768px">
        <Popover trigger="hover" placement="bottom-end">
          <PopoverTrigger>
            <Center className="px-6 h-full gap-2 border rounded border-line cursor-pointer hover:bg-white/10 transition-all">
              <WalletIcon className="size-6" />
              {formatStr(address)}
            </Center>
          </PopoverTrigger>
          <PopoverContent
            outline={"none"}
            boxShadow={"0px 4px 12px 0px rgba(0, 0, 0, 0.10)"}
            className={clsx(
              "font-semibold rounded-none border-none p-0 leading-6 w-[296px] relative bg-bg-popup",
              "child:px-6 child:py-4 child:flex child:items-center child:gap-2 child:transition-all"
            )}
          >
            <AccountItem />

            {accountInfoMenu.map((menu) => (
              <TabItem key={menu.text} menu={menu} />
            ))}
          </PopoverContent>
        </Popover>
      </Show>
      <Show below="767px">
        <Center
          onClick={onOpen}
          className="gap-2 cursor-pointer text-sm font-semibold px-4 h-8 border ml-auto border-line rounded text-white"
        >
          <WalletIcon className="size-5" />
          {formatStr(address)}
        </Center>
        <Drawer
          isFullHeight
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
        >
          <DrawerOverlay />

          <DrawerContent className="bg-black font-semibold">
            <DrawerBody className="p-0">
              <Flex className="p-4 text-tertary justify-between">
                My Wallet
                <CloseIcon
                  onClick={onClose}
                  className="text-icon hover:text-primary cursor-pointer"
                />
              </Flex>
              <AccountItem />

              {accountInfoMenu.map((menu) => (
                <TabItem key={menu.text} menu={menu} />
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
}

function AccountItem() {
  const { publicKey, wallet } = useWallet();
  const address = publicKey.toString();

  return (
    <Flex className="items-center gap-4 rounded cursor-default px-4 py-5 border-b border-line">
      <Image src={wallet.adapter.icon} className="size-10" alt="" />
      <VStack gap={0} className="items-start font-manrope">
        <Text className="font-semibold text-xl">12 SOL</Text>
        <CopyText label={address}>{formatStr(address)}</CopyText>
      </VStack>
    </Flex>
  );
}

function TabItem({ menu }) {
  const { disconnect } = useWallet();
  const router = useRouter();

  const handleNavClick = (url: string) => {
    if (url.startsWith("http") || url.startsWith("/")) {
      router.push(url);
    } else {
      disconnect();
    }
  };
  return (
    <Flex
      key={menu.text}
      onClick={() => handleNavClick(menu.url)}
      className="py-5 px-4 gap-2 cursor-pointer hover:bg-line"
    >
      {menu.icon} {menu.text}
    </Flex>
  );
}
