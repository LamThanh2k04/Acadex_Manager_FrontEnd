"use client"
import { useGetOverview } from "@/hooks/lecturer/dashboard/useGetOverview"
import Overview from "./Overview/Overview";
import { useAvgGradeClass } from '@/hooks/lecturer/dashboard/useAvgGradeClass';
import { useGetCourseSectionSimple } from '@/hooks/lecturer/simple/useGetCourseSectionSimple';
import { useState } from "react";
import AvgGradeClass from "./AvgGradeClass/AvgGradeClass";
import { useGetTopStudent } from '@/hooks/lecturer/dashboard/useGetTopStudent';
import TopStudent from "./TopStudent/TopStudent";
import DashboardLoading from "./loading";
export default function DashboardLecturer() {
    const [courseSectionId, setCourseSectionId] = useState<number | null>(null);
    const { data: overviewData, isLoading: isLoadingOverview } = useGetOverview();
    const { data: courseSectionLecturerData, isLoading: isLoadingCourseSection } = useGetCourseSectionSimple();
    const { data: avgGradeClassData, isLoading: isLoadingAvgGradeClass } = useAvgGradeClass(courseSectionId as number);
    const { data: topStudentData, isLoading: isLoadingTopStudent } = useGetTopStudent(courseSectionId as number);
    const courseSection = courseSectionLecturerData ?? [];
    if (isLoadingOverview || isLoadingCourseSection || isLoadingAvgGradeClass || isLoadingTopStudent) {
        return (
            <DashboardLoading />
        )
    }
    return (
        <div className="flex flex-col gap-5 p-2">
            {overviewData && <Overview data={overviewData} />}
            <AvgGradeClass
                data={avgGradeClassData ?? []}
                courseSection={courseSection}
                selectedId={courseSectionId}
                onSelectId={setCourseSectionId}
            />
            <TopStudent
                data={topStudentData ?? []}
                courseSection={courseSection}
                selectedId={courseSectionId}
                onSelectId={setCourseSectionId}
            />
        </div>
    );
}