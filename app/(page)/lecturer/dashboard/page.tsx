"use client"
import { useGetOverview } from "@/hooks/lecturer/dashboard/useGetOverview"
import Overview from "./Overview/Overview";
import { useAvgGradeClass } from '@/hooks/lecturer/dashboard/useAvgGradeClass';
import { useGetCourseSectionSimple } from '@/hooks/lecturer/simple/useGetCourseSectionSimple';
import { useState } from "react";
import AvgGradeClass from "./AvgGradeClass/AvgGradeClass";
export default function DashboardLecturer() {
    const [courseSectionId, setCourseSectionId] = useState<number>(0);
    const { data: overviewData } = useGetOverview();
    const { data: courseSectionLecturerData } = useGetCourseSectionSimple();
    const courseSection = courseSectionLecturerData ?? [];
    const activeCourseSectionId = courseSectionId || courseSection[0]?.id || 0;
    console.log(courseSectionLecturerData);
    const { data: avgGradeClassData } = useAvgGradeClass(activeCourseSectionId);
    return (
        <div className="mt-10">
            {overviewData && <Overview data={overviewData} />}
            {avgGradeClassData && <AvgGradeClass data={avgGradeClassData ?? []}
                courseSection={courseSection}
                selectedId={activeCourseSectionId}
                onSelectId={setCourseSectionId} />}
        </div>
    )
}