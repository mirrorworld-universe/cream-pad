import useModalHash, { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

export default function WhitelistModal() {
  const { modalHash, closeModal } = useModalHash();

  const isOpen = modalHash === MODAL_HASH_MAP.whitelist;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent className="p-8 rounded-[32px] flex flex-col gap-6 max-w-[380px] w-full text-center">
        <p className="font-extrabold text-2xl font-baloo2">
          Address Not Whitelisted
        </p>
        <p className="text-center text-[#666] font-medium">
          The connected address is not on the whitelist. Please switch to an
          eligible address and try again.
        </p>
        <div
          onClick={closeModal}
          className="rounded-full bg-[#121212] flex items-center justify-center h-[38px] text-white font-bold font-baloo2 cursor-pointer hover:bg-[#121212]/80 transition-all duration-300"
        >
          Ok
        </div>
      </ModalContent>
    </Modal>
  );
}
