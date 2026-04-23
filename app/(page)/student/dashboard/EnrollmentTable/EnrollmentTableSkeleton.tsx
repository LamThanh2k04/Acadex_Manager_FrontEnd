import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
function EnrollmentRowSkeleton({ isLast }: { isLast: boolean }) {
    return (
        <tr className={!isLast ? "border-b border-gray-100 dark:border-gray-800" : ""}>
            <td className="px-5 py-3">
                <Skeleton className="h-3 w-4" />
            </td>
            <td className="px-4 py-3">
                <Skeleton className="h-4 w-48" />
            </td>
            <td className="px-4 py-3">
                <Skeleton className="h-5 w-20 rounded-md" />
            </td>
            <td className="px-4 py-3 text-center">
                <Skeleton className="h-7 w-7 rounded-full mx-auto" />
            </td>
        </tr>
    );
}

export default function EnrollmentTableSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                        <BookOpen size={15} className="text-[#ec5d15]" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                </div>
                <Skeleton className="h-8 w-30 rounded-lg" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/60">
                            {["STT", "Tên học phần", "Mã lớp", "Tín chỉ"].map((h, i) => (
                                <th
                                    key={h}
                                    className={`text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5
                                        ${i === 0 ? "px-5 w-10" : ""}
                                        ${i === 3 ? "text-center" : ""}
                                    `}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <EnrollmentRowSkeleton key={i} isLast={i === 4} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                <Skeleton className="h-3 w-16" />
                <div className="flex items-center gap-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-8" />
                </div>
            </div>
        </div>
    );
}