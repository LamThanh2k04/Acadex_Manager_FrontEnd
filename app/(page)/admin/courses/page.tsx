"use client"
import { useGetAllCourse } from "@/hooks/admin/useCourse"
import { useSearchParams } from "next/navigation"
import CourseTableSkeleton from "./CourseTable/CourseTableSkeleton";
import CourseTable from "./CourseTable/CourseTable";
export default function Courses() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllCourse(search, page)
    return (
        <div>
            {isLoading ? <CourseTableSkeleton /> : data && <CourseTable data={data} />}
        </div>
    )
}