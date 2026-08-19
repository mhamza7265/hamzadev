"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Message } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@bprogress/next";

interface DataTableProps {
  messages: Message[];
  isLoading: boolean;
}

export function DataTable({ messages, isLoading }: DataTableProps) {
  const router = useRouter();
  const { start } = useProgress();

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-slate-600 hover:bg-slate-900/70">
          <TableHead className="text-start font-medium text-slate-400">
            Status
          </TableHead>
          <TableHead className="text-center font-medium text-slate-400">
            Name
          </TableHead>
          <TableHead className="text-center font-medium text-slate-400">
            Subject
          </TableHead>
          <TableHead className="text-center font-medium text-slate-400">
            Email
          </TableHead>
          <TableHead className="text-center font-medium text-slate-400">
            Received
          </TableHead>
          <TableHead className="text-right font-medium text-slate-400">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <TableRow
              key={index}
              className="border-b border-slate-700 even:bg-slate-800/30 hover:bg-slate-800 has-aria-expanded:bg-slate-800"
            >
              <TableCell>
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="mx-auto h-4 w-24" />
              </TableCell>

              <TableCell>
                <Skeleton className="mx-auto h-4 w-40" />
              </TableCell>

              <TableCell>
                <Skeleton className="mx-auto h-4 w-48" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              <TableCell>
                <Skeleton className="ml-auto h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))
        ) : messages && messages.length > 0 ? (
          messages.map((message) => {
            const date = new Date(message.createdAt);
            const formattedDate = date.toLocaleDateString("en-PK", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            });
            return (
              <TableRow
                key={message.id}
                className="border-b border-slate-700 even:bg-slate-800/30 hover:bg-slate-800 has-aria-expanded:bg-slate-800"
              >
                <TableCell className="w-2.5 font-medium text-start">
                  <Badge
                    variant="outline"
                    className={
                      message.read
                        ? "border-slate-500/30 bg-slate-500/10 text-slate-400"
                        : "border-green-500/30 bg-green-500/10 text-green-400"
                    }
                  >
                    <span
                      className={`mr-1.5 size-1.5 shrink-0 rounded-full ${
                        message.read ? "bg-slate-400" : "bg-green-400"
                      }`}
                    />
                    {message.read ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{message.name}</TableCell>
                <TableCell className="text-center">
                  {message.subject.substring(0, 40)}
                </TableCell>
                <TableCell className="text-center">{message.email}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(`/admin/messages/${message.id}`);
                          start();
                        }}
                        className="cursor-pointer"
                      >
                        Open
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow className="border-b border-slate-700 even:bg-slate-800/30 hover:bg-slate-800 has-aria-expanded:bg-slate-800">
            <TableCell colSpan={6} className="w-2.5 font-medium text-center">
              No messages found!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
