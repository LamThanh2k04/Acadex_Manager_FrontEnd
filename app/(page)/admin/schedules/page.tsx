"use client"
import { useGetAllSchedule } from "@/hooks/admin/useSchedule"
import { useSearchParams } from "next/navigation"
import ScheduleTableSkeleton from "./ScheduleTable/ScheduleTableSkeleton";
import ScheduleTable from "./ScheduleTable/ScheduleTable";
export default function Schedules() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllSchedule(search, page);
    return (
        <div>
            {isLoading ? <ScheduleTableSkeleton /> : data && <ScheduleTable data={data} />}
        </div>
    )
}