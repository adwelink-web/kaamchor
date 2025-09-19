import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import { Home, ListTodo, PlusCircle, Users } from 'lucide-react';

const requesterNavItems = [
  { href: '/requester/dashboard', icon: Home, label: 'Available Tasks' },
  { href: '/requester/tasks/new', icon: PlusCircle, label: 'Post Task' },
  { href: '/requester/tasks/mine', icon: ListTodo, label: 'My Tasks' },
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
        <main className="p-4 sm:px-6 sm:py-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
