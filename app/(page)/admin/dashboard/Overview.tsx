"use client"
import { TrendingUp, Landmark, DollarSign, UsersRound, School, Users, BookCopy, Notebook } from 'lucide-react';
import { useAppSelector } from "@/lib/hook";
import { IAdminOverview } from '@/app/types/admin.type';
export default function Overview({ data }: { data: IAdminOverview }) {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <div className="mt-4">
            <h1 className="text-xl font-bold ml-3">Chào mừng trở lại, Adm.{user?.fullName}</h1>
            <p className="text-gray-400 text-sm ml-3">Hôm nay có gì mới??</p>
            <div className="w-full flex flex-col items-center mt-5">
                <div className="flex justify-between items-center w-full hover:bg-gray-100 duration-700 ease-in-out transition hover:shadow-xl hover:border-none border p-3 border-orange-100 rounded-xl shadow-sm">
                    <div className="flex flex-col items-center gap-0.5">
                        <p className="text-gray-500 text-sm">Tổng doanh thu</p>
                        <p className="flex items-center font-bold text-2xl"><DollarSign />{data?.totalRevenue}</p>
                        <p className="flex items-center text-green-500 text-sm"><TrendingUp />+10%</p>
                    </div>
                    <div className="border-none bg-orange-200 rounded-xl text-[#ec5d15] p-2 m-3">
                        <Landmark />
                    </div>
                </div>
                <div className="flex justify-between items-center w-full border p-3 hover:bg-gray-100 duration-700 ease-in-out transition hover:shadow-xl hover:border-none border-orange-100 rounded-xl shadow-sm mt-5">
                    <div className="flex flex-col items-center gap-0.5 w-30">
                        <p className="text-gray-500 text-sm">Tổng sinh viên</p>
                        <p className="flex items-center font-bold text-2xl"><span className="px-2"><UsersRound /></span>{data?.totalStudents}</p>
                        <p className="flex items-center text-green-500 text-sm"><TrendingUp />+5%</p>
                    </div>
                    <div className="border-none bg-orange-200 rounded-xl text-[#ec5d15] p-2 m-3">
                        <School />
                    </div>
                </div>
                <div className="flex justify-between items-center w-full border p-3 hover:bg-gray-100 dduration-700 ease-in-out transition hover:shadow-xl hover:border-none border-orange-100 rounded-xl shadow-sm mt-5">
                    <div className="flex flex-col items-center gap-0.5 w-30">
                        <p className="text-gray-500 text-sm">Tổng giảng viên</p>
                        <p className="flex items-center font-bold text-2xl"><span className="px-2"><Users /></span>{data?.totalLecturers}</p>
                        <p className="flex items-center text-green-500 text-sm"><TrendingUp />+15%</p>
                    </div>
                    <div className="border-none bg-orange-200 rounded-xl text-[#ec5d15] p-2 m-3">
                        <School />
                    </div>
                </div>
                <div className="flex justify-between items-center w-full border p-3 hover:bg-gray-100 duration-700 ease-in-out transition hover:shadow-xl hover:border-none border-orange-100 rounded-xl mt-5 shadow-sm">
                    <div className="flex flex-col items-center gap-0.5 w-30">
                        <p className="text-gray-500 text-sm">Tổng học phần</p>
                        <p className="flex items-center font-bold text-2xl"><span className="px-2"><BookCopy /></span>{data?.totalCourses}</p>
                        <p className="flex items-center text-green-500 text-sm"><TrendingUp />+20%</p>
                    </div>
                    <div className="border-none bg-orange-200 rounded-xl text-[#ec5d15] p-2 m-3">
                        <Notebook />
                    </div>
                </div>
            </div>

        </div>
    )
}