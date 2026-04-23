"use client"
import { useGetCertificationProgram, useGetCertificationStudent } from '@/hooks/student/useCertification';
import CertificationTitle from './CertificationTitle/CertificationTitle';
import CertificationStudent from './CertificationStudent/CertificationStudent';
import CertificationProgram from './CertificationProgram/CertificationProgram';
import CertificationProgramSkeleton from './CertificationProgram/CertificationProgramSkeleton';
import CertificationStudentSkeleton from './CertificationStudent/CertificationStudentSkeleton';
export default function Certification() {
    const { data: certificationProgram, isLoading: isLoadingCertificationProgram } = useGetCertificationProgram();
    const { data: certificationStudent, isLoading: isLoadingCertificationStudent } = useGetCertificationStudent();
    const isLoading = isLoadingCertificationProgram || isLoadingCertificationStudent;
    return (
        <div>
            <CertificationTitle />
            {isLoading ? (
                <>
                    <CertificationProgramSkeleton />
                    <CertificationStudentSkeleton />
                </>
            ) : (
                <>
                    {certificationProgram && certificationStudent && (
                        <CertificationProgram
                            dataCertificationProgram={certificationProgram}
                            dataCertificationStudent={certificationStudent}
                        />
                    )}
                    {certificationStudent && (
                        <CertificationStudent data={certificationStudent} />
                    )}
                </>
            )}
        </div>
    )
}