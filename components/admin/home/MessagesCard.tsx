"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};

interface MessagesCardProps {
  messages: Message[];
}

const MessagesCard = ({ messages }: MessagesCardProps) => {
  const router = useRouter();
  const { start } = useProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="xl:col-span-2 rounded-xl border border-slate-800 bg-slate-900/70"
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="font-semibold text-white">Recent Messages</h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Your latest contact submissions
          </p>
        </div>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          onClick={() => {
            router.push("/admin/messages");
            start();
          }}
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="divide-y divide-slate-800">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </motion.div>
  );
};

export default MessagesCard;

const MessageItem = ({ message }: { message: Message }) => {
  const formatted = new Date(message.createdAt).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div
      key={message.email}
      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-800/30"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-300">
        {message.name
          .split(" ")
          .map((name) => name[0])
          .join("")}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-white">
            {message.name}
          </p>

          {/* {message.unread && (
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          )} */}
        </div>

        <p className="truncate text-xs text-slate-500">{message.message}</p>
      </div>

      <span className="shrink-0 text-xs text-slate-500">{formatted}</span>
    </div>
  );
};
