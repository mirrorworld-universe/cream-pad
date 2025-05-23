import { cn, refetchQueries } from "@/utils";
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

  const curRound = contractInfo?.data?.cur_round;
  const totalRound = contractInfo?.data?.total_round;
  const isLastRound = curRound === totalRound && curRound != null;
  const isOver = contractInfo?.data?.status === "closed";

  const nextAuction = match(Number(contractInfo?.data?.next_auction))
    .with(P.number.lt(86400), (time) => (
      <Countdown
        key={contractInfo?.data?.next_auction + "-" + Date.now()}
        date={Date.now() + time * 1000}
        onComplete={() => {
          setTimeout(() => {
            refetchQueries();
          }, 5000);
        }}
        renderer={({ hours, minutes, seconds, completed }) => (
          <span>
            {match(isLastRound && completed)
              .with(true, () => "")
              .otherwise(() => (
                <span>
                  &nbsp;in: {hours.toString().padStart(2, "0")}:
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </span>
              ))}
          </span>
        )}
      />
    ))
    .otherwise((time) => (
      <span>{dayjs(Date.now() + time * 1000).format("YYYY-MM-DD")}</span>
    ));

  if (contractInfo == null) return null;

  return (
    <div className="ml-auto flex items-center -space-x-1">
      <div
        className={cn(
          "size-10 rounded-full bg-[#C49AFF] flex items-center justify-center",
          isLastRound && "bg-[#E8FF59]",
          isOver && "bg-white"
        )}
      >
        <img src="/images/time.svg" alt="time" />
      </div>
      <div
        className={cn(
          "h-3 w-3 bg-[#C49AFF]",
          isLastRound && "bg-[#E8FF59]",
          isOver && "bg-white"
        )}
      />
      <div
        className={cn(
          "px-5 h-10 bg-[#C49AFF] rounded-full flex items-center text-base",
          isLastRound && "bg-[#E8FF59]",
          isOver && "bg-white"
        )}
      >
        {isLastRound || isOver ? (
          <div>Auction Ends {!isOver && nextAuction}</div>
        ) : (
          <div className="min-w-[235px]">Next Round Starts{nextAuction}</div>
        )}
      </div>
    </div>
  );
}
