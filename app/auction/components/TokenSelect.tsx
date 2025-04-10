import ArrowIcon from "@/app/components/icons/ArrowIcon";
import CloseIcon from "@/app/components/icons/CloseIcon";
import { http } from "@/utils/http";
import {
  Box,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";

import { Popover } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const TokenSelect = ({
  currentToken,
  setCurrentToken
}: {
  currentToken: any;
  setCurrentToken: (token: any) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();

  const { data: paymentMethods } = useQuery({
    queryKey: ["/pad/payment-mint"],
    queryFn: async () =>
      http.get("/pad/payment-mint", { project_id: params.id })
  });

  useEffect(() => {
    if (paymentMethods?.data) {
      setCurrentToken(paymentMethods.data[0]);
    }
  }, [paymentMethods]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      trigger="hover"
      placement="bottom-end"
    >
      <PopoverTrigger>
        <div className="z-10 h-10 px-3 flex items-center justify-center my-auto absolute top-0 bottom-0 right-2 bg-white rounded-[10px] cursor-pointer">
          <p className="font-semibold">{currentToken?.token_symbol}</p>
          <img
            src={currentToken?.token_image}
            alt="sonic"
            className="w-4 h-4 ml-2 mr-1"
          />
          <ArrowIcon className="size-5 rotate-90" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        _focusWithin={{ border: "none" }}
        boxShadow={"0px 0px 16px 0px rgba(68, 68, 68, 0.25)"}
        className="w-[369px] outline-none -mr-2 mt-2 px-0 py-8 border-none rounded-[32px] bg-white overflow-scroll"
      >
        <Box className="flex flex-col">
          <div className="flex items-center justify-between px-8">
            <p className="font-baloo2 font-bold text-xl">Select Token</p>
            <CloseIcon className="size-4 cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex flex-col mt-6">
            {paymentMethods?.data?.map((item, index) => (
              <div
                onClick={() => {
                  setCurrentToken(item);
                  onClose();
                }}
                key={index}
                className="px-8 flex items-center gap-2 h-14 hover:bg-[#F6F6F3] cursor-pointer"
              >
                <img src={item.token_image} alt="sonic" className="size-8" />
                <p className="font-semibold">{item.token_symbol}</p>
                <p className="ml-auto"></p>
              </div>
            ))}
          </div>
        </Box>
      </PopoverContent>
    </Popover>
  );
};
