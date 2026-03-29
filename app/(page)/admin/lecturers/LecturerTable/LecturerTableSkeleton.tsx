import { Skeleton } from "@/components/ui/skeleton"
export default function LecturerTableSkeleton() {
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-80 rounded-lg" />
                    <Skeleton className="h-4 w-80 rounded-lg" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-60 rounded-lg" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden">
                <thead className="bg-orange-100">
                    <tr className="h-12">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <th key={i} className="px-4">
                                <Skeleton className="h-4 w-full" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <tr key={i} className="h-14 border-t border-gray-100 bg-white">
                            <td className="px-4 w-55">
                                <div className="flex items-center gap-3 py-2">
                                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 text-center">
                                <Skeleton className="h-4 w-24 mx-auto" />
                            </td>
                            <td className="px-4 text-center">
                                <Skeleton className="h-4 w-24 mx-auto" />
                            </td>
                            <td className="px-4 text-center">
                                <Skeleton className="h-4 w-36 mx-auto" />
                            </td>
                            <td className="px-4 text-center">
                                <Skeleton className="h-7 w-24 rounded-2xl mx-auto" />
                            </td>
                            <td className="px-4 text-center">
                                <Skeleton className="h-7 w-24 rounded-2xl mx-auto" />
                            </td>
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
            <div className="flex items-center justify-between mt-4 px-1">
                <Skeleton className="h-4 w-40 rounded-lg" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
            </div>
        </div>
    )
}