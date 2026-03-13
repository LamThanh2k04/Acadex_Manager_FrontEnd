"use client"
import AdminBottomNav from "./AdminBottomNav";
import Image from 'next/image';
import { useAppSelector } from "@/lib/hook";
import { UserRound } from 'lucide-react';
export default function LayoutAdmin({ children }: Readonly<({ children: React.ReactNode })>) {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center border-b bg-white h-16">
                <div className="flex items-center gap-2 m-3">
                    <Image
                        src="/images/acadex-logo.jpg"
                        className="rounded-xl"
                        alt="Acadex"
                        width={40}
                        height={40}
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
            <aside className="hidden">

            </aside>
            <main className="pt-16">
                {children}
            </main>
            <nav className="md:hidden">
                <AdminBottomNav />
            </nav>
        </div>
    )
}