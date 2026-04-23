import { Skeleton } from "@/components/ui/skeleton";
function InfoRowSkeleton() {
    return (
        <div className="flex items-center gap-3">
            <Skeleton className="size-4 rounded-md shrink-0" />
            <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-40" />
            </div>
        </div>
    );
}
function CardSkeleton({ rows = 4, hasTitle = true }: { rows?: number; hasTitle?: boolean }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 dark:bg-gray-900 dark:border-none">
            {hasTitle && <Skeleton className="h-3 w-36 mb-4" />}
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i}>
                        <InfoRowSkeleton />
                        {i < rows - 1 && <div key={`divider-${i}`} className="h-px bg-gray-50" />}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default function LecturerInfoSkeleton() {
    return (
        <div className="max-w-xl mx-auto px-4 py-6 space-y-4 md:grid md:grid-cols-2 md:max-w-7xl md:gap-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center dark:bg-gray-900 dark:border-none">
                <Skeleton className="w-24 h-24 rounded-full mb-3" />
                <Skeleton className="h-6 w-40 mb-1" />
                <Skeleton className="h-4 w-52 mt-0.5" />
                <Skeleton className="h-5 w-28 rounded-full mt-2" />
            </div>
            <CardSkeleton rows={4} />
            <CardSkeleton rows={5} />
            <CardSkeleton rows={4} />
        </div>
    );
}