"use client"
import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { useAppSelector } from '@/lib/hook';
export default function Header() {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <header className="fixed md:hidden top-0 left-0 right-0 z-50 flex justify-between items-center border-b bg-white h-16">
            <div className="flex items-center gap-2 m-3">
                <Image
                    src="/images/acadex-logo.jpg"
                    className="rounded-xl"
                    alt="Acadex Logo"
                    width={40}
                    height={40}
                    loading="eager"
                />
                <span className="text-[#ec5d15] font-bold text-sm uppercase">Acadex</span>
            </div>
            <div className="border-none bg-[#ec5d15] hover:bg-orange-400 transition duration-300 cursor-pointer shadow-2xl p-2 m-3 rounded-3xl ">
                {user?.avatar ? (
                    <img src={user?.avatar} alt={user?.fullName} />
                ) : (
                    <UserRound className="text-white" />
                )}
            </div>
        </header>
    )
}