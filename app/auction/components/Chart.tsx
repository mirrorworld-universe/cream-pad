"use client";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import ArrowIcon from "@/app/components/icons/ArrowIcon";
import CloseIcon from "@/app/components/icons/CloseIcon";
import {
  Box,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";

const options = [
  {
    label: "25%",
    value: 25
  },
  {
    label: "50%",
    value: 50
  },
  {
    label: "100%",
    value: 100
  }
];
export default function Chart() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col gap-6 mb-8 font-inter">
      <div className="h-9 px-8 font-baloo2 font-bold bg-[#121212] text-white w-fit rounded-full flex items-center justify-center">
        chart
      </div>
      <div className="p-8 rounded-[40px] bg-white flex gap-8">
        <div className="w-[658px] h-[428px] bg-slate-300"></div>
        <div className="flex flex-col gap-8 grow">
          <div className="flex flex-col gap-4">
            <p className="font-medium">
              Current Auction Price: <span className="font-bold"> $0.16</span>
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#7500FF]">$0.14</span>
                <span className="text-[#FF9011]">$0.28</span>
              </div>
              <div className="h-3 bg-[#F6F6F3] rounded-full">
                <Box
                  bg={"linear-gradient(90deg, #C59AFC 0%, #FFB056 100%)"}
                  className="h-full rounded-full"
                  w={"50%"}
                ></Box>
              </div>
              <div className="flex justify-between text-xs text-[#666]">
                <span>100,000</span>
                <span>100,000</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-base/[1.2]">Your Bid Amount</p>
            <div className="bg-[#F6F6F3] rounded-2xl relative">
              <Input
                className="h-14 border border-[#121212] rounded-2xl placeholder:text-[#121212]/20 focus:outline-none pr-32"
                placeholder="0.00"
              />
              <Popover
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                trigger="hover"
                placement="bottom-end"
              >
                <PopoverTrigger>
                  <div className="z-10 h-10 px-3 flex items-center justify-center my-auto absolute top-0 bottom-0 right-2 bg-white rounded-[10px] cursor-pointer">
                    <p className="font-semibold">SONIC</p>
                    <img
                      src="/images/sonic-token.png"
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
                      <p className="font-baloo2 font-bold text-xl">
                        Select Token
                      </p>
                      <CloseIcon
                        className="size-4 cursor-pointer"
                        onClick={onClose}
                      />
                    </div>
                    <div className="flex flex-col mt-6">
                      <div
                        onClick={() => {
                          onClose();
                        }}
                        className="px-8 flex items-center gap-2 h-14 hover:bg-[#F6F6F3] cursor-pointer"
                      >
                        <img
                          src="/images/sonic-token.png"
                          alt="sonic"
                          className="size-8"
                        />
                        <p className="font-semibold">SONIC</p>
                        <p className="ml-auto">247,899,872.994</p>
                      </div>
                    </div>
                  </Box>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-[18px] text-sm font-medium py-1 border border-[#E1E1E1] rounded-full cursor-pointer"
                >
                  {option.label}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#121212]/70 mt-3">Gas: 0.00 SOL</p>
          </div>

          <div className="mt-auto flex flex-col gap-8">
            <p className="text-center font-medium">Total: 0.00 SOL</p>
            <PrimaryButton className="">Buy</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
