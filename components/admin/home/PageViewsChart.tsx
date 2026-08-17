"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPageViews } from "@/actions/dashboard";
import { ChartLineLinear } from "../ui/ChartLineLinear";

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

const ranges = ["7", "30", "90"] as const;

type Range = (typeof ranges)[number];

const PageViewsChart = () => {
  const [startRange, setStartRange] = useState<Range>("30");
  const [dates, setDates] = useState<DateType | null>();
  const [data, setData] = useState<PageViewType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);

      try {
        const result = await getPageViews({ startDate: startRange });

        if (result.success) {
          setData(result.dailyPageViewsData || []);
          setDates(result.dates);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [startRange]);

  return (
    <div>
      {data && dates && (
        <>
          <div className="flex justify-end mb-2">
            <Select
              value={startRange}
              onValueChange={(value) => {
                if (value) {
                  setStartRange(value as "7" | "30" | "90");
                }
              }}
            >
              <SelectTrigger className="w-35 rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ChartLineLinear
            title="Page Views by Dates"
            dates={dates}
            dailyPageViewsData={data || []}
          />
        </>
      )}
    </div>
  );
};

export default PageViewsChart;
