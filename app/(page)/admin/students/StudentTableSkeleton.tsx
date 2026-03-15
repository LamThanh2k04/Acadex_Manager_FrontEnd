import { Skeleton } from "@/components/ui/skeleton"

export default function StudentTableSkeleton() {
    return (
        <div className="mt-5 p-5 ml-3 border rounded-2xl w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-70 rounded-xl" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden">
                <thead className="bg-orange-100">
                    <tr className="h-12">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <th key={i} className="px-4">
                                <Skeleton className="h-4 w-full" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="h-14 border-t border-gray-100 bg-white">
                            <td className="px-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            </td>
                            <td className="px-4"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-4"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-4"><Skeleton className="h-4 w-32" /></td>
                            <td className="px-4"><Skeleton className="h-7 w-24 rounded-2xl" /></td>
                            <td className="px-4">
                                <div className="flex items-center justify-center gap-2">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}