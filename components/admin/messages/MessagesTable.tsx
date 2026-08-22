"use client";

import { useState, useEffect } from "react";
import { DataTable } from "../ui/DataTable";
import { getPaginatedMessages } from "@/actions/messages";
import { Message, Pagination } from "@/types/types";
import { Button } from "@/components/ui/button";

const MessagesTable = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);

      const result = await getPaginatedMessages(page);

      if (result.success) {
        setMessages(result.data?.messages ?? []);
        setPagination(result.data?.pagination);
      }

      setIsLoading(false);
    };

    fetchMessages();
  }, [page]);

  return (
    <>
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-6 lg:px-4 py-5">
        <DataTable messages={messages} isLoading={isLoading} />
      </div>
      <div className="flex items-center justify-center lg:justify-end gap-2 mt-4">
        <Button
          className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100 disabled:active:scale-100"
          disabled={!pagination?.hasPrevPage || isLoading}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span className="min-w-24 text-center text-sm text-slate-400">
          Page {pagination?.page ?? page} of {pagination?.totalPages ?? 1}
        </span>

        <Button
          className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100 disabled:active:scale-100"
          disabled={!pagination?.hasNextPage || isLoading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default MessagesTable;
