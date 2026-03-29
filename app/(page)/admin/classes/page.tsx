"use client"
import { useGetAllClasses } from "@/hooks/admin/useClasses"
import ClassesTable from "./ClassesTable/ClassesTable";
import { useSearchParams } from "next/navigation";
import ClassesTableSkeleton from "./ClassesTable/ClassesTableSkeleton";
export default function Classes() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: classesData, isLoading: isLoadingClassesData } = useGetAllClasses(search, page);
    console.log(classesData);
    return (
        <div>
            {isLoadingClassesData ? <ClassesTableSkeleton /> : classesData && <ClassesTable data={classesData} />}
        </div>
    )
}