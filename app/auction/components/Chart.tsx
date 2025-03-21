"use client";
import PrimaryButton from "@/app/components/common/PrimaryButton";
import ArrowIcon from "@/app/components/icons/ArrowIcon";
import CloseIcon from "@/app/components/icons/CloseIcon";
import { dataMock } from "@/utils/playground";
import {
  Box,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";
import {
  Bar,
  ComposedChart,
  Label,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";

const options = [
  {
    label: "25%",
    value: 25
  },
  {
    label: "50%",
    value: 50
  },
  {
    label: "100%",
    value: 100
  }
];
export default function Chart() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col gap-6 mb-8 font-inter">
      <div className="h-9 px-8 font-baloo2 font-bold bg-[#121212] text-white w-fit rounded-full flex items-center justify-center">
        chart
      </div>
      <div className="p-8 rounded-[40px] bg-white flex gap-8">
        <div className="w-[658px] h-[428px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={dataMock}
              margin={{
                top: 20,
                right: 13,
                bottom: 20,
                left: 13
              }}
            >
              <defs>
                <pattern
                  id="diagonalHatch"
                  patternUnits="userSpaceOnUse"
                  width="8" // 斜线间距
                  height="8"
                  patternTransform="rotate(45)" // 斜线角度
                >
                  {/* 背景矩形，填充绿色 */}
                  <rect
                    x="0"
                    y="0"
                    width="8"
                    height="8"
                    fill="#121212"
                    fillOpacity={0.1} // 绿色背景
                  />
                  {/* 白色斜线 */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    strokeOpacity={0.3}
                    stroke="#fff" // 斜线颜色
                    strokeWidth="2" // 斜线粗细
                  />
                </pattern>
              </defs>
              <XAxis
                dataKey="Auction_Round"
                axisLine={false} // 隐藏轴线
                tickLine={false}
              >
                <Label
                  value="Auction Rounds"
                  offset={-10}
                  position="insideBottom"
                  className="font-inter"
                  style={{ fill: "#000", fontSize: 12 }}
                />
              </XAxis>
              <Tooltip />
              <Bar
                dataKey="Sales_Ratio"
                barSize={65}
                radius={20}
                yAxisId={0}
                shape={(props) => {
                  const { x, y, width, height } = props;

                  return (
                    <g>
                      {/* 背景柱 - 高度固定为1 */}
                      {props.value < 1 && (
                        <rect
                          x={x}
                          y={79.6667}
                          width={width}
                          height={298}
                          fill="url(#diagonalHatch)"
                          rx={20}
                          ry={20}
                        />
                      )}
                      {/* 前景柱 */}
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={Number(props.value) > 1 ? "#DEF26B" : "#D6BEF2"}
                        rx={20}
                        ry={20}
                      />

                      {/* 背景柱 - 高度固定为1 */}
                      {props.value >= 1 && (
                        <rect
                          x={x}
                          y={79.6667}
                          width={width}
                          height={298}
                          fill="url(#diagonalHatch)"
                          rx={20}
                          ry={20}
                        />
                      )}
                    </g>
                  );
                }}
              >
                <LabelList
                  dataKey="Sales_Ratio_Percentage"
                  position="insideTop"
                  style={{ fill: "#121212", fontSize: 12 }}
                  offset={10}
                />
              </Bar>
              <Line
                dataKey="Actual_Price"
                yAxisId={1}
                fill="#FF9011"
                stroke="#FF9011"
                strokeWidth={4}
                type={"monotone"}
                dot={{
                  stroke: "#FF9011",
                  strokeWidth: 2,
                  r: 4,
                  fill: "#FF9011"
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-8 grow">
          <div className="flex flex-col gap-4">
            <p className="font-medium">
              Current Auction Price: <span className="font-bold"> $0.16</span>
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#7500FF]">$0.14</span>
                <span className="text-[#FF9011]">$0.28</span>
              </div>
              <div className="h-3 bg-[#F6F6F3] rounded-full">
                <Box
                  bg={"linear-gradient(90deg, #C59AFC 0%, #FFB056 100%)"}
                  className="h-full rounded-full"
                  w={"50%"}
                ></Box>
              </div>
              <div className="flex justify-between text-xs text-[#666]">
                <span>100,000</span>
                <span>100,000</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-base/[1.2]">Your Bid Amount</p>
            <div className="bg-[#F6F6F3] rounded-2xl relative">
              <Input
                className="h-14 border border-[#121212] rounded-2xl placeholder:text-[#121212]/20 focus:outline-none pr-32"
                placeholder="0.00"
              />
              <Popover
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                trigger="hover"
                placement="bottom-end"
              >
                <PopoverTrigger>
                  <div className="z-10 h-10 px-3 flex items-center justify-center my-auto absolute top-0 bottom-0 right-2 bg-white rounded-[10px] cursor-pointer">
                    <p className="font-semibold">SONIC</p>
                    <img
                      src="/images/sonic-token.png"
                      alt="sonic"
                      className="w-4 h-4 ml-2 mr-1"
                    />
                    <ArrowIcon className="size-5 rotate-90" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  _focusWithin={{ border: "none" }}
                  boxShadow={"0px 0px 16px 0px rgba(68, 68, 68, 0.25)"}
                  className="w-[369px] outline-none -mr-2 mt-2 px-0 py-8 border-none rounded-[32px] bg-white overflow-scroll"
                >
                  <Box className="flex flex-col">
                    <div className="flex items-center justify-between px-8">
                      <p className="font-baloo2 font-bold text-xl">
                        Select Token
                      </p>
                      <CloseIcon
                        className="size-4 cursor-pointer"
                        onClick={onClose}
                      />
                    </div>
                    <div className="flex flex-col mt-6">
                      <div
                        onClick={() => {
                          onClose();
                        }}
                        className="px-8 flex items-center gap-2 h-14 hover:bg-[#F6F6F3] cursor-pointer"
                      >
                        <img
                          src="/images/sonic-token.png"
                          alt="sonic"
                          className="size-8"
                        />
                        <p className="font-semibold">SONIC</p>
                        <p className="ml-auto">247,899,872.994</p>
                      </div>
                    </div>
                  </Box>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-[18px] text-sm font-medium py-1 border border-[#E1E1E1] rounded-full cursor-pointer"
                >
                  {option.label}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#121212]/70 mt-3">Gas: 0.00 SOL</p>
          </div>

          <div className="mt-auto flex flex-col gap-8">
            <p className="text-center font-medium">Total: 0.00 SOL</p>
            <PrimaryButton className="">Buy</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
