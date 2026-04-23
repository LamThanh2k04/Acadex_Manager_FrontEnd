import { Skeleton } from "@/components/ui/skeleton";

function CertificationCardSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <div className="shrink-0 md:flex-col flex items-start justify-between">
                <Skeleton className="w-25 h-25 rounded-xl" />
                <Skeleton className="h-7 w-24 rounded-2xl" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-3 w-48" />
            </div>
        </div>
    );
}

export default function CertificationStudentSkeleton() {
    return (
        <div className="space-y-4 p-5">
            <div className="pt-2 flex items-center justify-start">
                <Skeleton className="h-9 w-32 rounded-xl" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
                <CertificationCardSkeleton key={i} />
            ))}
        </div>
    );
}