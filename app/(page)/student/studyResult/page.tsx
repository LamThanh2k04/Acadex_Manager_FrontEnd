"use client"
import { useGetCertificationProgram } from '@/hooks/student/useCertification';
import { useGetDetailedStudyResult } from '@/hooks/student/useStudyResult';
import CertificationProgramResult from './CertificationProgramRsult/CertificationProgramResult';
import DetailedStudyResult from './DetailedStudyResult/DetailedStudyResult';
import StudyResultTitle from './StudyResultTitle/StudyResultTitle';
export default function StudyResult() {
    const { data: studyResultData } = useGetDetailedStudyResult();
    const { data: certificationProgramData } = useGetCertificationProgram();
    return (
        <div>
            <StudyResultTitle />
            {certificationProgramData && <CertificationProgramResult data={certificationProgramData} />}
            {studyResultData && <DetailedStudyResult data={studyResultData} />}
        </div>
    )
}