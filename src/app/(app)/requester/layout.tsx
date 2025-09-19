
'use client';

import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Home, PlusCircle, Users, History, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/bottom-nav';

const requesterNavItems = [
  { href: '/requester/dashboard', icon: Home, label: 'Mere Kaam' },
  { href: '/requester/history', icon: History, label: 'History' },
  { href: '/requester/tasks/new', icon: PlusCircle, label: 'Post' },
  { href: '/requester/helpers', icon: Users, label: 'Helpers' },
  { href: '/requester/feedback', icon: MessageSquareWarning, label: 'Feedback' },
];

export default function RequesterAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar navItems={requesterNavItems} logoHref="/requester/dashboard" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header mobileNavItems={requesterNavItems} logoHref="/requester/dashboard" />
        <main className="p-4 sm:px-6 sm:py-0 flex-1 relative pb-20 sm:pb-0">
          {children}
        </main>
      </div>
      <BottomNav navItems={requesterNavItems} />
    </div>
  );
}
