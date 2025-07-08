import { cn } from "@/utils";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const logoMap = {
  twitter: "/images/activity/x.svg",
  discord: "/images/activity/discord.svg",
  telegram: "/images/activity/tg.svg",
  medium: "/images/activity/medium.svg"
};

export default function Card({ data }: { data: any }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/auction/${data.id}`)}
      className="py-5 pl-5 pr-8 rounded-[40px] bg-white flex items-center gap-10 hover:bg-[#ECECEC] cursor-pointer transition-colors group/card"
    >
      <img
        className="h-[320px] w-[535px] rounded-[50px] shrink-0"
        src={data.image}
        alt=""
      />

      <div className="flex flex-col gap-6 grow">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 w-full">
            <img
              className="size-14 rounded-full"
              src={data?.token?.icon}
              alt=""
            />
            <span className="text-2xl font-bold font-baloo2">{data.name}</span>
            <div className="flex items-center gap-2 ml-auto">
              {data.whitelist_only && (
                <span className="px-4 py-2.5 rounded-full bg-[#FFF1E5] font-semibold text-[#121212]">
                  Whitelist Only
                </span>
              )}
              <div
                className={cn(
                  "py-2.5 px-4 bg-[#DEF26B] rounded-full cursor-pointer font-semibold capitalize",
                  data.status === "closed" && "bg-[#F5F5F7]"
                )}
              >
                {data.status}
              </div>
            </div>
          </div>
          <div className="text-[#666] text-sm/[1.2] font-inter">
            {data.description}
          </div>
          <div className="flex items-center gap-2">
            {data?.social?.map((social) => (
              <a
                key={social.type}
                href={social.account}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="size-6 rounded-full"
              >
                <img
                  className="size-6 rounded-full"
                  src={logoMap[social.type]}
                  alt=""
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-2xl/[1.2] font-bold">Sale Progress</span>
              <span className="text-[#7E67FF] text-2xl/[1.2] font-semibold">
                {data.progress}%
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#ECECEC] group-hover/card:bg-white">
              <Box
                bg={"linear-gradient(90deg, #C49AFF 0%, #FFB055 100%)"}
                width={data.progress + "%"}
                className="rounded-full h-full"
              ></Box>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <img src="/images/activity/up.svg" alt="" />
                <span>Amount for Sale</span>
              </div>
              <div className="font-baloo2 font-semibold text-[28px]/[1.1]">
                {data.amount}{" "}
                <span className="text-base">{data.token.symbol}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <img src="/images/activity/price.svg" alt="" />
                <span>Price</span>
              </div>
              <div className="font-baloo2 font-semibold text-[28px]/[1.1]">
                {data.price} <span className="text-base">$SONIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
