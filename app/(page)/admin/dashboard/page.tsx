"use client"
import { useRevenueChart } from "@/hooks/useRevenueChart";
import Overview from "./Overview";
import { useOverView } from '@/hooks/useOverview';
import { RevenueAreaInteractive } from "./RevenueAreaInteractive";
import { useState } from "react";
export default function DashboardAdmin() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { data: dataChart, isLoading: isLoadingRevenueChart } = useRevenueChart(selectedYear);
    const { data: dataOverview, isLoading: isLoadingOverview } = useOverView();
    if (isLoadingOverview || (isLoadingRevenueChart && !dataChart)) {
        return <div className="h-screen flex items-center justify-center">Đang tải dữ liệu...</div>
    }
    return (
        <div className="flex flex-col gap-6 p-6">
            <Overview data={dataOverview!} />
            <div className="bg-white border p-6 rounded-xl border-orange-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Thống kê doanh thu</h2>
                <RevenueAreaInteractive
                    data={dataChart!}
                    year={selectedYear}
                    setYear={setSelectedYear}
                />
            </div>
        </div>
    );
}