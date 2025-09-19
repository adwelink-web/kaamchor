import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Briefcase, ListTodo, User, Wallet } from 'lucide-react';

const helperNavItems = [
    { href: '/helper/dashboard', icon: Briefcase, label: 'Find Work' },
    { href: '/helper/tasks/accepted', icon: ListTodo, label: 'My Accepted Tasks' },
    { href: '/helper/earnings', icon: Wallet, label: 'Earnings' },
    { href: '/helper/profile', icon: User, label: 'Profile' },
];

export default function HelperAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar navItems={helperNavItems} logoHref="/helper/dashboard" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header mobileNavItems={helperNavItems} logoHref="/helper/dashboard" />
        <main className="p-4 sm:px-6 sm:py-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
