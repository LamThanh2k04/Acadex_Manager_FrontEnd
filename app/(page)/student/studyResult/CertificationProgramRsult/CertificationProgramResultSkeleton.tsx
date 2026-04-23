import { Skeleton } from "@/components/ui/skeleton";
function CertificationRowSkeleton({ index }: { index: number }) {
    return (
        <tr>
            <td className="px-4 py-3.5">
                <Skeleton className="h-3 w-5" />
            </td>
            <td className="px-4 py-3.5">
                <Skeleton className="h-4 w-36" />
            </td>
            <td className="px-4 py-3.5 hidden md:table-cell">
                <Skeleton className="h-3 w-48" />
            </td>
            <td className="px-4 py-3.5 text-center">
                <Skeleton className="h-4 w-4 rounded-full mx-auto" />
            </td>
            <td className="px-4 py-3.5 text-center">
                <Skeleton className="h-5 w-16 rounded-full mx-auto" />
            </td>
        </tr>
    );
}
export default function CertificationProgramResultSkeleton() {
    return (
        <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        {["STT", "Loại chứng chỉ", "Mô tả", "Đã nộp", "Trạng thái"].map((h, i) => (
                            <th
                                key={h}
                                className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500
                                    ${i === 2 ? "hidden md:table-cell" : ""}
                                    ${i >= 3 ? "text-center" : ""}
                                `}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CertificationRowSkeleton key={i} index={i} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}