"use client";
import AuctionHistory from "../components/AuctionHistory";
import BasicInfo from "../components/BasicInfo";
import Chart from "../components/Chart";
import WhitelistModal from "../components/WhitelistModal";

export default function Page() {
  return (
    <div className="py-14 text-[#121212] max-w-view px-4 mx-auto w-full">
      <BasicInfo />
      <Chart />
      <AuctionHistory />
      <WhitelistModal />
    </div>
  );
}
