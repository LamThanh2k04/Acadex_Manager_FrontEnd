// student/schedule/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Filter } from "lucide-react";
import ScheduleSelectTypeSkeleton from "./ScheduleSelectType/ScheduleSelectTypeSkeleton";
import ScheduleSelectDateSkeleton from "./ScheduleSelectDate/ScheduleSelectDateSkeleton";

export default function ScheduleLoading() {
    return (
        <section className="space-y-6 p-4 md:p-6 mt-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300 shrink-0">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                            <Skeleton className="h-7 w-36" />
                        </div>
                        <Skeleton className="h-4 w-80" />
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 shrink-0">
                        <Filter className="h-4 w-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                            Bộ lọc lịch
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Chọn loại lịch và ngày để xem nhanh thông tin.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-neutral-800 dark:bg-gray-900">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Loại lịch
                        </label>
                        <ScheduleSelectTypeSkeleton />
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-neutral-800 dark:bg-gray-900">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ngày
                        </label>
                        <ScheduleSelectDateSkeleton />
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 md:p-5">
                <div className="mb-4 flex justify-center">
                    <Skeleton className="h-6 w-40" />
                </div>
                <div className="mb-2 grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full rounded-md" />
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1 rounded-lg p-1">
                            <Skeleton className="h-4 w-5" />
                            {i % 5 === 0 && <Skeleton className="h-4 w-full rounded-sm" />}
                            {i % 7 === 3 && <Skeleton className="h-4 w-full rounded-sm" />}
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <Skeleton className="h-2.5 w-2.5 rounded-sm" />
                            <Skeleton className="h-3 w-14" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}