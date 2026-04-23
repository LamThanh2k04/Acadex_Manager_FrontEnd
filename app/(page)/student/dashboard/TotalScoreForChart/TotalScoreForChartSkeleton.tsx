import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2 } from "lucide-react";

function ScoreRowSkeleton() {
    return (
        <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-3 flex-1" />
            <div className="flex items-center gap-2 shrink-0">
                <Skeleton className="h-1.5 w-20 rounded-full hidden sm:block" />
                <Skeleton className="h-5 w-10 rounded-full" />
                <Skeleton className="h-3 w-16 hidden xs:block" />
            </div>
        </div>
    );
}
export default function TotalScoreForChartSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                        <BarChart2 size={15} className="text-[#ec5d15]" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                </div>
                <Skeleton className="h-8 w-30 rounded-lg shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-3 px-5 pt-4">
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-3 space-y-1.5">
                    <Skeleton className="h-2.5 w-16" />
                    <Skeleton className="h-6 w-10" />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-3 space-y-1.5">
                    <Skeleton className="h-2.5 w-16" />
                    <Skeleton className="h-6 w-10" />
                </div>
            </div>
            <div className="px-5 pt-4 pb-2">
                <div className="flex items-end gap-3 h-[240px]">
                    <div className="flex flex-col justify-between h-full pb-6 shrink-0">
                        {[10, 8, 6, 4, 2, 0].map((v) => (
                            <span key={v} className="text-[10px] text-gray-300 dark:text-gray-700">
                                {v}
                            </span>
                        ))}
                    </div>
                    <div className="flex-1 flex items-end justify-around gap-2 h-full pb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                <div className="flex items-end gap-1 w-full justify-center">
                                    <Skeleton
                                        className="w-4 rounded-t-md"
                                        style={{ height: `${[65, 80, 50, 90, 70][i]}%` }}
                                    />
                                    <Skeleton
                                        className="w-4 rounded-t-md opacity-60"
                                        style={{ height: `${[55, 70, 60, 75, 65][i]}%` }}
                                    />
                                </div>
                                <Skeleton className="h-2.5 w-10 mt-1" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#ec5d15]" />
                        <span className="text-[10px] text-gray-400">Điểm của bạn</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-sky-400 opacity-70" />
                        <span className="text-[10px] text-gray-400">TB lớp học</span>
                    </div>
                </div>
            </div>
            <div className="px-5 pb-4">
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <ScoreRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}