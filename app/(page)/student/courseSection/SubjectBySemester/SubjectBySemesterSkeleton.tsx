import { Skeleton } from "@/components/ui/skeleton";

function SubjectRowSkeleton({ isLast }: { isLast: boolean }) {
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
            <td className="px-4 py-3">
                <Skeleton className="h-5 w-16 rounded-md" />
            </td>
            <td className="px-4 py-3">
                <Skeleton className="h-5 w-16 rounded-md" />
            </td>
            <td className="px-4 py-3 text-center">
                <Skeleton className="h-7 w-7 rounded-full mx-auto" />
            </td>
        </tr>
    );
}
export default function SubjectBySemesterSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/60">
                            {["STT", "Môn học", "Mã môn học", "Số giờ lý thuyết", "Số giờ thực hành", "Tín chỉ"].map((h, i) => (
                                <th
                                    key={h}
                                    className={`text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap
                                        ${i === 0 ? "px-5 w-10" : ""}
                                        ${i === 5 ? "text-center" : ""}
                                    `}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SubjectRowSkeleton key={i} isLast={i === 5} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}