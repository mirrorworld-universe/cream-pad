"use client";
import AuctionCard from "./components/AuctionCard";
import { data } from "../data/auctions";
import Pagination from "../components/common/Pagination";
import { Box } from "@chakra-ui/react";
export default function Home() {
  return (
    <div className="pb-12 flex flex-col gap-10 text-[#121212]">
      <Box
        className="absolute left-0 right-0 h-[360px] w-full"
        bg={"linear-gradient(180deg, #6457FD 0%, #E2A9FE 50%, #FFF1E5 100%);"}
      >
        <img
          className="max-w-view w-full mx-auto"
          src="/images/banner.png"
          alt=""
        />
      </Box>

      <div className="flex flex-col gap-8">
        {data.map((item) => (
          <AuctionCard key={item.id} data={item} />
        ))}
      </div>
      <Pagination total={5} />
    </div>
  );
}
