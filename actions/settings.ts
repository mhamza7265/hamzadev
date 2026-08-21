"use server";

import { prisma } from "@/lib/prisma";
import {
  AnalyticsSettingsSchema,
  ChangePasswordSchema,
  GeneralSettingsSchema,
} from "@/schemas/schemas";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/authSession";

export const getSettings = async () => {
  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {},
      });
    }

    return {
      success: true as const,
      data: settings,
    };
  } catch (error) {
    console.error("Error getting settings:", error);

    return {
      success: false as const,
      error: "Error getting settings",
    };
  }
};

export const updateGeneralSettings = async (data: unknown) => {
  try {
    const validation = GeneralSettingsSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "Validation error",
      };
    }

    const settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      await prisma.siteSettings.create({
        data: validation.data,
      });
    } else {
      await prisma.siteSettings.update({
        where: {
          id: settings.id,
        },
        data: validation.data,
      });
    }

    return {
      success: true,
      message: "General settings updated successfully",
    };
  } catch (error) {
    console.error("Error updating general settings:", error);

    return {
      success: false,
      error: "Error updating general settings",
    };
  }
};

export const updateAnalyticsSettings = async (data: unknown) => {
  try {
    const validation = AnalyticsSettingsSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "Validation error",
      };
    }

    const settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      await prisma.siteSettings.create({
        data: validation.data,
      });
    } else {
      await prisma.siteSettings.update({
        where: {
          id: settings.id,
        },
        data: validation.data,
      });
    }

    return {
      success: true,
      message: "Analytics settings updated successfully",
    };
  } catch (error) {
    console.error("Error updating analytics settings:", error);

    return {
      success: false,
      error: "Error updating analytics settings",
    };
  }
};

export const getAnalyticsPurgeCount = async () => {
  try {
    const settings = await prisma.siteSettings.findFirst();

    const retentionDays = settings?.analyticsRetentionDays ?? 90;

    const cutoffDate = new Date();

    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    const count = await prisma.analyticsEvent.count({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    return {
      success: true,
      data: {
        count,
        retentionDays,
      },
    };
  } catch (error) {
    console.error("Error getting analytics purge count:", error);

    return {
      success: false,
      error: "Error getting analytics purge count",
    };
  }
};

export const purgeAnalytics = async () => {
  try {
    const settings = await prisma.siteSettings.findFirst();

    const retentionDays = settings?.analyticsRetentionDays ?? 90;

    const cutoffDate = new Date();

    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    const result = await prisma.analyticsEvent.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    return {
      success: true,
      data: {
        deletedCount: result.count,
      },
      message: `${result.count} analytics records deleted successfully`,
    };
  } catch (error) {
    console.error("Error purging analytics:", error);

    return {
      success: false,
      error: "Error purging analytics data",
    };
  }
};

export const changePassword = async (data: unknown) => {
  try {
    const validation = ChangePasswordSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "Validation error",
      };
    }

    const session = await getSession();

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const passwordMatches = await bcrypt.compare(
      validation.data.currentPassword,
      user.password,
    );

    if (!passwordMatches) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    const passwordHash = await bcrypt.hash(validation.data.newPassword, 12);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHash,
      },
    });

    return {
      success: true,
      message: "Password changed successfully",
    };
  } catch (error) {
    console.error("Error changing password:", error);

    return {
      success: false,
      error: "Error changing password",
    };
  }
};
