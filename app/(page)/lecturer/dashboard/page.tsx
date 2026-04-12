"use client"
import { useGetOverview } from "@/hooks/lecturer/dashboard/useGetOverview"
import Overview from "./Overview/Overview";
import { useAvgGradeClass } from '@/hooks/lecturer/dashboard/useAvgGradeClass';
import { useGetCourseSectionSimple } from '@/hooks/lecturer/simple/useGetCourseSectionSimple';
import { useState } from "react";
import AvgGradeClass from "./AvgGradeClass/AvgGradeClass";
import { useGetTopStudent } from '@/hooks/lecturer/dashboard/useGetTopStudent';
import TopStudent from "./TopStudent/TopStudent";
export default function DashboardLecturer() {
    const [courseSectionId, setCourseSectionId] = useState<number>(0);
    const { data: overviewData } = useGetOverview();
    const { data: courseSectionLecturerData } = useGetCourseSectionSimple();
    const courseSection = courseSectionLecturerData ?? [];
    const activeCourseSectionId = courseSectionId || courseSection[0]?.id || 0;
    const { data: avgGradeClassData } = useAvgGradeClass(activeCourseSectionId);
    const { data: topStudentData } = useGetTopStudent(activeCourseSectionId);
    return (
        <div className="flex flex-col gap-5 p-2">
            {overviewData && <Overview data={overviewData} />}
            {avgGradeClassData && <AvgGradeClass data={avgGradeClassData ?? []}
                courseSection={courseSection}
                selectedId={activeCourseSectionId}
                onSelectId={setCourseSectionId} />}
            {topStudentData && <TopStudent data={topStudentData ?? []}
                courseSection={courseSection}
                selectedId={activeCourseSectionId}
                onSelectId={setCourseSectionId} />}
        </div>
    )
}