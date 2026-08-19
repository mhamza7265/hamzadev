import { getProfileData } from "@/actions/profile";
import ProfileForm from "@/components/admin/profile/ProfileForm";

export default async function ProfileSettingsPage() {
  const profile = await getProfileData();
  return (
    <div className="p-2 lg:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Profile Settings
          </h1>

          <p className="mt-1 text-sm text-white">
            Manage the information displayed on your public portfolio.
          </p>
        </div>

        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
