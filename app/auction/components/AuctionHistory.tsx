"use client";
import Pagination from "@/app/components/common/Pagination";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import { cn } from "@/utils";
import { useState } from "react";

export default function AuctionHistory() {
  const [active, setActive] = useState<"all" | "my">("all");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <PrimaryButton
          className={cn(
            "h-9 px-8",
            active !== "all" &&
              "bg-white text-[#121212] hover:bg-[#292929] hover:text-white"
          )}
          onClick={() => setActive("all")}
        >
          All
        </PrimaryButton>
        <PrimaryButton
          className={cn(
            "h-9 px-8 ",
            active !== "my" &&
              "bg-white text-[#121212] hover:bg-[#292929] hover:text-white"
          )}
          onClick={() => setActive("my")}
        >
          My
        </PrimaryButton>
      </div>

      <div className="p-8 rounded-[40px] bg-white flex flex-col gap-2 font-inter">
        <h1 className="font-baloo2 text-2xl font-bold">Auction History</h1>
        <div className="grid grid-cols-[157px_136px_111px_100px] px-3 justify-between h-[50px] items-center text-[#727272] border-b border-[#121212]/10">
          <div>Address</div>
          <div>Purchase Amount</div>
          <div>Auction Round</div>
          <div className="flex justify-end">Date</div>
        </div>
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-[157px_134px_111px_100px] px-3 justify-between h-[50px] items-center text-[#121212]/70 border-b border-[#F6F6F3]",
              "font-medium text-lg/[22px] hover:bg-[#F6F6F3] rounded-2xl transition-all duration-300"
            )}
          >
            <div className={cn("px-2 py-1 rounded-full w-fit", "bg-[#DEF26B]")}>
              0x42fB1...78c2E
            </div>
            <div>100,000 Sonic</div>
            <div>Round 4</div>
            <div className="flex justify-end">19s ago</div>
          </div>
        ))}
      </div>

      <Pagination total={10} className="mt-2" />
    </div>
  );
}
