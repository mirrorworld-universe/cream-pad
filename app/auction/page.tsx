"use client";
import AuctionCard from "./components/AuctionCard";
import Pagination from "../components/common/Pagination";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { useSetState } from "react-use";

export default function Home() {
  const [params, setParams] = useSetState({
    page: 1,
    page_size: 4
  });

  const { data } = useQuery({
    queryKey: ["/projects", params],
    queryFn: async () => http.get("/projects", params)
  });

  const items: any[] = data?.data?.data || [];
  const total = data?.data?.total_page || 0;

  return (
    <div className="pb-12 flex flex-col text-[#121212]">
      <Box
        className="h-[460px] w-full"
        bg={"linear-gradient(180deg, #6457FD 0%, #E2A9FE 50%, #FFF1E5 100%);"}
      >
        <img
          className="max-w-view w-full mx-auto"
          src="/images/banner.png"
          alt=""
        />
      </Box>
      <Box
        bg={"linear-gradient(180deg, #FFF1E5 0%, #F6F6F3 100%)"}
        className="h-[100px]"
      ></Box>

      <div className="flex flex-col gap-8 max-w-view px-4 mx-auto w-full -mt-[60px] min-h-[360px]">
        {items.map((item) => (
          <AuctionCard key={item.id} data={item} />
        ))}
      </div>
      <Pagination
        total={total}
        className="mt-8"
        onPageChange={({ selected }) => setParams({ page: selected + 1 })}
        initialPage={params.page - 1}
      />
    </div>
  );
}
