import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, CheckCircle2 } from "lucide-react";

function UnPaidCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-4 w-56" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
                <div className="shrink-0 md:text-right">
                    <Skeleton className="h-5 w-24 md:ml-auto" />
                </div>
            </div>
        </div>
    );
}
export default function UnPaidEnrollmentSkeleton() {
    return (
        <div className="space-y-5 mt-8">
            <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-orange-500 shrink-0" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl">
                <Skeleton className="w-4 h-4 rounded shrink-0" />
                <Skeleton className="h-3 w-56" />
            </div>
            <div className="space-y-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <UnPaidCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}