"use client"
import { useGetAllSemester } from "@/hooks/admin/useSemester"
import { useSearchParams } from "next/navigation";
import SemesterTableSkeleton from "./SemesterTable/SemesterTableSkeleton";
import SemesterTable from "./SemesterTable/SemesterTable";
export default function Semesters() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllSemester(search, page);
    return (
        <div>
            {isLoading ? <SemesterTableSkeleton /> : data && <SemesterTable data={data} />}
        </div>
    )
}