import { Pie, PieChart, Sector } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
export const description = "A donut chart with an active sector";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "#4285F4" },
  { browser: "safari", visitors: 200, fill: "#9CA3AF " },
  { browser: "firefox", visitors: 187, fill: "#9CA3AF " },
  { browser: "edge", visitors: 173, fill: "#9CA3AF " },
  { browser: "other", visitors: 90, fill: "#9CA3AF " },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;
export function Chart() {
  return (
    <div className="bg-white rounded-2xl w-sm  shadow px-2 py-5">
      <h3 className="text-xl font-semibold text-gray-800 text-start pl-4">Casual/Sick Leave</h3>
      <div className="flex gap-1 justify-around">
        <div className=" pb-0 s">
          <ChartContainer
            config={chartConfig}
            className="aspect-square w-[160px] h-[160px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
               
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={40}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col item-start gap-4 justify-center">
          <div className="flex items-start gap-3">
            <div className=" mt-2 w-4 h-4 rounded-full border border-gray-500"></div>
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-sm text-gray-800 font-bold">Availble</h1>
              <h1 className="text-sm text-gray-800">5</h1>
            </div>
          </div>
          <div className="flex items-start gap-3">
          <div className=" mt-2 w-4 h-4 rounded-full border border-gray-500"></div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm text-gray-800 font-bold">Availble</h1>
            <h1 className="text-sm text-gray-800">2</h1>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Chart;
