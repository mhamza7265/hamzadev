"use client";

import { ArrowLeft, CalendarDays, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ContactMessage } from "@/generated/prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { updateMessageStatus } from "@/actions/messages";

const MessageClient = ({
  contactMessage,
}: {
  contactMessage: ContactMessage;
}) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const updateMessage = async () => {
      await updateMessageStatus(id);
    };
    updateMessage();
    window.dispatchEvent(new Event("message-read"));
  }, [id]);

  const parts = contactMessage?.name.trim().split(/\s+/);

  const initials =
    parts.length === 1
      ? parts[0][0]
      : `${parts[0][0]}${parts[parts.length - 1][0]}`;

  const formattedInitials = initials.toUpperCase();

  const date = new Date(contactMessage.createdAt);
  const formattedDate = date.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
  const time = date.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="min-h-full space-y-6 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer size-9 rounded-lg hover:bg-slate-800"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
            <span className="sr-only">Back to messages</span>
          </Button>

          <div>
            <p className="text-sm text-slate-400">Messages</p>
            <h1 className="text-xl font-semibold text-white">
              Message Details
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* {!contactMessage.read && (
            <Badge
              variant="outline"
              className="border-green-500/30 bg-green-500/10 text-green-400"
            >
              <span className="mr-1.5 size-1.5 rounded-full bg-green-400" />
              Unread
            </Badge>
          )} */}

          {/* <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg hover:bg-slate-800"
          >
            <MoreHorizontal className="size-5" />
          </Button> */}
        </div>
      </div>

      {/* Message */}
      <Card className="overflow-hidden border-slate-700 bg-slate-900/70 shadow-xl">
        {/* Subject */}
        <CardHeader className="space-y-5 border-b border-slate-700 lg:px-6 py-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {contactMessage.subject}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Received through your portfolio contact form
            </p>
          </div>

          <Separator className="bg-slate-700" />

          {/* Sender */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-brand-600 text-sm font-semibold text-white shadow-glow">
                {formattedInitials}
              </div>

              <div>
                <p className="font-medium text-white">{contactMessage.name}</p>
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Mail className="size-3.5" />
                  <span>{contactMessage.email}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm sm:items-end">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CalendarDays className="size-4 text-slate-500" />
                <span>{formattedDate}</span>
              </div>

              <span className="text-xs text-slate-500">{time}</span>
            </div>
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-5 text-[15px] leading-7 text-slate-300">
              <p>{contactMessage.message}</p>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="border-t border-slate-700 bg-slate-950/30 px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <User className="size-3.5" />
                <span className="">Visitor</span>
              </div>

              <div>Source: Portfolio</div>
            </div>

            {/* <Button className="rounded-lg bg-linear-to-r from-brand-500 to-brand-600 text-white shadow-glow hover:scale-[1.02]">
              <Reply className="mr-2 size-4" />
              Reply
            </Button> */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessageClient;
