"use client"
import { useGetSemesterOrderProgram, useGetSubjetsBySemesterOrderProgram } from '@/hooks/student/useCurriculumFramework';
import { useEffect, useState } from 'react';
import CurriculumFrameworkSkeleton from './CurriculumFramework/CurriculumFrameworkSkeleton';
import CurriculumFrameworkClient from './CurriculumFramework/CurriculumFrameworkClient';
export default function CurriculumFramework() {
    const [selectedSemesterOrder, setSelectedSemesterOrder] = useState<number | null>(null);
    const { data: semesterOrderProgramData, isLoading: isLoadingSemesterOrderProgram } = useGetSemesterOrderProgram();
    useEffect(() => {
        if (semesterOrderProgramData && semesterOrderProgramData.semesters.length > 0) {
            setSelectedSemesterOrder(semesterOrderProgramData.semesters[0].semesterOrder);
        };
    }, [semesterOrderProgramData]);
    const { data: subjectBySemesterOrderProgram, isLoading: isLoadingSubjectBySemesterOrderProgram } = useGetSubjetsBySemesterOrderProgram(selectedSemesterOrder as number);
    if (isLoadingSemesterOrderProgram || isLoadingSubjectBySemesterOrderProgram) {
        return <CurriculumFrameworkSkeleton />
    };
    if (isLoadingSemesterOrderProgram || !semesterOrderProgramData) {
        return <CurriculumFrameworkSkeleton />
    }
    return (
        <div>
            <CurriculumFrameworkClient data={semesterOrderProgramData} subjects={subjectBySemesterOrderProgram ?? {
                subjects: { mandatorySubjects: [], electiveSubjects: [] }
            }} selectedSemesterOrder={selectedSemesterOrder} onChangeSubject={setSelectedSemesterOrder} />
        </div>
    )
}