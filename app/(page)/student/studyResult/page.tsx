"use client"
import { useGetCertificationProgram } from '@/hooks/student/useCertification';
import { useGetDetailedStudyResult } from '@/hooks/student/useStudyResult';
import CertificationProgramResult from './CertificationProgramRsult/CertificationProgramResult';
import DetailedStudyResult from './DetailedStudyResult/DetailedStudyResult';
import StudyResultTitle from './StudyResultTitle/StudyResultTitle';
import StudyResultLoading from './loading';
export default function StudyResult() {
    const { data: studyResultData, isLoading: isLoadingStudyResult } = useGetDetailedStudyResult();
    const { data: certificationProgramData, isLoading: isLoadingCertificationProgram } = useGetCertificationProgram();
    if (isLoadingStudyResult || isLoadingCertificationProgram) {
        return (
            <StudyResultLoading />
        )
    }
    return (
        <div>
            <StudyResultTitle />
            {certificationProgramData && <CertificationProgramResult data={certificationProgramData} />}
            {studyResultData && <DetailedStudyResult data={studyResultData} />}
        </div>
    )
}