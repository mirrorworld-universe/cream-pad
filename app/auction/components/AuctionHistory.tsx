"use client";
import Empty from "@/app/components/common/Empty";
import Pagination from "@/app/components/common/Pagination";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import { openModalDirectly } from "@/app/hooks/useModalHash";
import { MODAL_HASH_MAP } from "@/app/hooks/useModalHash";
import { useProjectDetail } from "@/app/store";
import { cn, formatStr, formatTimeAgo, getRandomAddressColor } from "@/utils";
import { http } from "@/utils/http";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetState } from "react-use";
import { match, P } from "ts-pattern";

export default function AuctionHistory() {
  const [active, setActive] = useState<"all" | "my">("all");
  const params = useParams();
  const { publicKey, connected } = useWallet();

  const { projectDetail } = useProjectDetail();

  const [state, setState] = useSetState({
    page: 1,
    page_size: 10,
    project_id: params.id,
    wallet: active === "my" ? publicKey?.toBase58() : undefined
  });

  const { data } = useQuery({
    queryKey: ["/pad/auction/history", state],
    queryFn: async () => http.post("/pad/auction/history", state),
    staleTime: 0
  });

  const [items, setItems] = useState<any[]>([]);
  const total = data?.data?.total_page || 0;

  useEffect(() => {
    setItems(data?.data?.data || []);
  }, [data]);

  useEffect(() => {
    if (!projectDetail || projectDetail?.status === "closed") {
      return;
    }
    const source = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/history/events?projectId=${params.id}`
    );
    source.onmessage = (event) => {
      console.log(event);
    };
    // 自定义事件: connected
    source.addEventListener("connected", (e) => {
      console.log(`✅ 连接成功事件: ${e.data}`);
    });

    // 自定义事件: update
    source.addEventListener("update", (e) => {
      try {
        const newItem = JSON.parse(e.data);
        const id = `${newItem.address}_${newItem.date}`;
        if (active === "my") {
          if (!publicKey || newItem.address !== publicKey.toBase58()) {
            return;
          }
        }
        if (state.page > 1) {
          return;
        }

        setItems((prev) => {
          const updated = [{ ...newItem, _highlight: id }, ...prev];
          return updated.slice(0, 10);
        });
        setTimeout(() => {
          setItems((prev) =>
            prev.map((item) =>
              item._highlight === id ? { ...item, _highlight: undefined } : item
            )
          );
        }, 3000);
      } catch (err) {
        console.error("解析更新事件数据失败", err);
      }
    });

    source.onerror = (e) => {
      console.log("❌ 连接错误！");
    };

    return () => {
      source.close();
    };
  }, [active, publicKey, params.id, state.page, projectDetail]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <PrimaryButton
          className={cn(
            "h-9 px-8",
            active !== "all" &&
              "bg-white text-[#121212] hover:bg-[#292929] hover:text-white"
          )}
          onClick={() => {
            setActive("all");
            setState({ wallet: undefined });
          }}
        >
          All
        </PrimaryButton>
        <PrimaryButton
          className={cn(
            "h-9 px-8 ",
            active !== "my" &&
              "bg-white text-[#121212] hover:bg-[#292929] hover:text-white"
          )}
          onClick={() => {
            if (!connected) {
              openModalDirectly(MODAL_HASH_MAP.walletConnect);
              return;
            }
            setActive("my");
            setState({ wallet: publicKey?.toBase58() });
          }}
        >
          My
        </PrimaryButton>
      </div>

      <div className="p-8 rounded-[40px] bg-white flex flex-col gap-2 font-inter min-h-[800px]">
        <h1 className="font-baloo2 text-2xl font-bold">Auction History</h1>
        <div className="grid grid-cols-[157px_136px_111px_105px_100px] px-3 justify-between h-[50px] items-center text-[#727272] border-b border-[#121212]/10">
          <div>Address</div>
          <div>Purchase Amount</div>
          <div>Auction Round</div>
          <div>Auction Price</div>
          <div className="flex justify-end">Date</div>
        </div>

        {match(items)
          .with([], () => <Empty className="mt-[72px]" />)
          .with(P.array(), (items) =>
            items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-[157px_134px_111px_105px_100px] px-3 justify-between h-[50px] items-center text-[#121212]/70 border-b border-[#F6F6F3]",
                  "font-medium text-lg/[22px] hover:bg-[#F6F6F3] rounded-2xl transition-all duration-300",
                  item._highlight && "bg-[#DEF26B80]"
                )}
              >
                <div
                  className={cn("px-2 py-1 rounded-full w-fit")}
                  style={{
                    backgroundColor: getRandomAddressColor(item.address)
                  }}
                >
                  {formatStr(item.address, 4)}
                </div>
                <div>
                  {item.amount} {projectDetail?.token_symbol}
                </div>
                <div>Round {item.round}</div>
                <div className="flex items-center gap-1">
                  {item.price.toFixed(2)}{" "}
                  <img
                    className="size-4 inline-block"
                    src="/images/sonic-token.png"
                    alt="sonic-token"
                  />
                </div>
                <div className="flex justify-end">
                  {formatTimeAgo(item.date)}
                </div>
              </div>
            ))
          )
          .run()}
      </div>

      {total > 0 && (
        <Pagination
          initialPage={state.page - 1}
          onPageChange={({ selected }) => setState({ page: selected + 1 })}
          total={total}
          className="mt-2"
        />
      )}
    </div>
  );
}
