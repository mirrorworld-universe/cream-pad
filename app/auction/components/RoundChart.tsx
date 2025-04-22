"use client";
import { formatChartData } from "@/utils";
import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import {
  Bar,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// 自定义 Tooltip 组件
const CustomTooltip = ({ active, payload, currentRound }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const originalPercent = data._originalPercent;
  const percent = originalPercent
    ? `${Math.round(originalPercent * 100)}%`
    : "0%";
  const solidPrice = data._originalSolidPrice;
  const dottedPrice = data._originalDottedPrice;
  const isCurrentRound = data.round === currentRound;
  const priceMin = data._priceMin;
  const priceMax = data._priceMax;

  return (
    <Box
      bgColor={"rgba(222, 242, 107, 0.50)"}
      boxShadow={"0px 0px 20px 0px rgba(181, 193, 114, 0.50)"}
      backdropFilter={"blur(20px)"}
      className={`border ${
        isCurrentRound ? "border-[#FF9011]" : "border-[#DEF26B]"
      } py-2 px-4 rounded-2xl text-[#121212]`}
    >
      <p className="flex items-center">
        <span>{`Round: ${data.round}`}</span>
      </p>
      <p>{`Sales Ratio: ${percent}`}</p>
      {solidPrice && <p>{`Price: $${solidPrice.toFixed(2)}`}</p>}

      {/* 显示下一轮价格 */}
      {dottedPrice != null && !isCurrentRound && (
        <div className="mt-1 flex flex-col gap-1">
          <span>{`Min: $${priceMin.toFixed(2)}`}</span>
          <span>{`Max: $${priceMax.toFixed(2)}`}</span>
        </div>
      )}
    </Box>
  );
};

const RoundChart = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentRound = data?.current_round;

  useEffect(() => {
    // 只有在data有效时才处理数据
    if (data && data.round_info && data.round_info.length > 0) {
      console.log("Processing data:", data);
      const formattedData = formatChartData(data);
      console.log("Formatted data:", formattedData);
      setChartData(formattedData);
    } else {
      console.warn("Invalid data provided to RoundChart:", data);
      setChartData([]);
    }
  }, [data]);

  // Scroll to current round when data is loaded
  useEffect(() => {
    if (chartData.length > 0 && scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const itemWidth = 80; // Width per item/round

      // Calculate position that centers the current round in the viewport
      const currentRoundPosition = (currentRound - 1) * itemWidth;
      const scrollPosition =
        currentRoundPosition - containerWidth / 2 + itemWidth / 2;

      // Ensure we don't scroll past the edges
      const chartWidth = Math.max(chartData.length * itemWidth, 658);
      const maxScroll = Math.max(0, chartWidth - containerWidth);
      const safeScrollPosition = Math.max(
        0,
        Math.min(scrollPosition, maxScroll)
      );

      scrollContainerRef.current.scrollLeft = safeScrollPosition;
    }
  }, [chartData, currentRound]);

  const maxPriceValue = Math.max(
    ...(chartData.map((item) => item.solidPrice).filter(Boolean) || [0]),
    ...(chartData.map((item) => item.dottedPrice).filter(Boolean) || [0])
  );

  // 转换数据，确保线图在柱状图上方显示（不重叠）
  // 使线图的值相对于柱状图的最大值加一个百分比偏移
  const maxPercentForDisplay = 1.8; // 限制百分比最大显示值，超过的部分会被截断但显示标签
  const offset = 0.2; // 固定偏移量，保持价格线与柱状图的距离

  const sourceData = data;

  // 手动计算当前轮次和下一轮次的dottedPrice
  const transformedData = chartData.map((item) => {
    // 找到对应的原始轮次数据，获取min和max价格
    const originalRoundInfo = sourceData.round_info.find(
      (round) => round.round === item.round
    );

    // 保存原始百分比值用于标签显示
    const originalPercent = item.percent / 100;

    // 限制柱状图高度，确保不会太高
    const displayPercent = Math.min(originalPercent, maxPercentForDisplay);

    // 确定是否是当前轮次或下一轮次
    const isCurrentRound = item.round === currentRound;

    // 重新定义下一轮的判断逻辑，避免循环依赖
    const isNextRound = Number(item.round) === Number(currentRound) + 1;

    // 手动设置虚线价格
    let dotPrice = null;

    // 简化逻辑，确保当前轮和下一轮始终显示虚线价格
    if (isCurrentRound || isNextRound) {
      // 修复当value为'0'的情况，确保显示虚线
      // 使用原始价格对象的value，不进行parseFloat转换，避免'0'变成0被认为是假值
      const priceValue = originalRoundInfo?.price.value;

      // 即使价格是0也要显示虚线
      dotPrice = priceValue ? parseFloat(priceValue) : 0;
    }

    // 线图数据，将其值平移到柱状图最大值之上
    return {
      ...item,
      // 保留原始价格和百分比，用于tooltip和标签显示
      _originalSolidPrice: item.solidPrice,
      _originalDottedPrice: dotPrice,
      _originalPercent: originalPercent,
      _currentRound: currentRound, // 保存当前轮次信息用于tooltip
      // 保存价格区间信息
      _priceMin: originalRoundInfo?.price.min,
      _priceMax: originalRoundInfo?.price.max,
      // 限制百分比显示，但保证最小有一定高度
      percent: Math.max(displayPercent, 0.0001),
      // 转换后的价格，用于绘图，确保在柱状图顶部上方
      solidPrice: item.solidPrice
        ? maxPercentForDisplay +
          offset +
          (item.solidPrice / maxPriceValue) * 0.8
        : null,
      // 手动计算虚线价格 - 修复为0的情况
      dottedPrice:
        dotPrice !== null
          ? maxPercentForDisplay +
            offset +
            (dotPrice / (maxPriceValue || 1)) * 0.8
          : null
    };
  });

  // 如果没有数据，显示加载状态
  if (!data || !chartData.length || isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto" ref={scrollContainerRef}>
      <ResponsiveContainer
        width={Math.max(transformedData.length * 80, 658)}
        height={400}
      >
        <ComposedChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <pattern
              id="diagonalHatch"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
              patternTransform="rotate(45)"
            >
              <rect x="0" y="0" width="8" height="8" fill="#E5E5E5" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <XAxis dataKey="round" axisLine={false} tickLine={false}></XAxis>

          <YAxis
            tick={false}
            axisLine={false}
            domain={[0, 3.0]} // 增加Y轴范围，确保有足够空间显示价格线
          />

          <Tooltip content={<CustomTooltip currentRound={currentRound} />} />

          <Bar
            dataKey="percent"
            barSize={55}
            yAxisId={0}
            shape={(props) => {
              const { x, y, width, height, value, payload } = props;
              const fullHeight = height / value;
              const isCurrentRound = payload.round === currentRound;
              // Stroke adjustment for the current round
              const strokeOffset = isCurrentRound ? 1 : 0;

              return (
                <g>
                  {value <= 1 && (
                    <rect
                      x={x - strokeOffset}
                      y={y + height - fullHeight - strokeOffset}
                      width={width + strokeOffset * 2}
                      height={fullHeight + strokeOffset * 2}
                      opacity={0.7}
                      fill="url(#diagonalHatch)"
                      rx={8}
                      ry={8}
                      stroke={isCurrentRound ? "#FF9011" : "none"}
                      strokeWidth={isCurrentRound ? 2 : 0}
                    />
                  )}
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={Number(value) > 1 ? "#DEF26B" : "#D6BEF2"}
                    rx={8}
                    ry={8}
                    stroke="none"
                    strokeWidth={0}
                  />
                  {value > 1 && (
                    <rect
                      x={x - strokeOffset}
                      y={y + height - fullHeight - strokeOffset}
                      width={width + strokeOffset * 2}
                      height={fullHeight + strokeOffset * 2}
                      opacity={0.4}
                      fill="url(#diagonalHatch)"
                      rx={8}
                      ry={8}
                      stroke={isCurrentRound ? "#FF9011" : "none"}
                      strokeWidth={isCurrentRound ? 2 : 0}
                    />
                  )}
                </g>
              );
            }}
          >
            {/* 较高柱子的标签（显示在柱子内部顶部） */}
            <LabelList
              dataKey={(entry) =>
                entry._originalPercent >= 0.4
                  ? `${Math.round(entry._originalPercent * 100)}%`
                  : ""
              }
              position="insideTop"
              style={{ fill: "#121212", fontSize: 12 }}
              offset={10}
            />
            {/* 较低柱子的标签（显示在柱子上方） */}
            <LabelList
              dataKey={(entry) =>
                entry._originalPercent < 0.4
                  ? `${Math.round(entry._originalPercent * 100)}%`
                  : ""
              }
              position="top"
              style={{ fill: "#121212", fontSize: 12 }}
              offset={5}
            />
          </Bar>
          {/* 虚线（当前和下一轮价格） */}
          <Line
            dataKey="dottedPrice"
            stroke="#a0a0a0"
            strokeDasharray="3 3"
            name="Current/Next Price"
            strokeWidth={2}
            dot={{ r: 5, fill: "#fff", stroke: "#a0a0a0" }}
            connectNulls
          />

          {/* 实线（历史价格） */}
          <Line
            dataKey="solidPrice"
            stroke="#FF9011"
            name="Historical Price"
            strokeWidth={4}
            dot={{ r: 5, fill: "#FF9011" }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoundChart;
