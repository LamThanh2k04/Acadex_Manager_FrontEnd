"use client"
import { useGetAllStudent } from "@/hooks/admin/useStudent"
import StudentTable from "./StudentTable";
import { useSearchParams } from "next/navigation";
import StudentTableSkeleton from "./StudentTableSkeleton";
export default function Students() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1")
    const { data: dataStudentTable, isLoading } = useGetAllStudent(search, page);
    return (
        <>

            {isLoading ? <StudentTableSkeleton /> : dataStudentTable &&
                <StudentTable data={dataStudentTable} />}
        </>
    )
}