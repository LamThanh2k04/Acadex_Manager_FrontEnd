"use client"
import { useGetAllFaculties } from "@/hooks/admin/useFaculty"
import FacultyTable from "./FacultyTable/FacultyTable";
import { useSearchParams } from "next/navigation";
import FacultyTableSkeleton from "./FacultyTable/FacultyTableSkeleton";
export default function Falcuties() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: facultyData, isLoading: isLoadingFacultyData } = useGetAllFaculties(search, page);
    console.log(facultyData);
    return (
        <div>
            {isLoadingFacultyData ? <FacultyTableSkeleton /> : facultyData && <FacultyTable data={facultyData} />}
        </div>
    )
}   