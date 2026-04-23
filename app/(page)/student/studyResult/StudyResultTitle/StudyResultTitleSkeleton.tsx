import { Skeleton } from "@/components/ui/skeleton";

export default function StudyResultTitleSkeleton() {
    return (
        <div className="mt-10 p-3 space-y-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-3 w-80" />
        </div>
    );
}