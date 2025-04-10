import { http } from "@/utils/http";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Bar,
  ComposedChart,
  Label,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

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

  return (
    <div className="w-[658px] h-[428px] flex flex-col items-center justify-center">
      <div className="w-full px-8 h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={rounds}
            margin={{
              top: 5,
              right: 80,
              left: 80,
              bottom: 5
            }}
          >
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
                      <p>Price: {props.payload[0]?.value}</p>
                    </Box>
                  );
                }
              }}
            />
            <Line
              dataKey="price.value"
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
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={rounds}
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
            <XAxis dataKey="round" axisLine={false} tickLine={false}>
              <Label
                value="Auction Rounds"
                offset={-20}
                position="insideBottom"
                className="font-inter"
                style={{ fill: "#000", fontSize: 12 }}
              />
            </XAxis>
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
              barSize={65}
              radius={20}
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
      </div>
    </div>
  );
}
