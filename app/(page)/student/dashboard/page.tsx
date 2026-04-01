"use client"
import { useGetEnrollmentBySemester, useGetInfoStudent, useGetTotalScoreForChart, useGetResultStudyCreditsForPieChart } from '@/hooks/student/useDashboard';
import StudentInfo from "./StudentInfo/StudentInfo";
import StudentInfoSkeleton from "./StudentInfo/StudentInfoSkeleton";
import EnrollmentTableSkeleton from "./EnrollmentTable/EnrollmentTableSkeleton";
import EnrollmentTable from "./EnrollmentTable/EnrollmentTable";
import { useEffect, useState } from "react";
import { useGetAllSemestersSimple } from '@/hooks/student/useSimple';
import TotalScoreForChartSkeleton from "./TotalScoreForChart/TotalScoreForChartSkeleton";
import TotalScoreForChart from "./TotalScoreForChart/TotalScoreForChart";
import ResultStudyCreditsForPieChartSkeleton from './ResultStudyCreditsForPieChart/ResultStudyCreditsForPieChartSkeleton';
import ResultStudyCreditsForPieChart from './ResultStudyCreditsForPieChart/ResultStudyCreditsForPieChart';
import StudentShortcut from './StudentShortcut/StudentShortcut';
export default function DashboardStudent() {
    const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(null);
    const { data: infoStudentData, isLoading: isLoadingInfoStudent } = useGetInfoStudent();
    const { data: semestersSimpleData, isLoading: isLoadingSemestersSimple } = useGetAllSemestersSimple();
    useEffect(() => {
        if (semestersSimpleData && semestersSimpleData.length > 0) {
            setSelectedSemesterId(semestersSimpleData[0].id);
        }
    }, [semestersSimpleData]);
    const { data: enrollmentBySemesterData, isLoading: isLoadingEnrollmentBySemester } = useGetEnrollmentBySemester(selectedSemesterId as number);
    const { data: totalScoreForChartData, isLoading: isLoadingTotalScoreForChart } = useGetTotalScoreForChart(selectedSemesterId as number);
    const { data: resultStudyCreditsForPieChartData, isLoading: isLoadingResultStudyCreditsForPieChart } = useGetResultStudyCreditsForPieChart();
    return (
        <div className="gap-2">
            {isLoadingInfoStudent ? <StudentInfoSkeleton /> : infoStudentData && <StudentInfo data={infoStudentData} />}
            <StudentShortcut />
            {isLoadingEnrollmentBySemester || isLoadingSemestersSimple ? <EnrollmentTableSkeleton /> : enrollmentBySemesterData && <EnrollmentTable enrollments={enrollmentBySemesterData ?? []} semesters={semestersSimpleData ?? []} selectedSemesterId={selectedSemesterId} onChangeSemester={setSelectedSemesterId} />}
            {isLoadingTotalScoreForChart || isLoadingSemestersSimple ? <TotalScoreForChartSkeleton /> : totalScoreForChartData && <TotalScoreForChart data={totalScoreForChartData ?? []} semesters={semestersSimpleData ?? []} selectedSemesterId={selectedSemesterId} onChangeSemester={setSelectedSemesterId} />}
            {isLoadingResultStudyCreditsForPieChart ? <ResultStudyCreditsForPieChartSkeleton /> : resultStudyCreditsForPieChartData && <ResultStudyCreditsForPieChart data={resultStudyCreditsForPieChartData} />}
        </div>
    )
}   