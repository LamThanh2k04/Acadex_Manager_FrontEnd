import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, UserRound, BookOpen } from "lucide-react";
function InfoRowSkeleton() {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
            <Skeleton className="size-[18px] rounded-md shrink-0" />
            <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-40" />
            </div>
        </div>
    );
}
export default function StudentInfoSkeleton() {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg dark:border-gray-900 dark:bg-gray-900">
                <div className="h-28 md:h-36 bg-gradient-to-r from-[#ec5d15] via-[#f07835] to-[#f6a26a]" />
                <div className="relative px-5 md:px-8 pb-8">
                    <div className="-mt-12 md:-mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-white shrink-0" />
                            <div className="md:mt-4 space-y-2">
                                <Skeleton className="h-7 w-52" />
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-6 w-24 rounded-full mt-3" />
                            </div>
                        </div>
                        <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 shadow-sm dark:border-orange-900/30 dark:bg-orange-900/10">
                            <div className="flex items-center gap-2">
                                <GraduationCap size={18} className="text-[#ec5d15]" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <Skeleton className="h-3 w-36 mt-1" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-white p-5 md:p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-[#ec5d15]">
                        <UserRound size={22} />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-3 w-52" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <InfoRowSkeleton key={i} />
                    ))}
                </div>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-white p-5 md:p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-[#ec5d15]">
                        <BookOpen size={22} />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-3 w-64" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <InfoRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}