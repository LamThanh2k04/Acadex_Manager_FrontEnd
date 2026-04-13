import { IOverview } from "@/app/types/lecturer/dashboard/overview.type";
import { UsersRound, School, CalendarMinus2, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
export default function Overview({ data }: { data: IOverview | undefined }) {
    const stats = [
        {
            label: "Tổng học sinh",
            value: data?.totalStudents || 0,
            icon: UsersRound,
            color: "text-[#ec5d15]",
            bgColor: "bg-white",
            borderColor: "border-orange-100"
        },
        {
            label: "Tổng lớp học",
            value: data?.totalClasses || 0,
            icon: School,
            color: "text-[#ec5d15]",
            bgColor: "bg-white",
            borderColor: "border-orange-100"
        },
        {
            label: "Lịch dạy hôm nay",
            value: data?.totalSchedulesToday || 0,
            icon: CalendarMinus2,
            color: "text-[#ec5d15]",
            bgColor: "bg-white",
            borderColor: "border-orange-100"
        },
        {
            label: "Tỉ lệ chuyên cần",
            value: `${data?.attendanceRate || 0}%`,
            icon: CalendarCheck,
            color: "text-[#ec5d15]",
            bgColor: "bg-white",
            borderColor: "border-orange-100"
        }
    ];
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 hover:shadow-md",
                        stat.bgColor,
                        stat.borderColor
                    )}
                >
                    <div className={cn("p-2 rounded-full mb-2 bg-white shadow-sm", stat.color)}>
                        <stat.icon size={20} strokeWidth={2.5} />
                    </div>

                    <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider text-center">
                        {stat.label}
                    </p>

                    <p className={cn("text-xl font-bold mt-1", stat.color)}>
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}