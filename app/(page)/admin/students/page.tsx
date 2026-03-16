"use client"
import { useGetAllStudent } from "@/hooks/admin/useStudent"
import StudentTable from "./StudentTable/StudentTable";
import { useSearchParams } from "next/navigation";
import StudentTableSkeleton from "./StudentTable/StudentTableSkeleton";
export default function Students() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: dataStudentTable, isLoading } = useGetAllStudent(search, page);
    return (
        <>
            {isLoading ? <StudentTableSkeleton /> : dataStudentTable &&
                <StudentTable data={dataStudentTable} />}
        </>
    )
}