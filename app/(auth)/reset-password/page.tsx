import { verifyResetToken } from "@/actions/auth";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import InvalidResetToken from "@/components/auth/InvalidResetToken";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const ResetPassword = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams;

  if (!token) {
    return <InvalidResetToken />;
  }

  const result = await verifyResetToken(token);

  if (!result.success) {
    return <InvalidResetToken />;
  }

  return <ResetPasswordForm token={token} />;
};

export default ResetPassword;
