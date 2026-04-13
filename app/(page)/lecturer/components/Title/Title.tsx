"use client"
import { useAppSelector } from "@/lib/hook"
import Image from 'next/image';
import { GraduationCap, Mail, CalendarDays, Phone, CheckCircle2, XCircle } from 'lucide-react';
import SwitchMode from "../Header/SwitchMode";

export default function Title() {
    const user = useAppSelector((state) => state.user.userInfo);

    const initials = user?.fullName
        ?.split(" ")
        .slice(-2)
        .map((w: string) => w[0])
        .join("")
        .toUpperCase() || "??";

    return (
        <div className="mt-7 overflow-hidden bg-[#FFFF] rounded-[32px] p-6 relative shadow-sm">
            <div className="absolute top-5 right-5 p-2 active:scale-95 transition-transform">
                <div className="hidden md:flex">
                    <SwitchMode />
                </div>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                        {user?.avatar ? (
                            <Image
                                src={user?.avatar}
                                width={128}
                                height={128}
                                alt="User Avatar"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-orange-400 text-3xl font-bold">
                                {initials}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="text-[15px] font-bold text-zinc-800 leading-tight">
                        Chào mừng trở lại, ThS.{user?.fullName}
                    </h1>
                    <div className="mt-2 flex justify-center">
                        {user?.isActive ? (
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                                <CheckCircle2 size={12} /> Đang giảng dạy
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                                <XCircle size={12} /> Đã nghỉ dạy
                            </span>
                        )}
                    </div>
                    <div className="mt-6 space-y-4 md:grid md:grid-cols-4 border-t border-blue-200/50 pt-6 text-left w-full">
                        <div className="flex items-center gap-4 text-zinc-700">
                            <div className="bg-white/50 p-2 rounded-lg">
                                <GraduationCap size={18} className="text-zinc-800" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Cấp bậc</p>
                                <p className="font-semibold text-sm">Thạc sĩ</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-zinc-700">
                            <div className="bg-white/50 p-2 rounded-lg">
                                <CalendarDays size={18} className="text-zinc-800" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Ngày sinh</p>
                                <p className="font-semibold text-sm">{user?.dateOfBirth ? (
                                    new Date(user?.dateOfBirth).toLocaleDateString("vi-VN")
                                ) : "Chưa cập nhật ngày sinh"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-zinc-700">
                            <div className="bg-white/50 p-2 rounded-lg">
                                <Mail size={18} className="text-zinc-800" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Email</p>
                                <p className="font-semibold text-sm truncate">{user?.email || "Chưa cập nhật email"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-zinc-700">
                            <div className="bg-white/50 p-2 rounded-lg">
                                <Phone size={18} className="text-zinc-800" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Điện thoại</p>
                                <p className="font-semibold text-sm">{user?.phoneNumber || "Chưa cập nhật số điện thoại"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}