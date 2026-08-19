import { getMessage } from "@/actions/messages";
import MessageClient from "@/components/admin/messages/Message";
import { notFound } from "next/navigation";

interface MessageProps {
  params: Promise<{
    id: string;
  }>;
}

const Message = async ({ params }: MessageProps) => {
  const { id } = await params;

  const result = await getMessage(id);

  if (!result.success || !result.message) {
    notFound();
  }

  return <MessageClient contactMessage={result.message} />;
};

export default Message;
