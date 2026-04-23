import { Skeleton } from "@/components/ui/skeleton";

export default function CertificationProgramSkeleton() {
    return (
        <div className="ml-3 border p-5 rounded-xl w-90 md:w-115 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-5 w-52" />
                <Skeleton className="h-4 w-20" />
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <Skeleton className="h-full w-1/3 rounded-full" />
            </div>
            <Skeleton className="h-3 w-48 mt-1.5" />
        </div>
    );
}