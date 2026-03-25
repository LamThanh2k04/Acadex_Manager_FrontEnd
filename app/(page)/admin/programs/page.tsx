"use client"
import { useGetAllProgram } from "@/hooks/admin/useProgram"
import { useSearchParams } from "next/navigation";
import ProgramTableSkeleton from "./ProgramTable/ProgramTableSkeleton";
import ProgramTable from "./ProgramTable/ProgramTable";
export default function Programs() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllProgram(search, page);
    return (
        <div>
            {isLoading ? <ProgramTableSkeleton /> : data && <ProgramTable data={data} />}
        </div>
    )
}