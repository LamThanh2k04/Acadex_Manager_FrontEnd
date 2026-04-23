import { Skeleton } from "@/components/ui/skeleton";
export default function CertificationTitleSkeleton() {
    return (
        <div className="mt-5 p-5 space-y-2">
            <Skeleton className="h-7 w-72 mb-2" />
            <Skeleton className="h-4 w-96" />
        </div>
    );
}