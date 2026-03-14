"use client"
import { usePassFailBarChart, usePieChartGenders, useRevenueChart } from "@/hooks/admin/useChart";
import Overview from "./Overview/Overview";
import { useOverView, useTopStudentGPA } from '@/hooks/admin/useOverview';
import { RevenueAreaInteractive } from "./RevenueAreaInteractive/RevenueAreaInteractive";
import { useState } from "react";
import OverviewSkeleton from "./Overview/OverviewSkeleton";
import RevenueAreaInteractiveSkeleton from "./RevenueAreaInteractive/RevenueAreaInteractiveSkeleton";
import PieChartGenders from "./PieChartGenders/PieChartGenders";
import TopStudentGPASkeleton from "./TopStudentGPA/TopStudentGPASkeleton";
import TopStudentGPA from "./TopStudentGPA/TopStudentGPA";
import BarChartPassFailSkeleton from "./BarChartPassFail/BarChartPassFailSkeleton";
import BarChartPassFail from "./BarChartPassFail/BarChartPassFail";
export default function DashboardAdmin() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedRole, setSelectedRole] = useState("LECTURER");
    const { data: dataRevenueChart, isLoading: isLoadingRevenueChart } = useRevenueChart(selectedYear);
    const { data: dataOverview, isLoading: isLoadingOverview } = useOverView();
    const { data: dataPieChartGenders, isLoading: isLoadingPieChartGenders } = usePieChartGenders(selectedRole);
    const { data: dataTopStudent, isLoading: isLoadingTopStudent } = useTopStudentGPA();
    const { data: dataPassFail, isLoading: isLoadingPassFail } = usePassFailBarChart()
    return (
        <div className="flex flex-col gap-6 p-6">
            {isLoadingOverview ? <OverviewSkeleton /> : dataOverview && <Overview data={dataOverview} />}
            <div className="bg-white border p-6 rounded-xl border-orange-100 shadow-sm">
                {isLoadingRevenueChart ? <RevenueAreaInteractiveSkeleton />
                    :
                    dataRevenueChart && <RevenueAreaInteractive
                        data={dataRevenueChart}
                        year={selectedYear}
                        setYear={setSelectedYear}
                    />}
            </div>
            <div className="bg-white border p-6 rounded-xl border-orange-100 shadow-sm">
                {isLoadingPieChartGenders ? <RevenueAreaInteractiveSkeleton /> : dataPieChartGenders && <PieChartGenders
                    data={dataPieChartGenders}
                    role={selectedRole}
                    setRole={setSelectedRole}
                />}
            </div>
            <div className="bg-white border p-6 rounded-xl border-orange-100 shadow-sm">
                {isLoadingTopStudent ? <TopStudentGPASkeleton /> : dataTopStudent && <TopStudentGPA data={dataTopStudent} />}
            </div>
            <div>
                {isLoadingPassFail ? <BarChartPassFailSkeleton /> : dataPassFail && <BarChartPassFail data={dataPassFail} />}
            </div>
        </div>
    );
}