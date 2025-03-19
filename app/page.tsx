"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./components/common/PrimaryButton";
export default function Home() {
  const router = useRouter();

  return (
    <Box
      bg={"linear-gradient(180deg, #6457FD 0%, #E2A9FE 50%, #FFDFE1 100%);"}
      className="w-full h-screen relative flex items-center justify-between"
    >
      <div className="flex items-center justify-between min-w-[1280px] max-w-[1728px] w-full mx-auto h-full relative">
        <img
          onClick={() => router.push("/")}
          className="h-10 absolute top-7 left-20"
          src="/images/logo-cream-pad.svg"
          alt=""
        />
        <div className="ml-20 flex flex-col gap-24">
          <img className="w-[672px]" src="/images/welcome.png" alt="" />
          <PrimaryButton
            onClick={() => router.push("/auction")}
            className="h-[66px] w-[414px] text-[32px]/normal border-none gap-4 font-baloo2"
          >
            <img src="/images/action.svg" alt="" />
            Auction Now
          </PrimaryButton>
        </div>
        <img className="w-[660px] mr-20" src="/images/cloud.png" alt="" />
      </div>
    </Box>
  );
}
