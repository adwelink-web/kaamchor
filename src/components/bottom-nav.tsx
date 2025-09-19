'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = {
    href: string;
    icon: React.ElementType;
    label: string;
}

type BottomNavProps = {
    navItems: NavItem[];
}

export default function BottomNav({ navItems }: BottomNavProps) {
    const pathname = usePathname();

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center z-40">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'flex flex-col items-center justify-center w-full h-full text-xs gap-1',
                        pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}
