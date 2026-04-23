import { Skeleton } from "@/components/ui/skeleton";
import SearchBarSkeleton from "../SearchBar/SearchBarSkeleton";
function LecturerCardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-none p-4">
            <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-[52px] h-[52px] rounded-full shrink-0" />
                <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2">
                {["Khoa", "Ngành", "Sĩ số"].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-3 w-14 shrink-0" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                ))}
            </div>
        </div>
    );
}
function StudentCardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-3">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3 w-20 shrink-0" />
            </div>
            <Skeleton className="h-3 w-48 mt-2 ml-[52px]" />
        </div>
    );
}
function StudentTableRowSkeleton() {
    return (
        <div className="grid grid-cols-[2fr_1fr_1.2fr_1.5fr] gap-3 px-4 py-3 border-b border-gray-100 last:border-0 items-center">
            <div className="flex items-center gap-2.5">
                <Skeleton className="w-[30px] h-[30px] rounded-full shrink-0" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
        </div>
    );
}

export default function HomeroomClassSkeleton() {
    return (
        <div className="w-full space-y-4 mt-5 p-3 md:p-5">
            <LecturerCardSkeleton />
            <SearchBarSkeleton />
            <div className="flex flex-col gap-2.5 md:hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <StudentCardSkeleton key={i} />
                ))}
            </div>
            <div className="hidden md:block rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1.2fr_1.5fr] gap-3 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-100">
                    {["Họ tên", "MSSV", "Ngành", "Email"].map((h) => (
                        <span key={h} className="text-xs font-medium text-gray-500 dark:text-[#eebbc3]">{h}</span>
                    ))}
                </div>
                {Array.from({ length: 8 }).map((_, i) => (
                    <StudentTableRowSkeleton key={i} />
                ))}
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
                <Skeleton className="h-8 w-8 rounded-lg" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-lg" />
                ))}
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
        </div>
    );
}