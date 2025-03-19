"use client";
import AuctionCard from "./components/AuctionCard";
import { data } from "../data/auctions";
import Pagination from "../components/common/Pagination";
export default function Home() {
  return (
    <div className="py-12 flex flex-col gap-10 text-[#121212]">
      <img src="/images/banner.png" alt="" />

      <div className="flex flex-col gap-8">
        {data.map((item) => (
          <AuctionCard key={item.id} data={item} />
        ))}
      </div>
      <Pagination total={5} />
    </div>
  );
}
