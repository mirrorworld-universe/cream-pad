"use client";
import CopyIcon from "@/app/components/icons/CopyIcon";
import { formatStr, formatNumber } from "@/utils";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { logoMap } from "./AuctionCard";
import { match } from "ts-pattern";
import { Skeleton } from "@chakra-ui/react";
import { useProjectDetail } from "@/app/store";
import { useEffect } from "react";
import Countdown from "react-countdown";
import { P } from "ts-pattern";
import dayjs from "dayjs";

export default function BasicInfo() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["/project/:id", params.id],
    queryFn: async () => http.get(`/project/${params.id}`)
  });

  const { data: contractInfo } = useQuery({
    queryKey: ["/pad/project/contract/info", params.id],
    queryFn: async () =>
      http.get(`/pad/project/contract/info`, { project_id: params.id }),
    enabled: !!params.id
  });

  useEffect(() => {
    if (data?.data && contractInfo?.data) {
      useProjectDetail.getState().setProjectDetail({
        ...data.data,
        ...contractInfo.data
      });
    }
  }, [data, contractInfo]);

  const detail = data?.data || {};

  const nextAuction = match(Number(contractInfo?.data?.next_auction))
    .with(P.number.lt(86400), (time) => (
      <Countdown
        date={Date.now() + time * 1000}
        onComplete={() => {
          // TODO: 拍卖结束
          console.log("complete");
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
    <>
      <p className="text-3xl font-baloo2 font-bold mb-8">
        Basic Information Module
      </p>
      {match(isLoading)
        .with(true, () => (
          <div className="flex flex-col gap-6 h-[200px] mb-12">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[50px] w-full" />
          </div>
        ))
        .otherwise(() => (
          <>
            <div className="flex items-center gap-2 font-medium text-2xl mb-6">
              <span>Token Name</span>
              <img className="size-12" src={detail.token_icon} alt="sonic" />
              <span>
                {detail.token_name} ({detail.token_symbol})
              </span>

              <div className="ml-auto flex items-center">
                <div className="size-10 rounded-full bg-[#E8FF59] flex items-center justify-center">
                  <img src="/images/time.svg" alt="time" />
                </div>
                <div className="h-3 w-2 bg-[#E8FF59]"></div>
                <div className="px-5 h-10 bg-[#E8FF59] rounded-full flex items-center justify-center text-base">
                  Auction Ends in: {nextAuction}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-[100px] gap-y-6 mb-11">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-2xl"
                    src="/images/blockchain.png"
                    alt="blockchain"
                  />
                  <div className="space-y-2">
                    <p className="text-[#666] text-sm">Blockchain:</p>
                    <p className="font-baloo2 font-semibold">{detail.chain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-2xl"
                    src="/images/mint-address.png"
                    alt="mint-address"
                  />
                  <div className="space-y-2">
                    <p className="text-[#666] text-sm">Mint Address:</p>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(detail.token_address);
                      }}
                      className="font-baloo2 font-semibold cursor-pointer"
                    >
                      {formatStr(detail.token_address)} <CopyIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-2xl"
                    src="/images/social.png"
                    alt="social"
                  />
                  <div className="space-y-2">
                    <p className="text-[#666] text-sm">Social media:</p>
                    <div className="font-baloo2 font-semibold flex items-center gap-2">
                      {detail.social?.map((social) => (
                        <a
                          key={social.account}
                          href={social.account}
                          target="_blank"
                        >
                          <img
                            className="size-5"
                            src={logoMap[social.type]}
                            alt=""
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-2xl"
                    src="/images/remain.png"
                    alt="remain"
                  />
                  <div className="space-y-2">
                    <p className="text-[#666] text-sm">
                      Remaining Token in the Sale(%)
                    </p>
                    <p className="font-baloo2 font-semibold">
                      {contractInfo?.data?.remaining_token &&
                        formatNumber(contractInfo.data.remaining_token)}{" "}
                      ({contractInfo?.data?.remaining_token_percent}% )
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-2xl"
                    src="/images/fdv.png"
                    alt="fdv"
                  />
                  <div className="space-y-2">
                    <p className="text-[#666] text-sm">FDV:</p>
                    <p className="font-baloo2 font-semibold">
                      {contractInfo?.data?.FDV &&
                        formatNumber(contractInfo.data.FDV)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="size-10 rounded-2xl"
                    src="/images/round.png"
                    alt="round"
                  />
                  <div className="space-y-2">
                    <p className="text-[#666] text-sm">
                      Current Auction Rounds/Total Rounds:
                    </p>
                    <p className="font-baloo2 font-semibold">
                      {contractInfo?.data?.cur_round}/
                      {contractInfo?.data?.total_round}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  );
}
