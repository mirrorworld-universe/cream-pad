"use client";
import Empty from "@/app/components/common/Empty";
import Pagination from "@/app/components/common/Pagination";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import { cn, formatStr } from "@/utils";
import { http } from "@/utils/http";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { match, P } from "ts-pattern";

export default function AuctionHistory() {
  const [active, setActive] = useState<"all" | "my">("all");
  const params = useParams();
  const { publicKey } = useWallet();

  const { data } = useQuery({
    queryKey: ["/pad/auction/history", params.id, active],
    queryFn: async () =>
      http.post("/pad/auction/history", {
        page: 1,
        page_size: 10,
        project_id: params.id,
        wallet: active === "my" ? publicKey?.toBase58() : undefined
      })
  });

  const items: any[] = data?.data?.data || [];
  const total = data?.data?.total_page || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <PrimaryButton
          className={cn(
            "h-9 px-8",
            active !== "all" &&
              "bg-white text-[#121212] hover:bg-[#292929] hover:text-white"
          )}
          onClick={() => setActive("all")}
        >
          All
        </PrimaryButton>
        <PrimaryButton
          className={cn(
            "h-9 px-8 ",
            active !== "my" &&
              "bg-white text-[#121212] hover:bg-[#292929] hover:text-white"
          )}
          onClick={() => setActive("my")}
        >
          My
        </PrimaryButton>
      </div>

      <div className="p-8 rounded-[40px] bg-white flex flex-col gap-2 font-inter min-h-[800px]">
        <h1 className="font-baloo2 text-2xl font-bold">Auction History</h1>
        <div className="grid grid-cols-[157px_136px_111px_100px] px-3 justify-between h-[50px] items-center text-[#727272] border-b border-[#121212]/10">
          <div>Address</div>
          <div>Purchase Amount</div>
          <div>Auction Round</div>
          <div className="flex justify-end">Date</div>
        </div>

        {match(items)
          .with([], () => <Empty className="mt-[72px]" />)
          .with(P.array(), (items) =>
            items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-[157px_134px_111px_100px] px-3 justify-between h-[50px] items-center text-[#121212]/70 border-b border-[#F6F6F3]",
                  "font-medium text-lg/[22px] hover:bg-[#F6F6F3] rounded-2xl transition-all duration-300"
                )}
              >
                <div
                  className={cn("px-2 py-1 rounded-full w-fit", "bg-[#DEF26B]")}
                >
                  {formatStr(item.amount, 4)}
                </div>
                <div>{item.amount}</div>
                <div>Round {item.round}</div>
                <div className="flex justify-end">{item.date}</div>
              </div>
            ))
          )
          .run()}
      </div>

      {total > 0 && <Pagination total={total} className="mt-2" />}
    </div>
  );
}
