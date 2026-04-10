"use client"
import { useGetSchedule } from '@/hooks/lecturer/schedule/useGetSchedule';
import { useSearchParams } from 'next/navigation';
import ScheduleLecturer from './ScheduleLeturer/ScheduleLecturer';
import { CalendarDays, Filter } from 'lucide-react';
import ScheduleSelectDate from './ScheduleSelectDate/ScheduleSelectDate';
export default function Schedule() {
    const searchParams = useSearchParams();
    const date = searchParams.get("date") ?? "";
    const { data: scheduleData } = useGetSchedule(date);
    return (
        <section className="space-y-6 p-4 md:p-6 mt-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
                                <CalendarDays className="h-5 w-5" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Lịch của tôi
                            </h1>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Theo dõi lịch giảng dạy của bạn theo ngày.
                        </p>
                    </div>

                    {(date) && (
                        <div className="flex flex-wrap gap-2">
                            {date && (
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800">
                                    Ngày: {date}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
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

                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ngày
                        </label>
                        <ScheduleSelectDate />
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 md:p-5">
                {scheduleData ? (
                    <ScheduleLecturer data={scheduleData} />
                ) : (
                    <div className="flex min-h-55 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-neutral-800">
                            <CalendarDays className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>

                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            Không có dữ liệu lịch
                        </h3>
                        <p className="mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">
                            Hiện tại chưa có lịch phù hợp với bộ lọc bạn đã chọn. Hãy thử thay đổi
                            loại lịch hoặc ngày để tìm kết quả khác.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}