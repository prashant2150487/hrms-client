import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, Sector, Cell } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const Leave = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Card>
				<CardHeader>
					<CardTitle>Pie Chart - Donut Active</CardTitle>
					<CardDescription>January - June 2024</CardDescription>
				</CardHeader>
				<CardContent>
					<PieChart width={300} height={200}>
						<Pie
							data={chartData}
							dataKey="visitors"
							nameKey="browser"
							innerRadius={60}
							outerRadius={80}
							strokeWidth={5}
              
							activeShape={({
								outerRadius = 0,
								...props
							}: PieSectorDataItem) => (
								<Sector {...props} outerRadius={outerRadius + 10} />
							)}
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={`var(--color-${entry.browser})`}
								/>
							))}
						</Pie>
					</PieChart>
				</CardContent>
			</Card>
		</div>
	);
};

export default Leave;
