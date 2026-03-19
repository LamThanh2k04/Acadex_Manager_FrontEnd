'use client'
import { useGetAllPeriod } from "@/hooks/admin/usePeriod"
import { useSearchParams } from "next/navigation";
import PeriodTableSkeleton from "./PeriodTable/PeriodTableSkeleton";
import PeriodTable from "./PeriodTable/PeriodTable";
export default function Periods() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllPeriod(search, page);
    return (
        <div>
            {isLoading ? <PeriodTableSkeleton /> : data && <PeriodTable data={data} />}
        </div>
    )
}