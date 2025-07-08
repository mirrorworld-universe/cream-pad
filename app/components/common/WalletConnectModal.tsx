"use client";
import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { walletList } from "@/app/wallet/wallet-list";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import { useEffect } from "react";
import CloseIcon from "../icons/CloseIcon";
import PrimaryButton from "./PrimaryButton";

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
      <Modal
        isOpen={modalHash === MODAL_HASH_MAP.walletConnect}
        onClose={closeModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          maxW={"369px"}
          className="w-full text-[#121212] rounded-[40px] overflow-hidden font-baloo2"
        >
          <ModalBody className="p-8 bg-white">
            <Flex className="font-extrabold text-xl items-center justify-between font-orbitron">
              <Text>Connect Your Wallet</Text>
              <CloseIcon
                onClick={closeModal}
                className="cursor-pointer text-icon transition-colors"
              />
            </Flex>
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
    </>
  );
}

function WalletItem({ wallet, handleWalletSelect }) {
  return (
    <Flex className="items-center gap-3 h-16 font-semibold">
      <Image src={wallet.adapter.icon} className="size-8 rounded-full" alt="" />
      <Text className="text-base font-inter">{wallet.name}</Text>
      <Box
        className={clsx(
          "ml-auto h-[38px] w-[106px] transition-colors text-sm font-inter"
        )}
      >
        {wallet.adapter.readyState === WalletReadyState.Installed ? (
          <PrimaryButton
            className="w-full h-full text-sm"
            onClick={() => handleWalletSelect(wallet)}
          >
            Connect
          </PrimaryButton>
        ) : (
          <PrimaryButton
            className="w-full h-full text-sm"
            onClick={() => {
              window.open(wallet.adapter.url, "_blank");
            }}
          >
            Install
          </PrimaryButton>
        )}
      </Box>
    </Flex>
  );
}
