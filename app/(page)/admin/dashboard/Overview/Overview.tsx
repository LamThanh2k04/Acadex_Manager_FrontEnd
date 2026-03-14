"use client"
import { TrendingUp, Landmark, DollarSign, UsersRound, School, Users, BookCopy, Notebook } from 'lucide-react';
import { useAppSelector } from "@/lib/hook";
import { IAdminOverview } from '@/app/types/admin/overview.type';
import ButtonExportPDF from './ButtonExportPDF';
const overviewItems = (data: IAdminOverview) => [
    {
        label: "Tổng doanh thu",
        value: data?.totalRevenue,
        percent: "+10%",
        valueIcon: <DollarSign className="size-5" />,
        bgIcon: <Landmark className="size-5" />,
    },
    {
        label: "Tổng sinh viên",
        value: data?.totalStudents,
        percent: "+5%",
        valueIcon: <UsersRound className="size-5" />,
        bgIcon: <School className="size-5" />,
    },
    {
        label: "Tổng giảng viên",
        value: data?.totalLecturers,
        percent: "+15%",
        valueIcon: <Users className="size-5" />,
        bgIcon: <School className="size-5" />,
    },
    {
        label: "Tổng học phần",
        value: data?.totalCourses,
        percent: "+20%",
        valueIcon: <BookCopy className="size-5" />,
        bgIcon: <Notebook className="size-5" />,
    },
]

export default function Overview({ data }: { data: IAdminOverview }) {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <div className="mt-14 ">
            <div className="ml-3 mb-5">
                <h1 className="text-xl font-bold mb-5">
                    Chào mừng trở lại,{" "}
                    <span className="text-[#ec5d15]">Adm. {user?.fullName}</span>
                </h1>
                <div className='flex items-center justify-between'>
                    <p className="text-gray-400 text-sm mt-1">Hôm nay có gì mới?</p>
                    <ButtonExportPDF />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {overviewItems(data).map((item, index) => (
                    <div
                        key={index}
                        className="group flex items-center justify-between
                                   bg-white border border-orange-100 rounded-2xl
                                   shadow-sm p-4 cursor-default
                                   hover:shadow-md hover:border-orange-300
                                   hover:-translate-y-1
                                   transition-all duration-300 ease-in-out"
                    >
                        <div className="flex flex-col gap-1.5">
                            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                                {item.label}
                            </p>
                            <p className="flex items-center gap-1 font-bold text-2xl text-gray-800">
                                {item.valueIcon}
                                {item.value?.toLocaleString("vi-VN")}
                            </p>
                            <p className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                                <TrendingUp className="size-3.5" />
                                {item.percent} tháng này
                            </p>
                        </div>
                        <div className="bg-orange-100 group-hover:bg-orange-200
                                        rounded-xl text-[#ec5d15] p-3
                                        transition-colors duration-300">
                            {item.bgIcon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}