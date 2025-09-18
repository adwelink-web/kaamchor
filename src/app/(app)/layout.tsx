import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="p-4 sm:px-6 sm:py-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
