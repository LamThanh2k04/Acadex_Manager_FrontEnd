"use client"
import { useGetAllSubjects } from "@/hooks/admin/useSubject"
import { useSearchParams } from "next/navigation";
import SubjectTableSkeleton from "./SubjectTable/SubjectTableSkeleton";
import SubjectTable from "./SubjectTable/SubjectTable";
export default function Subjects() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllSubjects(search, page);
    return (
        <div>
            {isLoading ? <SubjectTableSkeleton /> : data && <SubjectTable data={data} />}
        </div>
    )
}