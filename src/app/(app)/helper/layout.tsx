
'use client';

import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Briefcase, ListTodo, Wallet, MessageSquareWarning, User } from 'lucide-react';
import BottomNav from '@/components/bottom-nav';

const helperNavItems = [
    { href: '/helper/tasks/accepted', icon: ListTodo, label: 'My Tasks' },
    { href: '/helper/earnings', icon: Wallet, label: 'Earnings' },
    { href: '/helper/profile', icon: User, label: 'Profile' },
    { href: '/helper/feedback', icon: MessageSquareWarning, label: 'Support' },
];

export default function HelperAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar navItems={helperNavItems} logoHref="/helper/tasks/accepted" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header mobileNavItems={helperNavItems} logoHref="/helper/tasks/accepted" />
        <main className="p-4 sm:px-6 sm:py-0 flex-1 pb-20 sm:pb-0">{children}</main>
      </div>
      <BottomNav navItems={helperNavItems} />
    </div>
  );
}
