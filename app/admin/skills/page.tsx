import { getSkills } from "@/actions/skill";
import SkillContainer from "@/components/admin/skills/SkillContainer";
import SkillCreateButton from "@/components/admin/skills/SkillCreateButton";

const page = async () => {
  const skills = await getSkills();
  return (
    <div className="lg:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 lg:px-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Skills
            </h1>

            <p className="mt-1 text-sm text-white">
              Manage your skills displayed on your public portfolio.
            </p>
          </div>
          <SkillCreateButton />
        </div>
        <SkillContainer skills={skills.skills ?? []} />
      </div>
    </div>
  );
};

export default page;
