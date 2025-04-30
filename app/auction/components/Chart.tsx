"use client";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import { toast } from "@/app/components/common/toast";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { useProjectDetail } from "@/app/store";
import { cn, refetchQueries, truncateToDecimals } from "@/utils";
import { http } from "@/utils/http";
import { triggerTransaction } from "@/utils/transaction";
import { Box, Divider, Input, Tooltip } from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { match, P } from "ts-pattern";
import CountDownTime from "./CountDown";
import RoundInfo from "./RoundInfo";
import { TokenSelect } from "./TokenSelect";
import InfoIcon from "@/app/components/icons/InfoIcon";
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

  const { connection } = useConnection();
  const { projectDetail } = useProjectDetail();
  const [isLoading, setIsLoading] = useState(false);

  const { data: buyInfo } = useQuery({
    queryKey: ["/pad/round/buy/info", params.id, publicKey?.toBase58()],
    queryFn: async () =>
      http.get("/pad/round/buy/info", {
        project_id: params.id,
        wallet: publicKey?.toBase58()
      }),
    enabled: !!publicKey
  });

  const [currentToken, setCurrentToken] = useState<any>({});

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      amount: undefined
    }
  });

  const { mutateAsync: buildTransaction } = useMutation({
    mutationKey: [
      "/pad/token/buy/build-transaction",
      projectDetail?.token_type
    ],
    mutationFn: async (data: any) =>
      http.post(`/pad/${projectDetail?.token_type}/buy/build-transaction`, data)
  });

  const { data: priceResult } = useQuery({
    queryKey: ["/pad/price", params.id],
    queryFn: async () => http.get("/pad/price", { project_id: params.id })
  });

  const { data: balanceResult } = useQuery({
    queryKey: [`/token/balance`, params.id, currentToken?.token_address],
    queryFn: async () =>
      http.get("/token/balance", {
        wallet: publicKey?.toBase58(),
        token_address: currentToken?.token_address
      }),
    enabled: !!publicKey && !!currentToken?.token_address
  });

  const handleBuy = async () => {
    if (!publicKey) {
      openModalDirectly(MODAL_HASH_MAP.walletConnect);
      return;
    }

    const amount = match(projectDetail?.token_type)
      .with("token", () =>
        truncateToDecimals(watch("amount") / priceResult?.data?.current_price)
      )
      .with("nft", () => watch("amount"))
      .exhaustive();

    if (buyInfo?.data.bought + Number(amount) > buyInfo?.data.buy_limit) {
      toast({
        title: "You have reached the maximum purchase limit",
        status: "error"
      });
      return;
    }

    // 如果是nft，需要确定 amount 是正整数
    if (projectDetail?.token_type === "nft") {
      if (Number(amount) <= 0 || !Number.isInteger(Number(amount))) {
        toast({
          title: "Amount must be a positive integer",
          status: "error"
        });
        return;
      }
    }

    handleSubmit(async (data) => {
      setIsLoading(true);
      try {
        const res: any = await buildTransaction({
          project_id: params.id,
          amount,
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
        setIsLoading(false);

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
          refetchQueries();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="flex flex-col gap-6 mb-8 font-inter">
      <div className="flex items-center justify-between">
        <div className="h-9 px-8 font-baloo2 font-bold bg-[#121212] text-white w-fit rounded-full flex items-center justify-center">
          Auction Chart
        </div>
        <CountDownTime />
      </div>
      <div className="p-8 rounded-[40px] bg-white flex gap-8">
        <RoundInfo />
        <div className="flex flex-col gap-8 grow">
          <AuctionPrice priceResult={priceResult} />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-medium text-base/[1.2]">
                {match(projectDetail?.token_type)
                  .with("token", () => "Your Bid Amount")
                  .with("nft", () => "Your NFT Purchase Amount")
                  .otherwise(() => null)}
              </p>
            </div>
            <div className="bg-[#F6F6F3] rounded-2xl relative">
              <Input
                className="h-14 border border-[#121212] rounded-2xl placeholder:text-[#121212]/20 focus:outline-none pr-32"
                type="number"
                min={projectDetail?.token_type === "nft" ? 1 : undefined}
                step={projectDetail?.token_type === "nft" ? 1 : undefined}
                placeholder={
                  projectDetail == null
                    ? ""
                    : `${projectDetail?.buy_limit} ${projectDetail?.token_symbol} Limited`
                }
                {...register("amount")}
              />
              <div
                className={cn(
                  projectDetail?.token_type === "token" ? "block" : "hidden"
                )}
              >
                <TokenSelect
                  currentToken={currentToken}
                  setCurrentToken={setCurrentToken}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              {projectDetail?.token_type === "token" && (
                <div className="flex gap-2 items-center">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() =>
                        setValue(
                          "amount",
                          Math.min(
                            truncateToDecimals(
                              option.value * (balanceResult?.data?.balance || 0)
                            ),
                            truncateToDecimals(
                              (buyInfo?.data.buy_limit - buyInfo?.data.bought) *
                                priceResult?.data?.current_price
                            )
                          )
                        )
                      }
                      className="px-[18px] text-sm font-medium py-1 border border-[#E1E1E1] rounded-full cursor-pointer"
                    >
                      {option.label}
                    </div>
                  ))}
                  <Tooltip
                    placement="top"
                    hasArrow
                    bg={"white"}
                    className="rounded-[28px] px-4 py-2 w-fit max-w-[250px]"
                    label={
                      <div className="text-xs text-[#121212]">
                        The remaining purchasable amount and the purchase limit
                        for this round.
                      </div>
                    }
                  >
                    <span>
                      <InfoIcon />
                    </span>
                  </Tooltip>
                </div>
              )}

              {match(balanceResult?.data?.balance)
                .with(P.number, () => (
                  <p className="text-xs flex items-center gap-0.5">
                    {balanceResult?.data?.balance} {currentToken?.token_symbol}
                    <img
                      src={currentToken?.token_image}
                      alt=""
                      className="size-[14px]"
                    />
                  </p>
                ))
                .otherwise(() => null)}
            </div>
            <BuyInfo
              currentToken={currentToken}
              priceResult={priceResult}
              watch={watch}
              buyInfo={buyInfo}
            />
          </div>
          <ActionButton handleBuy={handleBuy} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  handleBuy,
  isLoading
}: {
  handleBuy: () => void;
  isLoading: boolean;
}) {
  const { projectDetail } = useProjectDetail();
  return (
    <div className="mt-auto flex flex-col gap-8">
      {match(projectDetail?.status)
        .with("open", () => (
          <PrimaryButton
            loadingText={<span className="font-baloo2 text-2xl">loading</span>}
            isLoading={isLoading}
            className=""
            onClick={handleBuy}
          >
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
  );
}

function AuctionPrice({ priceResult }: { priceResult: any }) {
  const percentage = useMemo(() => {
    if (priceResult?.data) {
      const percent = priceResult.data.current_round.percent / 100;
      return +percent.toFixed(2);
    }
  }, [priceResult]);
  return (
    <div className="flex flex-col">
      <div className="font-medium flex flex-col gap-2">
        <p>
          Current Auction Price:{" "}
          <span className="font-bold">
            ${priceResult?.data?.current_price.toFixed(2)}
          </span>
        </p>
        <p>Next Auction Price: </p>
      </div>
      <div className="flex flex-col gap-1 pt-5">
        <div className="flex items-center gap-2 w-full relative">
          <span className="text-xs text-[#666]">0%</span>
          <div className="h-3 bg-[#F6F6F3] rounded-full grow relative">
            <div
              className="flex justify-between text-xs absolute -top-5 text-[#7500FF]"
              style={{
                left: `calc(${percentage * 100}% - 10px)`
              }}
            >
              $
              {Math.min(
                priceResult?.data.next_price.realtime.toFixed(2),
                priceResult?.data.next_price.max.toFixed(2)
              )}
            </div>
            <Box
              bg={"linear-gradient(90deg, #C59AFC 0%, #FFB056 100%)"}
              className="h-full rounded-full"
              w={`${Math.min(percentage * 100, 100)}%`}
            />
          </div>
          <div className="text-xs text-[#666] flex flex-col">
            <span className="text-[#FF9011]">
              ${priceResult?.data.next_price.max.toFixed(2)}
            </span>
            {Math.max(percentage * 100, 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyInfo({
  currentToken,
  priceResult,
  watch,
  buyInfo
}: {
  currentToken: any;
  priceResult: any;
  watch: any;
  buyInfo: any;
}) {
  const { projectDetail } = useProjectDetail();
  const { connected } = useWallet();

  return (
    <div className="flex flex-col gap-2 text-xs text-[#121212]/70 mt-4">
      <p className="text-sm flex justify-between">
        <span>Bid Limit: </span>

        <span>
          {projectDetail?.buy_limit} {projectDetail?.token_symbol} / Round (
          {truncateToDecimals(
            projectDetail?.buy_limit * priceResult?.data?.current_price
          )}{" "}
          {currentToken?.token_symbol})
        </span>
      </p>
      {connected && (
        <p className="text-sm flex justify-between">
          Available This Round:{" "}
          <span>
            <span className="text-[#FF9011]">
              {buyInfo?.data.buy_limit - buyInfo?.data.bought}
            </span>{" "}
            {projectDetail?.token_symbol}
          </span>
        </p>
      )}
      <p className="text-sm flex justify-between">
        Pay Amount:{" "}
        <span>
          <span className="text-[#FF9011]">
            {match(projectDetail?.token_type)
              .with("token", () => watch("amount"))
              .with(
                "nft",
                () => watch("amount") * priceResult?.data?.current_price
              )
              .otherwise(() => 0)}
          </span>{" "}
          {currentToken?.token_symbol}
        </span>
      </p>
      <p className="text-base font-medium flex justify-between">
        You will get:{" "}
        <span>
          {match(projectDetail?.token_type)
            .with("token", () =>
              truncateToDecimals(
                +watch("amount") / priceResult?.data?.current_price
              )
            )
            .with("nft", () => watch("amount") || 0)
            .otherwise(() => 0)}{" "}
          {projectDetail?.token_symbol}
        </span>
      </p>
    </div>
  );
}
