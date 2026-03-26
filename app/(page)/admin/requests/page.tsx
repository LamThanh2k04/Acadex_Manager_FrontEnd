"use client"
import { useGetAllRequest } from "@/hooks/admin/useRequest"
import { useSearchParams } from "next/navigation";
import RequestTableSkeleton from "./RequestTable/RequestTableSkeleton";
import RequestTable from "./RequestTable/RequestTable";
export default function Requests() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllRequest(status, page);
    return (
        <div>
            {isLoading ? <RequestTableSkeleton /> : data && <RequestTable data={data} />}
        </div>
    )
}