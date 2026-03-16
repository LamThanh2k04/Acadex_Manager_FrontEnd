"use client"
import { useGetAllLecturer } from "@/hooks/admin/useLecturer"
import LecturerTableSkeleton from "./LecturerTable/LecturerTableSkeleton";
import LecturerTable from "./LecturerTable/LecturerTable";
import { useSearchParams } from "next/navigation";

export default function Lecturers() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: lecturerData, isLoading: isLoadingLecturerData } = useGetAllLecturer(search, page);
    return (
        <div>
            {isLoadingLecturerData ? <LecturerTableSkeleton /> : lecturerData && <LecturerTable data={lecturerData} />}
        </div>
    )
}