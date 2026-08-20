"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {
  forgotPwSchema,
  resetPwServerSchema,
  verifyTokenSchema,
} from "@/schemas/schemas";
import { sendEmail } from "@/lib/email";
import { success } from "zod";

export async function forgetPassword(email: string) {
  try {
    const result = forgotPwSchema.safeParse({ email });

    if (!result.success) {
      return { success: false, error: "Validation error" };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      return {
        success: false,
        error:
          "If an account exists with that email, a reset link has been sent.",
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: {
        email: result.data.email,
      },
      data: {
        resetToken,
        resetTokenExpiresAt: tokenExpiry,
      },
    });

    await sendEmail(
      user.name as string,
      user.email,
      "Reset Password",
      "",
      "resetPw",
      `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`,
    );

    return {
      success: true,
      message:
        "If an account exists with that email, a reset link has been sent.",
    };
  } catch (err) {
    console.error("Forget password err", err);
    return { success: false, error: "Forget password err" };
  }
}

export async function verifyResetToken(token: string) {
  try {
    const result = verifyTokenSchema.safeParse({ token });
    if (!result.success) {
      return { success: false, error: "Validation error" };
    }
    const user = await prisma.user.findUnique({
      where: {
        resetToken: result.data.token,
      },
    });

    if (!user || !user.resetTokenExpiresAt) {
      return { success: false, error: "Invalid or expired reset token" };
    }

    const isExpired = Date.now() > user.resetTokenExpiresAt.getTime();

    if (isExpired) {
      return { success: false, error: "Invalid or expired reset token" };
    }

    return {
      success: true,
      message: "Reset token is valid",
    };
  } catch (err) {
    console.error("Verify token err", err);
    return { success: false, error: "Error verifying the reset token" };
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const result = resetPwServerSchema.safeParse({
      token,
      password,
    });

    if (!result.success) {
      return { success: false, error: "Validation error" };
    }

    const user = await prisma.user.findUnique({
      where: {
        resetToken: result.data.token,
      },
    });

    if (!user || !user.resetTokenExpiresAt) {
      return { success: false, error: "Invalid or expired reset token" };
    }

    const isExpired = Date.now() > user.resetTokenExpiresAt.getTime();

    if (isExpired) {
      return { success: false, error: "Invalid or expired reset token" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (err) {
    console.error("Reset password err", err);

    return {
      success: false,
      error: "Password could not be reset, please try again",
    };
  }
}
