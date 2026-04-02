"use client"
import { useGetAllEnrollmentCourseSection, useGetSubjectsBySemester } from "@/hooks/student/useCourseSection";
import { useEffect, useState } from "react";
import SubjectBySemester from "./SubjectBySemester/SubjectBySemester";
import EnrollmentCourseSection from "./EnrollmentCourseSection/EnrollmentCourseSection";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAllSemestersSimple } from "@/hooks/student/useSimple";
import SubjectBySemesterSkeleton from "./SubjectBySemester/SubjectBySemesterSkeleton";
import EnrollmentCourseSectionSkeleton from "./EnrollmentCourseSection/EnrollmentCourseSectionSkeleton";

export default function CourseSection() {
    const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(null);
    const { data: semesterSimpleData, isLoading: isLoadingSemesterSimple } = useGetAllSemestersSimple();

    useEffect(() => {
        if (semesterSimpleData && semesterSimpleData.length > 0 && !selectedSemesterId) {
            setSelectedSemesterId(semesterSimpleData[0].id);
        }
    }, [semesterSimpleData, selectedSemesterId]);

    const { data: subjectsBySemesterData, isLoading: isLoadingSubjectsBySemester } = useGetSubjectsBySemester(selectedSemesterId as number);
    const { data: enrollmentData, isLoading: isLoadingEnrollment } = useGetAllEnrollmentCourseSection(selectedSemesterId as number);

    if (isLoadingSemesterSimple) return <SubjectBySemesterSkeleton />;

    return (
        <div className="container mx-auto p-4 space-y-6 mt-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm gap-4">
                <div>
                    <h1 className="text-xl font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">Đăng ký học phần</h1>
                    <p className="text-xs text-gray-400 font-medium">Vui lòng chọn học kỳ để thực hiện đăng ký hoặc xem kết quả</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase whitespace-nowrap">Học kỳ hiện tại:</span>
                    <Select
                        value={selectedSemesterId ? String(selectedSemesterId) : undefined}
                        onValueChange={(val) => setSelectedSemesterId(Number(val))}
                    >
                        <SelectTrigger className="w-50 h-9 text-xs rounded-xl border-gray-200 focus:ring-[#ec5d15]/40">
                            <SelectValue placeholder="Chọn học kỳ" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl">
                            {semesterSimpleData?.map((sem) => (
                                <SelectItem key={sem.id} value={String(sem.id)} className="text-xs cursor-pointer">
                                    {sem.name} — {sem.academicYear}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1.5 h-4 bg-[#ec5d15] rounded-full"></div>
                        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">Danh sách môn học mở</h2>
                    </div>
                    <SubjectBySemester
                        subjects={subjectsBySemesterData?.subjects ?? []}
                        selectedSemesterId={selectedSemesterId}
                    />
                </section>

                <hr className="border-gray-100 dark:border-gray-800" />
                <section>
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">Học phần đã đăng ký thành công</h2>
                    </div>
                    {isLoadingEnrollment ? (
                        <EnrollmentCourseSectionSkeleton />
                    ) : (
                        enrollmentData && <EnrollmentCourseSection selectedSemesterId={selectedSemesterId} data={enrollmentData} />
                    )}
                </section>
            </div>
        </div>
    );
}