import { Skeleton } from "@/components/ui/skeleton";
export default function CourseSectionLoading() {
    return (
        <div className="container mx-auto p-4 space-y-6 mt-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-3 w-72" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-24 shrink-0" />
                    <Skeleton className="h-9 w-50 rounded-xl" />
                </div>
            </div>

            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1.5 h-4 bg-[#ec5d15] rounded-full shrink-0" />
                        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                            Danh sách môn học mở
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                <div className="space-y-1.5 flex-1">
                                    <Skeleton className="h-4 w-52" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-4 w-12 rounded-full shrink-0" />
                                <Skeleton className="h-8 w-24 rounded-xl shrink-0" />
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-gray-100 dark:border-gray-800" />
                <section>
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1.5 h-4 bg-emerald-500 rounded-full shrink-0" />
                        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                            Học phần đã đăng ký thành công
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                <div className="space-y-1.5 flex-1">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-3 w-28" />
                                </div>
                                <Skeleton className="h-5 w-20 rounded-full shrink-0" />
                                <Skeleton className="h-8 w-20 rounded-xl shrink-0" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}