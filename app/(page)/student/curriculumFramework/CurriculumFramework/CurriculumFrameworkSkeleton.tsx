import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

function SubjectRowSkeleton({ isLast }: { isLast: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-5 py-3 ${!isLast ? "border-b border-gray-100 dark:border-gray-800" : ""}`}>
            <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
            <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-2.5 w-20" />
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
                <Skeleton className="h-4 w-14 rounded-full hidden sm:block" />
                <Skeleton className="h-4 w-16 rounded-full" />
            </div>
        </div>
    );
}

function SectionLabelSkeleton() {
    return (
        <div className="flex items-center gap-2 px-5 py-2 bg-gray-50/80 dark:bg-gray-800/40 border-y border-gray-100 dark:border-gray-800">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-6 rounded-full" />
        </div>
    );
}
export default function CurriculumFrameworkSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                        <BookOpen size={15} className="text-[#ec5d15]" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {["Tổng TC", "Bắt buộc", "Tự chọn"].map((label) => (
                        <div key={label} className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-3 py-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                                {label}
                            </p>
                            <Skeleton className="h-6 w-8 mt-1" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-none">
                <div className="flex gap-1.5 px-4 py-3 w-max">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-7 w-16 rounded-full" />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between px-5 py-2 bg-orange-50/50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/20">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-14" />
            </div>
            <div>
                <SectionLabelSkeleton />
                {Array.from({ length: 4 }).map((_, i) => (
                    <SubjectRowSkeleton key={i} isLast={i === 3} />
                ))}
                <SectionLabelSkeleton />
                {Array.from({ length: 3 }).map((_, i) => (
                    <SubjectRowSkeleton key={i} isLast={i === 2} />
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/20">
                {["Đã qua", "Đã đăng ký", "Chưa học"].map((label) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <Skeleton className="w-2.5 h-2.5 rounded-sm" />
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">{label}</span>
                    </div>
                ))}
                <div className="flex items-center gap-3 ml-auto">
                    {["Bắt buộc", "Tự chọn"].map((label) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <Skeleton className="w-2.5 h-2.5 rounded-sm" />
                            <span className="text-[11px] text-gray-400 dark:text-gray-500">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}