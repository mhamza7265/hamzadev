"use client";

import { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import AnalyticsSettings from "./AnalyticsSettings";
import SecuritySettings from "./SecuritySettings";

type SettingsTabsProps = {
  settings: {
    id: string;
    publicSiteTitle: string;
    publicSiteDescription: string;
    siteUrl: string;
    adminTitle: string;
    adminDescription: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    canonicalUrl: string;
    ogImageUrl: string;
    analyticsRetentionDays: number;
  } | null;

  purgeCount: number;
};

const SettingsTabs = ({ settings, purgeCount }: SettingsTabsProps) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto border-b border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`cursor-pointer whitespace-nowrap px-5 py-3 text-sm font-medium transition ${
            activeTab === "general"
              ? "border-b-2 border-brand-500 text-brand-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          General
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("analytics")}
          className={`cursor-pointer whitespace-nowrap px-5 py-3 text-sm font-medium transition ${
            activeTab === "analytics"
              ? "border-b-2 border-brand-500 text-brand-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Analytics
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`cursor-pointer whitespace-nowrap px-5 py-3 text-sm font-medium transition ${
            activeTab === "security"
              ? "border-b-2 border-brand-500 text-brand-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Security
        </button>
      </div>

      {activeTab === "general" && <GeneralSettings settings={settings} />}

      {activeTab === "analytics" && (
        <AnalyticsSettings settings={settings} purgeCount={purgeCount} />
      )}

      {activeTab === "security" && <SecuritySettings />}
    </div>
  );
};

export default SettingsTabs;
