"use client"

import { useOverView } from "@/hooks/useOverview"

export default function DashboardAdmin() {
    const { data, isLoading, isError } = useOverView();

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }
    return (
        <div>
            <h1>Doanh thu: {data?.totalRevenue}</h1>
            <p>Học viên: {data?.totalStudents}</p>
        </div>
    );
}