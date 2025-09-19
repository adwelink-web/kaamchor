import Link from 'next/link';
import { Search, PanelLeft } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import UserNav from './user-nav';
import { Logo } from './icons';

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
};

type HeaderProps = {
  mobileNavItems: NavItem[];
  logoHref: string;
};

export default function Header({ mobileNavItems, logoHref }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* This Sheet is for the desktop sidebar toggle, which is not yet implemented */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="hidden sm:flex">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href={logoHref}
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Kaamchor</span>
            </Link>
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <Button size="icon" variant="outline" className="sm:hidden">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      <div className="ml-auto">
        <UserNav />
      </div>
    </header>
  );
}
