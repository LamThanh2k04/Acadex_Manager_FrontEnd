"use client"
import { useGetAllMajors } from "@/hooks/admin/useMajor"
import { useSearchParams } from "next/navigation";
import MajorTable from "./MajorTable/MajorTable";

export default function Majors() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1")
    const { data: majorData, isLoading: isLoadingMajorData } = useGetAllMajors(search, page);
    console.log(majorData);
    return (
        <div>
            {isLoadingMajorData ? "" : majorData && <MajorTable data={majorData} />}
        </div>
    )
}