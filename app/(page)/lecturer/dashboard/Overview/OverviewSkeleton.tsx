import { Skeleton } from "@/components/ui/skeleton";
export default function OverviewSkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4 rounded-2xl border border-orange-100 dark:border-none">
                    <Skeleton className="w-9 h-9 rounded-full mb-2" />
                    <Skeleton className="h-2.5 w-20 mb-1" />
                    <Skeleton className="h-6 w-12 mt-1" />
                </div>
            ))}
        </div>
    );
}