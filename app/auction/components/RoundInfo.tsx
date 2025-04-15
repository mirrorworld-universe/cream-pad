import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import RoundChart from "./RoundChart";

export default function RoundInfo() {
  const params = useParams();
  const { data: roundInfo } = useQuery({
    queryKey: ["/pad/round/info"],
    queryFn: async () => http.get("/pad/round/info", { project_id: params.id })
  });

  const data = roundInfo?.data || { round_info: [] };

  return (
    <div className="w-[658px] h-[428px] flex flex-col items-center justify-center">
      <RoundChart data={data} />
      <div className="text-black text-xs">Auction Rounds</div>
    </div>
  );
}
