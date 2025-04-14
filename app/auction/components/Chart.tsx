"use client";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import { useProjectDetail } from "@/app/store";
import { cn } from "@/utils";
import { http } from "@/utils/http";
import { Box, Input } from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { match, P } from "ts-pattern";
import RoundInfo from "./RoundInfo";
import { TokenSelect } from "./TokenSelect";
import { triggerTransaction } from "@/utils/transaction";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { toast } from "@/app/components/common/toast";
const options = [
  {
    label: "25%",
    value: 0.25
  },
  {
    label: "50%",
    value: 0.5
  },
  {
    label: "100%",
    value: 1
  }
];
export default function Chart() {
  const params = useParams();
  const { publicKey, signTransaction } = useWallet();
  const queryClient = useQueryClient();

  const { connection } = useConnection();

  const [currentToken, setCurrentToken] = useState<any>({});

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      amount: 0
    }
  });

  const { mutateAsync: buildTransaction } = useMutation({
    mutationKey: ["/pad/token/buy/build-transaction"],
    mutationFn: async (data: any) =>
      http.post("/pad/token/buy/build-transaction", data)
  });

  const { projectDetail } = useProjectDetail();

  const { data: priceResult } = useQuery({
    queryKey: ["/pad/price", params.id],
    queryFn: async () => http.get("/pad/price", { project_id: params.id })
  });

  const { data: balanceResult } = useQuery({
    queryKey: [`/token/balance`, params.id, currentToken.token_address],
    queryFn: async () =>
      http.get("/token/balance", {
        wallet: publicKey?.toBase58(),
        token_address: currentToken.token_address
      }),
    enabled: !!publicKey && !!currentToken.token_address
  });

  const percentage = useMemo(() => {
    if (priceResult?.data) {
      const max = priceResult.data.next_price.max;
      const realtime = priceResult.data.next_price.realtime;
      const min = priceResult.data.next_price.min;
      const percentage = (realtime - min) / (max - min);
      if (min == 0) {
        return 0.02;
      }
      return +percentage.toFixed(2);
    }
  }, [priceResult]);

  const handleBuy = async () => {
    if (!publicKey) {
      openModalDirectly(MODAL_HASH_MAP.walletConnect);
      return;
    }
    handleSubmit(async (data) => {
      const res: any = await buildTransaction({
        project_id: params.id,
        amount: data.amount,
        payment_token: currentToken.token_address,
        wallet: publicKey?.toBase58()
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      const hash = await triggerTransaction(
        res.data.hash,
        connection,
        signTransaction
      );

      const result = await connection.confirmTransaction({
        signature: hash,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight
      });

      if (result.value.err) {
        toast({
          title: "Transaction failed",
          description: "Please try again",
          status: "error"
        });
      } else {
        toast({
          title: "Transaction successful",
          status: "success"
        });
        const queryKeys = [
          ["/pad/auction/history"],
          ["/pad/round/info"],
          ["/pad/price"],
          ["/token/balance"],
          ["/project/:id"]
        ];
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: key
          });
        });
      }
    })();
  };

  return (
    <div className="flex flex-col gap-6 mb-8 font-inter">
      <div className="h-9 px-8 font-baloo2 font-bold bg-[#121212] text-white w-fit rounded-full flex items-center justify-center">
        Auction Chart
      </div>
      <div className="p-8 rounded-[40px] bg-white flex gap-8">
        <RoundInfo />
        <div className="flex flex-col gap-8 grow">
          <div className="flex flex-col gap-4">
            <div className="font-medium flex flex-col gap-2">
              <p>
                Current Auction Price:{" "}
                <span className="font-bold">
                  ${priceResult?.data?.current_price.toFixed(2)}
                </span>
              </p>
              <p>Next Auction Price: </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="relative h-4">
                <div
                  className="flex justify-between text-xs absolute top-0 text-[#7500FF]"
                  style={{
                    left: `calc(${percentage * 100}% - 20px)`
                  }}
                >
                  $
                  {Math.min(
                    priceResult?.data.next_price.realtime.toFixed(2),
                    priceResult?.data.next_price.max.toFixed(2)
                  )}
                </div>
              </div>
              <div className="h-3 bg-[#F6F6F3] rounded-full">
                <Box
                  bg={"linear-gradient(90deg, #C59AFC 0%, #FFB056 100%)"}
                  className="h-full rounded-full"
                  w={`${Math.min(percentage * 100, 100)}%`}
                />
              </div>
              <div className="flex justify-between text-xs text-[#666]">
                <span>0</span>
                <span>{Math.max(percentage * 100, 100)}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-medium text-base/[1.2]">Your Bid Amount</p>
              {match(balanceResult?.data?.balance)
                .with(P.number, () => (
                  <p className="text-xs">
                    Balance: {balanceResult?.data?.balance}{" "}
                    {currentToken?.token_symbol}
                  </p>
                ))
                .otherwise(() => null)}
            </div>
            <div className="bg-[#F6F6F3] rounded-2xl relative">
              <Input
                className="h-14 border border-[#121212] rounded-2xl placeholder:text-[#121212]/20 focus:outline-none pr-32"
                placeholder="0.00"
                {...register("amount")}
              />
              <TokenSelect
                currentToken={currentToken}
                setCurrentToken={setCurrentToken}
              />
            </div>
            <div className="flex gap-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() =>
                    setValue(
                      "amount",
                      option.value * (balanceResult?.data?.balance || 0)
                    )
                  }
                  className="px-[18px] text-sm font-medium py-1 border border-[#E1E1E1] rounded-full cursor-pointer"
                >
                  {option.label}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#121212]/70 mt-3">Gas: 0.01 SOL</p>
            <p className="text-sm text-[#121212]/70">
              You will get: {watch("amount")} {projectDetail?.token_symbol}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-8">
            {match(projectDetail?.status)
              .with("open", () => (
                <PrimaryButton className="" onClick={handleBuy}>
                  Buy
                </PrimaryButton>
              ))
              .with("closed", () => (
                <div
                  className={cn(
                    "flex items-center justify-center bg-[#E1E1E1] rounded-full h-[50px] text-white cursor-not-allowed font-baloo2 font-bold",
                    "text-2xl"
                  )}
                >
                  Auction Closed
                </div>
              ))
              .otherwise(() => null)}
          </div>
        </div>
      </div>
    </div>
  );
}
