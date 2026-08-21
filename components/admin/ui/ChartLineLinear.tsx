"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Views",
    color: "#fff",
    // color: "#6366f1",
  },
} satisfies ChartConfig;

type DateType = {
  startDate: Date;
  endDate: Date;
};

type PageViewType = {
  date: Date;
  views: number;
};

interface LineChartProps {
  dates: DateType;
  title: string;
  dailyPageViewsData: PageViewType[];
}

export function ChartLineLinear({
  dates,
  title,
  dailyPageViewsData,
}: LineChartProps) {
  const startDate = new Date(dates.startDate);
  const endDate = new Date(dates.endDate);
  const formattedStartDate = startDate.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedEndDate = endDate.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const chartData = dailyPageViewsData.map((item) => ({
    date: item.date.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
    }),
    views: item.views,
  }));

  //[
  //     { day: "January", desktop: 186 },
  //     { day: "February", desktop: 305 },
  //     { day: "March", desktop: 237 },
  //     { day: "April", desktop: 73 },
  //     { day: "May", desktop: 209 },
  //     { day: "June", desktop: 214 },
  //   ];

  return (
    <Card className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
        <CardDescription className="text-white">
          {`${formattedStartDate}   -   ${formattedEndDate}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="views"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
