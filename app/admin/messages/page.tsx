import MessagesTable from "@/components/admin/messages/MessagesTable";

const Messages = async () => {
  return (
    <div className="lg:p-6">
      <div className="mx-auto max-w-4xl px-1 lg:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Contact Messages
          </h1>

          <p className="mt-1 text-sm text-white">View your contact messages.</p>
        </div>
      </div>
      <MessagesTable />
    </div>
  );
};

export default Messages;
