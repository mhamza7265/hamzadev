import { getAnalyticsPurgeCount, getSettings } from "@/actions/settings";
import SettingsTabs from "@/components/admin/settings/SettingsTabs";

const SettingsPage = async () => {
  const [settingsResult, purgeResult] = await Promise.all([
    getSettings(),
    getAnalyticsPurgeCount(),
  ]);

  const settings = settingsResult.success
    ? (settingsResult.data ?? null)
    : null;

  const purgeCount = purgeResult.success ? (purgeResult.data?.count ?? 0) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>

        <p className="mt-1 text-sm font-medium text-slate-400">
          Manage your portfolio and admin dashboard settings.
        </p>
      </div>

      <SettingsTabs settings={settings} purgeCount={purgeCount} />
    </div>
  );
};

export default SettingsPage;
