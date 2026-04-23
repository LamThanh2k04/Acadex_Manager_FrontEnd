import { Skeleton } from "@/components/ui/skeleton";
function StudyResultRowSkeleton() {
    return (
        <tr>
            <td className="px-3 py-3.5">
                <Skeleton className="h-3 w-5" />
            </td>
            <td className="px-3 py-3.5 min-w-45 space-y-1.5">
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-2.5 w-20" />
            </td>
            {Array.from({ length: 12 }).map((_, i) => (
                <td key={i} className="px-3 py-3.5 text-center">
                    <Skeleton className="h-3 w-6 mx-auto" />
                </td>
            ))}
            <td className="px-3 py-3.5 text-center">
                <Skeleton className="h-4 w-16 rounded-full mx-auto" />
            </td>
            <td className="px-3 py-3.5 text-center">
                <Skeleton className="h-4 w-4 rounded-full mx-auto" />
            </td>
        </tr>
    );
}
function SemesterBlockSkeleton() {
    return (
        <div className="overflow-hidden mt-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between px-5 py-3.5 bg-orange-50/50 dark:bg-orange-900/10 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-[#ec5d15] rounded-full shrink-0" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-3 w-14" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm bg-white dark:bg-gray-900/50">
                    <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            {["STT", "Môn học", "TC", "GK", "CK", "LT1", "LT2", "TH1", "TH2", "TH3", "Tổng", "GPA", "Điểm chữ", "Xếp loại", "Kết quả"].map((h) => (
                                <th key={h} className="px-3 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap text-center first:text-left">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StudyResultRowSkeleton key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default function StudyResultSkeleton() {
    return (
        <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <SemesterBlockSkeleton key={i} />
            ))}
        </div>
    );
}