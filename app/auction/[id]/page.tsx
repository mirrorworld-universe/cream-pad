import AuctionHistory from "../components/AuctionHistory";
import BasicInfo from "../components/BasicInfo";
import Chart from "../components/Chart";
export default function Page() {
  return (
    <div className="py-14 text-[#121212]">
      <BasicInfo />
      <Chart />
      <AuctionHistory />
    </div>
  );
}
