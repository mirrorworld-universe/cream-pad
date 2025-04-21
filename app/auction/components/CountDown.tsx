import { useProjectDetail } from "@/app/store";
import { cn, refetchQueries } from "@/utils";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useState } from "react";
import Countdown from "react-countdown";
import { match, P } from "ts-pattern";

export default function CountDownTime() {
  const params = useParams();
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);

  const { projectDetail } = useProjectDetail();

  const { data: contractInfo } = useQuery({
    queryKey: ["/pad/project/contract/info", params.id],
    queryFn: async () =>
      http.get(`/pad/project/contract/info`, { project_id: params.id }),
    enabled: !!params.id
  });

  const curRound = contractInfo?.data?.cur_round;
  const totalRound = contractInfo?.data?.total_round;
  const isLastRound = curRound === totalRound && curRound != null;

  const nextAuction = match(Number(contractInfo?.data?.next_auction))
    .with(P.number.lt(86400), (time) => (
      <Countdown
        date={Date.now() + time * 1000}
        onComplete={() => {
          refetchQueries();
          setIsCountdownComplete(true);
        }}
        renderer={({ hours, minutes, seconds, completed }) => (
          <span>
            {match(isLastRound && completed)
              .with(true, () => "")
              .otherwise(
                () =>
                  `in: ${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
              )}
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
      <div
        className={cn(
          "px-5 h-10 bg-[#E8FF59] rounded-full flex items-center justify-center text-base",
          isCountdownComplete && isLastRound && "bg-[#E8FF59]"
        )}
      >
        {isLastRound ? "Auction Ends" : "Auction Starts"}
        {nextAuction}
      </div>
    </div>
  );
}
