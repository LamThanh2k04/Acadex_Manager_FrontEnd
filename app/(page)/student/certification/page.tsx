"use client"
import { useGetCertificationProgram, useGetCertificationStudent } from '@/hooks/student/useCertification';
import CertificationTitle from './CertificationTitle/CertificationTitle';
import CertificationStudent from './CertificationStudent/CertificationStudent';
import CertificationProgram from './CertificationProgram/CertificationProgram';
export default function Certification() {
    const { data: certificationProgram } = useGetCertificationProgram();
    const { data: certificationStudent } = useGetCertificationStudent();
    return (
        <div>
            <CertificationTitle />
            {certificationProgram && certificationStudent && (
                <CertificationProgram dataCertificationProgram={certificationProgram} dataCertificationStudent={certificationStudent} />
            )}
            {certificationStudent && <CertificationStudent />}
        </div>
    )
}