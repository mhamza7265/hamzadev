import { getProfileData } from "@/actions/profile";
import ProfileForm from "@/components/admin/profile/ProfileForm";

export default async function ProfileSettingsPage() {
  const profile = await getProfileData();
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Profile Settings
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage the information displayed on your public portfolio.
        </p>
      </div>

      <ProfileForm profile={profile} />
    </>
  );
}
