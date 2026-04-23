import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap } from "lucide-react";

export default function CreditProgressChartSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                    <GraduationCap size={15} className="text-[#ec5d15]" />
                </div>
                <div className="space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-36" />
                </div>
            </div>

            <div className="px-5 pt-4 pb-5">
                <div className="relative flex items-center justify-center" style={{ height: 180 }}>
                    <Skeleton className="w-[164px] h-[164px] rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[124px] h-[124px] rounded-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-1">
                            <Skeleton className="h-6 w-10" />
                            <Skeleton className="h-2.5 w-20" />
                            <Skeleton className="h-3 w-10 mt-1" />
                        </div>
                    </div>
                </div>
                <div className="mt-1">
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <Skeleton className="h-full w-1/3 rounded-full" />
                    </div>
                    <div className="relative mt-1.5 h-3">
                        {[25, 50, 75, 100].map((m) => (
                            <span
                                key={m}
                                className="absolute text-[9px] text-gray-300 dark:text-gray-700 -translate-x-1/2"
                                style={{ left: `${m}%` }}
                            >
                                {m}%
                            </span>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl px-4 py-3 space-y-1.5">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-3 space-y-1.5">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                </div>
                <Skeleton className="h-3 w-64 mx-auto mt-3" />
            </div>
        </div>
    );
}