"use client"
import { useGetOverview } from "@/hooks/lecturer/dashboard/useGetOverview"
import Overview from "./Overview/Overview";
export default function DashboardLecturer() {
    const { data: overviewData } = useGetOverview();
    return (
        <div className="mt-10">
            <Overview data={overviewData} />
        </div>
    )
}