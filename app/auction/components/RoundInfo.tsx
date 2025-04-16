import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import RoundChart from "./RoundChart";
import { useMemo } from "react";

export default function RoundInfo() {
  const params = useParams();
  const { data: roundInfo } = useQuery({
    queryKey: ["/pad/round/info"],
    queryFn: async () => http.get("/pad/round/info", { project_id: params.id })
  });

  const mockData = useMemo(() => {
    const roundInfoData = [];
    if (roundInfo?.data) {
      for (let i = 0; i < roundInfo.data.total_round; i++) {
        if (roundInfo.data.round_info[i]) {
          roundInfoData.push(roundInfo.data.round_info[i]);
        } else {
          roundInfoData.push({
            percent: 0,
            price: { max: 0, min: 0, price: 0 },
            round: i + 1,
            sold: 0,
            supply: 0
          });
        }
      }
    }

    return Object.assign({ round_info: [] }, roundInfo?.data, {
      round_info: roundInfoData
    });
  }, [roundInfo]);

  return (
    <div className="w-[658px] h-[428px] flex flex-col items-center justify-center">
      <RoundChart data={mockData} />
      <div className="text-black text-xs">Auction Rounds</div>
    </div>
  );
}
