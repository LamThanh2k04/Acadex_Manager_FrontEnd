"use client"
import { useGetAllNotification } from "@/hooks/admin/useNotification"
import { useSearchParams } from "next/navigation"
import NotificationTable from "./NotificationTable/NotificationTable";
import NotificationTableSkeleton from "./NotificationTable/NotificationTableSkeleton";
export default function Notifications() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data, isLoading } = useGetAllNotification(search, page);
    return (
        <div>
            {isLoading ? <NotificationTableSkeleton /> : data && <NotificationTable data={data} />}
        </div>
    )
}