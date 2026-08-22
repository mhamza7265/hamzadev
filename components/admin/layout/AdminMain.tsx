export default function AdminMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-w-0 flex-1 bg-slate-950 p-2 sm:p-6 lg:p-8">
      {children}
    </main>
  );
}
