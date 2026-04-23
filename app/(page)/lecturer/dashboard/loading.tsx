import TitleSkeleton from "../components/Title/TitleSkeleton";
import AvgGradeClassSkeleton from "./AvgGradeClass/AvgGradeClassSkeleton";
import OverviewSkeleton from "./Overview/OverviewSkeleton";
import TopStudentSkeleton from "./TopStudent/TopStudentSkeleton";

export default function DashboardLoading() {
    return (
        <div>
            <OverviewSkeleton />
            <AvgGradeClassSkeleton />
            <TopStudentSkeleton />
        </div>
    )
}