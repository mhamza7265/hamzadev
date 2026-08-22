import MessagesTable from "@/components/admin/messages/MessagesTable";

const Messages = async () => {
  return (
    <>
      <div className="px-1 lg:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-white">Contact Messages</h1>

          <p className="mt-1 text-sm text-slate-400">
            View your contact messages.
          </p>
        </div>
      </div>
      <MessagesTable />
    </>
  );
};

export default Messages;
