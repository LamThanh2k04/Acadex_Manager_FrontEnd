import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, GraduationCap, CheckCircle2, CreditCard } from "lucide-react";

function EnrollmentCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-20 rounded-full" />
            </div>
            <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-4 w-56" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
                <div className="flex items-center gap-3 md:flex-col md:items-end shrink-0">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                </div>
            </div>
            <div className="px-4 py-2 border-t border-gray-50 dark:border-gray-800/50">
                <Skeleton className="h-3 w-40" />
            </div>
            <div className="flex items-center gap-2 mb-3 p-2">
                <Skeleton className="h-7 w-24 rounded-lg" />
                <Skeleton className="h-7 w-24 rounded-lg" />
            </div>
        </div>
    );
}
export default function EnrollmentCourseSectionSkeleton() {
    return (
        <div className="space-y-5 mt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { icon: <BookOpen size={14} className="text-blue-600 dark:text-blue-400" />, bg: "bg-blue-100 dark:bg-blue-900/30" },
                    { icon: <GraduationCap size={14} className="text-purple-600 dark:text-purple-400" />, bg: "bg-purple-100 dark:bg-purple-900/30" },
                    { icon: <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />, bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                    { icon: <CreditCard size={14} className="text-[#ec5d15]" />, bg: "bg-orange-100 dark:bg-orange-900/30" },
                ].map((item, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-7 h-7 ${item.bg} rounded-lg flex items-center justify-center`}>
                                {item.icon}
                            </div>
                            <Skeleton className="h-2.5 w-16" />
                        </div>
                        <Skeleton className="h-7 w-12 mt-1" />
                    </div>
                ))}
            </div>
            <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                    <EnrollmentCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}