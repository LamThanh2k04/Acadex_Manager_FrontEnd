import ScheduleLecturerSkeleton from "./ScheduleLeturer/ScheduleLecturerSkeleton";
import ScheduleSelectDateSkeleton from "./ScheduleSelectDate/ScheduleSelectDateSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
export default function ScheduleLoading() {
    return (
        <section className="space-y-6 p-4 md:p-6 mt-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-7 w-32" />
                </div>
                <Skeleton className="h-4 w-48" />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-9 w-9 rounded-xl" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                </div>
                <ScheduleSelectDateSkeleton />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <ScheduleLecturerSkeleton />
            </div>
        </section>
    );
}