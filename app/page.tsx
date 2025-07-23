"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./components/common/PrimaryButton";
import Link from "next/link";
import { whitepaper } from "./data/auctions";
import FallingBall from "./components/common/FallingBall";
import { useEffect } from "react";

const tabs = [
  {
    label: "Whitepaper",
    href: whitepaper,
    target: "_blank"
  },
  {
    label: "Playground",
    href: "/playground",
    target: "_blank"
  }
];

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const eyes = document.querySelectorAll(".eye");

    const handleMouseMove = (e: MouseEvent) => {
      eyes.forEach((eye) => {
        const pupil: any = eye.querySelector(".pupil");
        const rect = eye.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        // 椭圆限制范围
        const rx = 25;
        const ry = 15;

        const angle = Math.atan2(dy, dx);
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Box
      bg={"url(/images/bg.png) no-repeat"}
      style={{
        backgroundSize: "100% 100%", // 第一层图片宽度铺满，第二层渐变全屏
        backgroundPosition: "bottom, center" // 图片底部对齐，渐变居中
      }}
      className="w-full h-screen relative bg-cover flex items-center justify-between min-w-[1280px] overflow-x-auto"
    >
      <div className="fixed z-20">
        <FallingBall />
      </div>
      <div className="flex items-center justify-between min-w-[1280px] max-w-[1440px] w-full mx-auto h-full relative">
        <img
          onClick={() => router.push("/")}
          className="h-10 absolute top-5 left-20"
          src="/images/logo-cream-pad.svg"
          alt=""
        />
        <div className="absolute z-30 left-0 right-0 w-fit h-auto mx-auto top-6 font-baloo2 font-bold flex items-center gap-10">
          {tabs.map((tab) => (
            <Link
              href={tab.href}
              target={tab.target}
              key={tab.label}
              className="text-white bg-[#121212] rounded-full px-6 py-2 no-underline hover:bg-[#292929] transition-all duration-300 hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className="ml-20 flex flex-col gap-[50px]">
          <img className="w-[672px]" src="/images/welcome.png" alt="" />
          <PrimaryButton
            id="action-button"
            onClick={() => router.push("/auction")}
            className="h-[66px] w-[414px] text-[32px]/normal border-none gap-4 font-baloo2 relative z-30"
          >
            <img src="/images/action.svg" alt="" />
            Auction Now
          </PrimaryButton>
        </div>
        <div className="absolute right-0 top-0 w-[636px] h-[740px]">
          <div className="relative">
            <div className="absolute top-[254px] left-[50px] z-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="363"
                height="330"
                viewBox="0 0 363 330"
                fill="none"
                style={{ mixBlendMode: "multiply" }}
                className="absolute"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M337.086 224.216C335.017 235.4 331.333 245.986 326.816 255.296C319.97 269.402 309.406 284.251 295.058 294.02C261.641 316.773 227.653 317.262 203.174 313.46C193.247 311.919 184.467 309.606 177.965 307.758C175.049 310.44 171.929 313.522 169.011 316.545C148.071 338.244 108.644 333.578 97.0391 299.814C96.7536 298.983 96.4679 298.143 96.1828 297.296C91.2724 296.785 86.1012 296.042 80.8092 294.983C63.1409 291.447 39.9779 283.574 21.8566 264.717C1.33858 243.366 -1.59645 216.692 0.626878 197.011C1.68719 187.625 3.96774 178.817 6.74727 171.054C3.54118 160.848 1.55996 148.504 3.01707 135.026C6.58048 102.066 25.0764 79.355 42.854 65.4383C53.5546 57.0615 64.9782 51.0155 75.3098 46.8923C87.3734 28.8751 108.316 12.3733 141.419 4.24024C203.329 -10.9702 249.316 19.9101 271.903 44.386C299.347 52.1737 321.462 65.3035 337.284 84.1342C355.795 106.165 362.28 131.923 362.688 155.239C363.228 186.178 350.031 209.641 337.086 224.216Z"
                    fill="rgba(113, 59, 148, 0.8)"
                  />
                </g>
              </svg>
              <img src="/images/cloud.svg" alt="" className="relative z-20" />
              <div className="eye left">
                <div className="pupil"></div>
              </div>
              <div className="eye right">
                <div className="pupil"></div>
              </div>
            </div>
            <img
              className="size-full relative z-20"
              src="/images/cloud-bg.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
