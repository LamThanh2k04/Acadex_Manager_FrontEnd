"use client"
import { usePassFailBarChart, usePieChartGenders, useRevenueChart } from "@/hooks/admin/useChart";
import Overview from "./Overview/Overview";
import { useOverView, useScheduleCalendar, useTopStudentGPA } from '@/hooks/admin/useOverview';
import { RevenueAreaInteractive } from "./RevenueAreaInteractive/RevenueAreaInteractive";
import { useState } from "react";
import OverviewSkeleton from "./Overview/OverviewSkeleton";
import RevenueAreaInteractiveSkeleton from "./RevenueAreaInteractive/RevenueAreaInteractiveSkeleton";
import PieChartGenders from "./PieChartGenders/PieChartGenders";
import TopStudentGPASkeleton from "./TopStudentGPA/TopStudentGPASkeleton";
import TopStudentGPA from "./TopStudentGPA/TopStudentGPA";
import BarChartPassFailSkeleton from "./BarChartPassFail/BarChartPassFailSkeleton";
import BarChartPassFail from "./BarChartPassFail/BarChartPassFail";
import ScheduleCalendarSkeleton from "./ScheduleCalendar/ScheduleCalendarSkeleton";
import ScheduleCalendar from "./ScheduleCalendar/ScheduleCalendar";
export default function DashboardAdmin() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedRole, setSelectedRole] = useState("LECTURER");
    const [selectedDate, setSelectedDate] = useState("2025-10-27");
    const [selectedPageSchedule, setSelectedPageSchedule] = useState(1);
    const { data: dataRevenueChart, isLoading: isLoadingRevenueChart } = useRevenueChart(selectedYear);
    const { data: dataOverview, isLoading: isLoadingOverview } = useOverView();
    const { data: dataPieChartGenders, isLoading: isLoadingPieChartGenders } = usePieChartGenders(selectedRole);
    const { data: dataTopStudent, isLoading: isLoadingTopStudent } = useTopStudentGPA();
    const { data: dataPassFail, isLoading: isLoadingPassFail } = usePassFailBarChart()
    const { data: dataScheduleCalendar, isLoading: isLoadingScheduleCalendar, isFetching: isFetchingScheduleCalendar } = useScheduleCalendar(selectedDate, selectedPageSchedule)
    const handleSetDateSchedule = (date: string) => {
        setSelectedDate(date);
        setSelectedPageSchedule(1);
    }
    return (
        <div className="flex flex-col bg-gray-50 lg:flex-row lg:items-center lg:justify-center gap-6 p-6 w-full">
            <div className="lg:w-[70%]">
                {isLoadingOverview ? <OverviewSkeleton /> : dataOverview && <Overview data={dataOverview} />}
                <div className="lg:flex lg:items-center lg:justify-evenly md:gap-3 lg:h-[50%] lg:w-full">
                    <div className="bg-white border p-6 rounded-xl border-orange-100 mt-5 shadow-sm">
                        {isLoadingRevenueChart ? <RevenueAreaInteractiveSkeleton />
                            :
                            dataRevenueChart && <RevenueAreaInteractive
                                data={dataRevenueChart}
                                year={selectedYear}
                                setYear={setSelectedYear}
                            />}
                    </div>
                    <div className="bg-white border p-6 lg:p-8 rounded-xl mt-5 border-orange-100 shadow-sm">
                        {isLoadingPieChartGenders ? <RevenueAreaInteractiveSkeleton /> : dataPieChartGenders && <PieChartGenders
                            data={dataPieChartGenders}
                            role={selectedRole}
                            setRole={setSelectedRole}
                        />}
                    </div>
                </div>
                <div className="mt-5">
                    {isLoadingPassFail ? <BarChartPassFailSkeleton /> : dataPassFail && <BarChartPassFail data={dataPassFail} />}
                </div>
            </div>
            <div className="lg:w-[30%]">
                {isLoadingScheduleCalendar ? <ScheduleCalendarSkeleton /> : dataScheduleCalendar && <ScheduleCalendar isFetching={isFetchingScheduleCalendar} data={dataScheduleCalendar} date={selectedDate} setDate={handleSetDateSchedule} page={selectedPageSchedule} setPage={setSelectedPageSchedule} />}
                {isLoadingTopStudent ? <TopStudentGPASkeleton /> : dataTopStudent && <TopStudentGPA data={dataTopStudent} />}
            </div>
        </div >
    );
}