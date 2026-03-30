"use client"
import { useGetInfoStudentOfStudent } from "@/hooks/student/useStudentInfo";
import StudentInfoClient from "./StudentInfoClient/StudentInfoClient";
import StudentInfoClientSkeleton from "./StudentInfoClient/StudentInfoClientSkeleton";
export default function StudentInfo() {
    const { data, isLoading } = useGetInfoStudentOfStudent();
    return (
        <div>
            {isLoading ? <StudentInfoClientSkeleton /> : data && <StudentInfoClient data={data} />}
        </div>
    )
}