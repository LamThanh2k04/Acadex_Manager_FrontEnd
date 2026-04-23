import { Skeleton } from "@/components/ui/skeleton";
export default function TitleSkeleton() {
    return (
        <div className="mt-7 overflow-hidden bg-white dark:bg-gray-900 rounded-[32px] p-6 relative shadow-sm">
            <div className="flex flex-col items-center text-center">
                <Skeleton className="w-32 h-32 rounded-full mb-4" />
                <Skeleton className="h-5 w-64 mb-2" />
                <Skeleton className="h-6 w-28 rounded-full mt-2" />
                <div className="mt-6 w-full border-t border-blue-200/50 pt-6 space-y-4 md:grid md:grid-cols-4 md:space-y-0 text-left">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-2.5 w-14" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}