"use server";

import { ProfileFormData } from "@/data/constants";
import { getSession } from "@/lib/authSession";
import { prisma } from "@/lib/prisma";
import { ProfileSchema } from "@/schemas/profileSchema";
import { revalidatePath } from "next/cache";

export async function getProfileData() {
  try {
    const profile = await prisma.profile.findFirst();
    return profile;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null; // Gracefully handles errors without crashing Server Components
  }
}

export async function updateProfile(formData: ProfileFormData) {
  try {
    // 1. Check Authentication
    const session = await getSession();

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // 2. Validate with Zod
    const result = ProfileSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation error:", result.error.flatten());
      return { success: false, error: "Invalid input data" };
    }

    // 3. Update Database using validated result.data
    await prisma.profile.updateMany({
      where: {},
      data: result.data, // Contains sanitized, validated values
    });

    // 4. Revalidate pages to flush Next.js cache
    revalidatePath("/");
    revalidatePath("/admin/profile");

    // 5. Explicit Success Return
    return { success: true };
  } catch (err) {
    console.error("Updating profile err", err);
    return { success: false, error: "Failed to update profile in database" };
  }
}
