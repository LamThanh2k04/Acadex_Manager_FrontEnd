"use client"
import { useGetInfoStudentOfStudent } from "@/hooks/student/useStudentInfo";
import StudentInfoClient from "./StudentInfoClient/StudentInfoClient";
import StudentInfoLoading from "./loading";
export default function StudentInfo() {
    const { data, isLoading } = useGetInfoStudentOfStudent();
    if (isLoading) {
        return (
            <StudentInfoLoading />
        )
    }
    return (
        <div>
            {data && <StudentInfoClient data={data} />}
        </div>
    )
}