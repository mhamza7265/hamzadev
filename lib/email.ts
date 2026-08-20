import ContactEmail from "@/components/email/ContactEmail";
import ResetPasswordEmail from "@/components/email/ResetPasswordEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
  emailType: "contactEmail" | "resetPw" | string,
  resetLink?: string,
) {
  let EmailTemplate = null;
  let recipientEmail = email;
  let fromHeader = `${name} via portfolio <contact@hamzahanif.dev>`;
  let replyToHeader: string | undefined = email;

  switch (emailType) {
    case "contactEmail":
      EmailTemplate = ContactEmail({ name, email, subject, message });
      recipientEmail = "contact@hamzahanif.dev"; // Messages go to your inbox
      break;

    case "resetPw":
      if (!resetLink) {
        throw new Error("resetLink is required for password reset emails.");
      }
      EmailTemplate = ResetPasswordEmail({ resetLink, name });
      recipientEmail = email; // Password reset goes to the user
      fromHeader = "Hamza.dev <contact@hamzahanif.dev>";
      replyToHeader = undefined; // No reply-to needed for system transactional emails
      break;

    default:
      EmailTemplate = ContactEmail({ name, email, subject, message });
      recipientEmail = "contact@hamzahanif.dev";
  }

  const { data, error } = await resend.emails.send({
    from: fromHeader,
    to: [recipientEmail],
    replyTo: replyToHeader,
    subject: subject,
    react: EmailTemplate,
  });

  if (error) {
    console.error({ error });
    return { success: false, error };
  }

  console.log({ data });
  return { success: true, data };
}
