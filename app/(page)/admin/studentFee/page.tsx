"use client"
import { useGetStudentsTuitionStatus } from "@/hooks/admin/useStudentFee";
import { useSearchParams } from "next/navigation";
import StudentFeeTableSkeleton from "./StudentFeeTable/StudentFeeTableSkeleton";
import StudentFeeTable from "./StudentFeeTable/studentFeeTable";
export default function StudentFee() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetStudentsTuitionStatus(status, page);
    return (
        <div>
            {isLoading ? <StudentFeeTableSkeleton /> : data && <StudentFeeTable data={data} />}
        </div>
    );
}