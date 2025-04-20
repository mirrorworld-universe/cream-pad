import { refetchQueries } from "@/utils";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import Countdown from "react-countdown";
import { match, P } from "ts-pattern";

export default function CountDownTime() {
  const params = useParams();

  const { data: contractInfo } = useQuery({
    queryKey: ["/pad/project/contract/info", params.id],
    queryFn: async () =>
      http.get(`/pad/project/contract/info`, { project_id: params.id }),
    enabled: !!params.id
  });

  const nextAuction = match(Number(contractInfo?.data?.next_auction))
    .with(P.number.lt(86400), (time) => (
      <Countdown
        date={Date.now() + time * 1000}
        onComplete={() => {
          refetchQueries();
        }}
        renderer={({ hours, minutes, seconds }) => (
          <span>
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
          </span>
        )}
      />
    ))
    .otherwise((time) => (
      <span>{dayjs(Date.now() + time * 1000).format("YYYY-MM-DD")}</span>
    ));
  return (
    <div className="ml-auto flex items-center">
      <div className="size-10 rounded-full bg-[#E8FF59] flex items-center justify-center">
        <img src="/images/time.svg" alt="time" />
      </div>
      <div className="h-3 w-2 bg-[#E8FF59]"></div>
      <div className="px-5 h-10 bg-[#E8FF59] rounded-full flex items-center justify-center text-base">
        {contractInfo?.data?.current_round === contractInfo?.data?.total_round
          ? "Auction Ends in:"
          : "Auction Starts in:"}
        {nextAuction}
      </div>
    </div>
  );
}
