import CertificationProgramResultSkeleton from "./CertificationProgramRsult/CertificationProgramResultSkeleton";
import StudyResultSkeleton from "./DetailedStudyResult/DetailedStudyResultSkeleton";
import StudyResultTitleSkeleton from "./StudyResultTitle/StudyResultTitleSkeleton";

export default function StudyResultLoading() {
    return (
        <div>
            <StudyResultTitleSkeleton />
            <StudyResultSkeleton />
            <CertificationProgramResultSkeleton />
        </div>
    )
}