import { http } from "@/utils/http";
import { dataMock } from "@/utils/playground";
import { Bar, Label, Line, Tooltip, XAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { LabelList, ResponsiveContainer } from "recharts";
import { ComposedChart } from "recharts";
import { useParams } from "next/navigation";
export default function RoundInfo() {
  const params = useParams();
  const { data: roundInfo } = useQuery({
    queryKey: ["/pad/round/info"],
    queryFn: async () => http.get("/pad/round/info", { project_id: params.id })
  });
  return (
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
  );
}
