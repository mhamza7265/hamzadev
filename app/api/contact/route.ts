import { NextResponse, NextRequest as Request } from "next/server";
import { contactFormSchema } from "@/schemas/schemas";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

// export async function GET(request: Request) {
//   const messages = await prisma.contactMessage.findMany();
//   return NextResponse.json(messages);
// }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data" },
        { status: 400 },
      );
    }

    const data = result.data;

    const enquiry = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    await sendEmail(data.name, data.email, data.subject, data.message);

    return NextResponse.json(
      {
        success: true,
        enquiry,
        message: "Message received successfully!",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Contact form error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
