import Link from 'next/link';
import { Search, PanelLeft, Bell } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import UserNav from './user-nav';
import { Logo } from './icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
};

type HeaderProps = {
  mobileNavItems: NavItem[];
  logoHref: string;
};

function Notifications() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="flex flex-col">
                        <p className="font-semibold">New Task Available</p>
                        <p className="text-xs text-muted-foreground">"Fix a leaky kitchen faucet" is available in your area.</p>
                    </div>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <div className="flex flex-col">
                        <p className="font-semibold">Task Accepted</p>
                        <p className="text-xs text-muted-foreground">Your task "Garden weeding" has been accepted by Charlie B.</p>
                    </div>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <div className="flex flex-col">
                        <p className="font-semibold">Payment Received</p>
                        <p className="text-xs text-muted-foreground">You received a payment of $50 for "Bookshelf assembly".</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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

      <div className="sm:hidden flex items-center gap-2">
        <Button size="icon" variant="outline">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
        </Button>
         <Notifications />
      </div>


      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:block">
            <Notifications />
        </div>
        <UserNav />
      </div>
    </header>
  );
}
