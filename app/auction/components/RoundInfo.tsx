import { http } from "@/utils/http";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Bar,
  ComposedChart,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { match } from "ts-pattern";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function RoundInfo() {
  const params = useParams();
  const { data: roundInfo } = useQuery({
    queryKey: ["/pad/round/info"],
    queryFn: async () => http.get("/pad/round/info", { project_id: params.id })
  });

  const rounds = useMemo(() => {
    return roundInfo?.data?.round_info.map((round) => ({
      ...round,
      radio: Math.max(round.percent, 0.0001) / 100,
      radio_text: round.percent + "%"
    }));
  }, [roundInfo]);

  const lineData = rounds?.map((round, index) => {
    const actualValue = round.price.value === "0" ? null : +round.price.value;

    let dashValue = null;
    if (rounds[index + 1]?.price.value === "0") {
      dashValue = round.price.value;
    } else if (rounds[index + 1]?.price.value == null && round.price.max != 0) {
      dashValue = ((round.price.max + round.price.min) / 2).toFixed(2);
    } else {
      dashValue = null;
    }

    return {
      actual: actualValue,
      dash: dashValue,
      max: round.price.max,
      min: round.price.min,
      isDash: dashValue !== null
    };
  });

  return (
    <div className="w-[658px] h-[428px] flex flex-col items-center justify-center">
      <div className="w-full px-8 h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={lineData}>
            <Tooltip
              content={(props) => {
                if (props.active && props.payload[0]) {
                  const value = Number(props.payload[0]?.value);
                  const max = Number(props.payload[0]?.payload.max);
                  const min = Number(props.payload[0]?.payload.min);
                  const isDash = props.payload[0]?.payload.isDash;
                  return (
                    <Box
                      bgColor={"rgba(222, 242, 107, 0.50)"}
                      boxShadow={"0px 0px 20px 0px rgba(181, 193, 114, 0.50)"}
                      backdropFilter={"blur(20px)"}
                      className="border border-[#DEF26B] py-2 px-4 rounded-2xl"
                    >
                      {match(isDash)
                        .with(false, () => <p>Price: {value.toFixed(2)}</p>)
                        .otherwise(() => (
                          <>
                            {" "}
                            <p>Max: {max.toFixed(2)}</p>
                            <p>Min: {min.toFixed(2)}</p>
                          </>
                        ))}
                    </Box>
                  );
                }
              }}
            />
            <YAxis
              yAxisId={0}
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
              axisLine={false} // 隐藏轴线
              tickLine={false} // 隐藏刻度线
              tick={false}
              width={0}
            />
            <Line
              type="monotone"
              dataKey="actual"
              fill="#FF9011"
              stroke="#FF9011"
              strokeWidth={4}
              dot={{
                stroke: "#FF9011",
                strokeWidth: 2,
                r: 4,
                fill: "#FF9011"
              }}
            />
            <Line
              type="monotone"
              dataKey="dash"
              fill="#FF9011"
              stroke="#FF9011"
              strokeWidth={4}
              dot={{
                stroke: "#FF9011",
                strokeWidth: 2,
                r: 4,
                fill: "#FF9011"
              }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart width={500} height={400} data={rounds}>
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
              yAxisId={0}
              domain={[0, 1.5]} // 设置范围从 0 到 2
              axisLine={false} // 隐藏轴线
              tickLine={false} // 隐藏刻度线
              tick={false}
              width={0}
            />
            <Tooltip
              content={(props) => {
                if (props.active && props.payload[0]?.value) {
                  return (
                    <Box
                      bgColor={"rgba(222, 242, 107, 0.50)"}
                      boxShadow={"0px 0px 20px 0px rgba(181, 193, 114, 0.50)"}
                      backdropFilter={"blur(20px)"}
                      className="border border-[#DEF26B] py-2 px-4 rounded-2xl"
                    >
                      <p>
                        Sales Ratio:{" "}
                        {Math.round(Number(props.payload[0]?.value) * 100) +
                          "%"}
                      </p>
                    </Box>
                  );
                }
              }}
            />

            <Bar
              dataKey="radio"
              barSize={"50%"}
              yAxisId={0}
              shape={(props) => {
                const { x, y, width, height, value } = props;
                const fullHeight = height / value;

                return (
                  <g>
                    {value <= 1 && (
                      <rect
                        x={x}
                        y={y + height - fullHeight}
                        width={width}
                        height={fullHeight}
                        opacity={0.7}
                        fill="url(#diagonalHatch)"
                        rx={8}
                        ry={8}
                      />
                    )}
                    <rect
                      x={x}
                      y={y + height - height}
                      width={width}
                      height={height}
                      fill={Number(value) > 1 ? "#DEF26B" : "#D6BEF2"}
                      rx={8}
                      ry={8}
                    />
                    {value > 1 && (
                      <rect
                        x={x}
                        y={y + height - fullHeight}
                        width={width}
                        height={fullHeight}
                        opacity={0.4}
                        fill="url(#diagonalHatch)"
                        rx={8}
                        ry={8}
                      />
                    )}
                  </g>
                );
              }}
            >
              <LabelList
                dataKey={(props) => {
                  const value = Number(props.radio_text.replace("%", ""));
                  return value > 20 ? props.radio_text : "";
                }}
                position="insideTop"
                style={{ fill: "#121212", fontSize: 12 }}
                offset={10}
              />
              <LabelList
                dataKey={(props) => {
                  const value = Number(props.radio_text.replace("%", ""));
                  return value <= 20 ? props.radio_text : "";
                }}
                position="insideBottom"
                style={{ fill: "#121212", fontSize: 12 }}
                offset={10}
              />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-center">Auction Rounds</p>
      </div>
    </div>
  );
}
