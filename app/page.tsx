"use client";
import { cn } from "@/utils";
import { Box, useMediaQuery } from "@chakra-ui/react";

export default function Home() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <div className="py-12 flex flex-col gap-10 text-[#121212]">
      <img src="/images/banner.png" alt="" />

      <div className="flex flex-col gap-8">
        <div className="py-5 pl-5 pr-8 rounded-[40px] bg-white flex items-center gap-10 hover:bg-[#ECECEC] transition-colors">
          <img
            className="h-[320px] w-[535px]"
            src="/images/activity/one.png"
            alt=""
          />

          <div className="flex flex-col gap-6 grow">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 w-full">
                <img className="size-14" src="/images/sonic-token.png" alt="" />
                <span className="text-2xl font-bold font-baloo2">
                  Sonic SVM
                </span>
                <div
                  className={cn(
                    "py-2.5 px-4 ml-auto bg-[#DEF26B] rounded-full cursor-pointer"
                  )}
                >
                  Open
                </div>
              </div>
              <div className="text-[#666] text-sm/[1.2] font-inter">
                Sonic SVM merges EVM compatibility with Solana’s
                high-performance chain, delivering a familiar dev environment,
                low costs, and fast transactions to accelerate Web3 adoption.
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/activity/x.svg" alt="" />
                <img src="/images/activity/tg.svg" alt="" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-2xl/[1.2] font-bold">
                    Sale Progress
                  </span>
                  <span className="text-[#7E67FF] text-2xl/[1.2] font-semibold">
                    100%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#ECECEC]">
                  <Box
                    bg={"linear-gradient(90deg, #C49AFF 0%, #FFB055 100%)"}
                    width={"40%"}
                    className="rounded-full h-full"
                  ></Box>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <img src="/images/activity/up.svg" alt="" />
                    <span>Amount for Sale</span>
                  </div>
                  <div className="font-baloo2 font-semibold text-[28px]/[1.1]">
                    100,000,000 <span className="text-base">BONK</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <img src="/images/activity/price.svg" alt="" />
                    <span>Price</span>
                  </div>
                  <div className="font-baloo2 font-semibold text-[28px]/[1.1]">
                    100 <span className="text-base">Sonic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
