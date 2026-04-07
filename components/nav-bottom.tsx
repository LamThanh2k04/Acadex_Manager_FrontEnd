"use client"
import { cn } from '@/lib/utils';
import { LayoutDashboard, School, ContactRound, Notebook, ClipboardClock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBottom() {
    const pathName = usePathname();
    const navbars = [
        {
            icon: <LayoutDashboard />,
            href: "/lecturer/dashboard",
        },
        {
            icon: <School />,
            href: "/lecturer/class",
        },
        {
            icon: <ContactRound />,
            href: "/lecturer/info",
        },
        {
            icon: <Notebook />,
            href: "/lecturer/courseSection",
        },
        {
            icon: <ClipboardClock />,
            href: "/lecturer/schedule",
        }
    ]
    return (
        <nav className='flex items-center justify-around bg-white p-3 rounded-xl'>
            {navbars.map((nav, index) => {
                const isActive = pathName === nav.href;
                return (
                    <Link className={cn("flex flex-col items-center justify-center text-[10px] ${pathName}",
                        "text-gray-600 hover:bg-orange-100 hover:text-orange-400 p-2 rounded-xl transition-all duration-300",
                        isActive && "text-[#ec5d15] bg-orange-100 scale-110"
                    )} href={nav.href} key={index}>
                        {nav.icon}
                    </Link>
                )
            })}
        </nav>
    )
}