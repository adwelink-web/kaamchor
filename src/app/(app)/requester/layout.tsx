'use client';

import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Home, ListTodo, PlusCircle, Users, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const requesterNavItems = [
  { href: '/requester/dashboard', icon: Home, label: 'My Tasks' },
  { href: '/requester/tasks/new', icon: PlusCircle, label: 'Post Task' },
  { href: '/requester/helpers', icon: Users, label: 'Find Helpers' },
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
        <main className="p-4 sm:px-6 sm:py-0 flex-1 relative">
          {children}
           <Button asChild className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg" size="icon">
             <Link href="/requester/tasks/new">
               <PlusIcon className="h-8 w-8" />
               <span className="sr-only">Post a Task</span>
             </Link>
           </Button>
        </main>
      </div>
    </div>
  );
}
