import nodemailer from "nodemailer";

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
