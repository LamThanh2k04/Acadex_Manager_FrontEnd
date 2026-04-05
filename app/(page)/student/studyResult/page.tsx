"use client"
import { useGetCertificationProgram } from '@/hooks/student/useCertification';
import { useGetDetailedStudyResult } from '@/hooks/student/useStudyResult';
import CertificationProgramResult from './CertificationProgramRsult/CertificationProgramResult';
import DetailedStudyResult from './DetailedStudyResult/DetailedStudyResult';
export default function StudyResult() {
    const { data: studyResultData } = useGetDetailedStudyResult();
    const { data: certificationProgramData } = useGetCertificationProgram();
    return (
        <div>
            {certificationProgramData && <CertificationProgramResult data={certificationProgramData} />}
            {studyResultData && <DetailedStudyResult />}
        </div>
    )
}