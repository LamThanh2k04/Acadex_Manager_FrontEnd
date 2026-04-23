import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, GraduationCap, CheckCircle2, CreditCard, Calendar } from "lucide-react";

function EnrollmentCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            <div className="p-4">
                <Skeleton className="h-4 w-56 mb-3" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <GraduationCap size={13} className="text-purple-500 shrink-0" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-blue-500 shrink-0" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                        <Skeleton className="h-4 w-24 ml-auto" />
                        <Skeleton className="h-3 w-32 ml-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}
function SemesterBlockSkeleton() {
    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-50 dark:border-gray-800">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-52" />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: <BookOpen size={14} className="text-blue-600" />, label: "Môn học" },
                        { icon: <GraduationCap size={14} className="text-purple-600" />, label: "Tín chỉ" },
                        { icon: <CheckCircle2 size={14} className="text-emerald-600" />, label: "Trạng thái" },
                        { icon: <CreditCard size={14} className="text-[#ec5d15]" />, label: "Tổng tiền" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`rounded-xl p-4 ${i === 3
                                ? "bg-[#ec5d15]/5 dark:bg-[#ec5d15]/10 border border-[#ec5d15]/10"
                                : "bg-gray-50 dark:bg-gray-800/40 border border-transparent"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {item.icon}
                                <span className={`text-[10px] font-bold uppercase ${i === 3 ? "text-[#ec5d15]" : "text-gray-500"}`}>
                                    {item.label}
                                </span>
                            </div>
                            <Skeleton className={`h-6 ${i === 3 ? "w-28" : "w-10"} mt-1`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <EnrollmentCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
export default function PaidEnrollmentSkeleton() {
    return (
        <div className="space-y-8 mt-10">
            {Array.from({ length: 2 }).map((_, i) => (
                <SemesterBlockSkeleton key={i} />
            ))}
        </div>
    );
}