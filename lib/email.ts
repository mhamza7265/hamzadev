import ContactEmail from "@/components/email/ContactEmail";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendContactEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string,
) => {
  return transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: `
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message: ${message}
    `,
  });
};

export async function sendEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const { data, error } = await resend.emails.send({
    from: `${name} via portfolio <contact@hamzahanif.dev>`,
    to: ["contact@hamzahanif.dev"],
    replyTo: email,
    subject: subject,
    react: ContactEmail({ name, email, subject, message }),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
