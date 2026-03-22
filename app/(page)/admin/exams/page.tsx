"use client"
import { useGetAllExamSchedule } from "@/hooks/admin/useExam"
import { useSearchParams } from "next/navigation";
import ExamTableSkeleton from "./ExamTable/ExamTableSkeleton";
import ExamTable from "./ExamTable/ExamTable";
export default function Exams() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllExamSchedule(search, page);
    return (
        <div>
            {isLoading ? <ExamTableSkeleton /> : data && <ExamTable data={data} />}
        </div>
    )
}