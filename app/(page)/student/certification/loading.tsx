import CertificationProgramSkeleton from "./CertificationProgram/CertificationProgramSkeleton";
import CertificationStudentSkeleton from "./CertificationStudent/CertificationStudentSkeleton";
import CertificationTitleSkeleton from "./CertificationTitle/CertificationTitleSkeleton";

export default function CertificationLoading() {
    return (
        <div>
            <CertificationTitleSkeleton />
            <CertificationProgramSkeleton />
            <CertificationStudentSkeleton />
        </div>
    )
}