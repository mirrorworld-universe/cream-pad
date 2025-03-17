"use client";
import { walletList } from "@/app/wallet/wallet-list";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Show,
  Text
} from "@chakra-ui/react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import CloseIcon from "../icons/CloseIcon";
import { useEffect } from "react";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";

export default function WalletConnectModal() {
  const { select, connected } = useWallet();
  const { modalHash, closeModal } = useModalHash();

  const handleWalletSelect = async (currentWallet: any) => {
    const walletName = currentWallet.adapter.name;
    if (walletName) {
      try {
        select(walletName);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  useEffect(() => {
    if (connected) {
      closeModal();
    }
  }, [connected, closeModal]);

  return (
    <>
      <Show above="768px">
        <Modal
          isOpen={modalHash === MODAL_HASH_MAP.walletConnect}
          onClose={closeModal}
          isCentered
        >
          <ModalOverlay />
          <ModalContent maxW={"520px"} className="w-full">
            <ModalBody className="p-8 bg-bg-popup">
              <Flex className="font-extrabold text-xl items-center justify-between font-orbitron">
                <Text>Connect Your Wallet</Text>
                <CloseIcon
                  onClick={closeModal}
                  className="cursor-pointer hover:text-white text-icon transition-colors"
                />
              </Flex>
              <Text className="text-tertary text-sm font-manrope mt-3 mb-6">
                Choose one of the wallets and install the corresponding browser
                extension.
              </Text>
              <Flex className="flex-col">
                {walletList.map((wallet) => (
                  <WalletItem
                    key={wallet.id}
                    wallet={wallet}
                    handleWalletSelect={() => handleWalletSelect(wallet)}
                  />
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>

      <Show below="767px">
        <Drawer
          isFullHeight
          isOpen={modalHash === MODAL_HASH_MAP.walletConnect}
          placement="bottom"
          onClose={closeModal}
        >
          <DrawerOverlay />

          <DrawerContent className="bg-black font-semibold">
            <DrawerBody className="px-4 py-0">
              <Flex className="py-4 text-tertary justify-between">
                Connect Your Wallet
                <Box onClick={closeModal} className="cursor-pointer">
                  <CloseIcon />
                </Box>
              </Flex>
              {walletList.map((wallet) => (
                <WalletItem
                  key={wallet.id}
                  wallet={wallet}
                  handleWalletSelect={() => handleWalletSelect(wallet)}
                />
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
}

function WalletItem({ wallet, handleWalletSelect }) {
  return (
    <Flex className="items-center gap-3 h-16 font-semibold">
      <Image src={wallet.adapter.icon} className="size-6" alt="" />
      <Text className="text-sm md:text-base">{wallet.name}</Text>
      <Box
        className={clsx(
          "ml-auto h-8 md:h-10 w-24 md:w-28 cursor-pointer transition-colors text-sm md:text-base"
        )}
      >
        {wallet.adapter.readyState === WalletReadyState.Installed ? (
          <Button
            className="w-full h-full"
            size={["small", "medium"]}
            onClick={() => handleWalletSelect(wallet)}
          >
            Connect
          </Button>
        ) : (
          <Button
            className="w-full h-full"
            variant={"outline"}
            size={["small", "medium"]}
            onClick={() => {
              window.open(wallet.adapter.url, "_blank");
            }}
          >
            Install
          </Button>
        )}
      </Box>
    </Flex>
  );
}
