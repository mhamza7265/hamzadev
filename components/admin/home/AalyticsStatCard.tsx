"use client";

import { AnalyticsEventName } from "@/generated/prisma/enums";
import { AnalyticsData } from "@/types/types";
import { motion } from "framer-motion";

type AnalyticsItem =
  | { referrer: string | null; count: number }
  | { event: AnalyticsEventName; count: number }
  | { device: string | null; count: number }
  | { country: string | null; count: number }
  | { project: string | null; count: number };

interface StatCardProps {
  title: string;
  analytics: AnalyticsItem[];
  index: number;
}
("eventCounts");
("devices");
("countries");
("projectClick");

const formateTitle = (title: string) => {
  switch (title) {
    case "referrers":
      return "Referrers";
    case "eventCounts":
      return "Event Counts";
    case "devices":
      return "Devices";
    case "projectClick":
      return "Project Clicks";
    case "countries":
      return "Countries";
  }
};

const AnalyticsStatCard = ({ title, analytics, index }: StatCardProps) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
    >
      <p className="text-sm font-medium text-slate-400 border-b border-slate-600 w-full pb-2">
        {formateTitle(title)}
      </p>
      <div>
        {analytics.map((item) => {
          const labelKey = Object.keys(item).find((key) => key !== "count");
          const label = labelKey ? item[labelKey as keyof typeof item] : null;

          return (
            <div key={String(label)} className="flex justify-between">
              <span>{label}</span>
              <span>{item.count}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AnalyticsStatCard;
