"use client"
import { ICourseSection } from '@/app/types/lecturer/courseSection/courseSection.type';
import { useGetCourseSection } from '@/hooks/lecturer/courseSection/useGetCourseSection';
import { useGetSemesterSimple } from '@/hooks/lecturer/simple/useGetSemesterSimple';
import { useState } from 'react';
import { CourseSectionLecturer } from './CourseSectionLecturer/CourseSectionLecturer';
import { StudentEnrollmentIsPaid } from '@/app/(page)/lecturer/courseSection/StudentEnrollmentIsPaid/StudentEnrollmentIsPaid';
import SearchInputCourseSection from './SearchInputCourseSection/SearchInputCoursSection';
import { useSearchParams } from 'next/navigation';
export default function CourseSection() {
    const { data: semesterData } = useGetSemesterSimple();
    const semesters = semesterData ?? [];
    const [selectedSemesterId, setSelectedSemesterId] = useState<number>(0);
    const searchParams = useSearchParams();
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
    const activeSemesterId = selectedSemesterId || semesters[0]?.id || 0;
    const search = searchParams.get("search") ?? "";
    const { data: courseSectionData, isLoading: loadingSections } =
        useGetCourseSection(activeSemesterId, search);
    const sections: ICourseSection[] = courseSectionData?.courseSections ?? [];
    const selectedSection = sections.find((s) => s.id === selectedSectionId) ?? null;
    return (
        <div className="mx-auto max-w-7xl space-y-6 p-2 mt-5">
            <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-white">Giảng dạy</p>
                <h1 className="mt-1 text-xl font-semibold text-gray-900 dark:text-[#eebbc3]">Học phần giảng dạy</h1>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <SearchInputCourseSection />
                        <select
                            value={selectedSemesterId}
                            onChange={(e) => {
                                setSelectedSemesterId(Number(e.target.value));
                                setSelectedSectionId(null);
                            }}
                            className="shrink-0 rounded-xl border dark:bg-gray-900 dark:border-none dark:text-gray-400 border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                        >
                            {semesters.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} – {s.academicYear}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900">
                            <p className="text-xs text-gray-400 dark:text-white">Tổng học phần</p>
                            <p className="mt-0.5 text-xl font-semibold text-gray-900 dark:text-[#eebbc3]">{sections.length}</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900">
                            <p className="text-xs text-gray-400 dark:text-white">Tổng SV tối đa</p>
                            <p className="mt-0.5 text-xl font-semibold text-gray-900 dark:text-[#eebbc3]">
                                {sections.reduce((acc, s) => acc + s.maxStudents, 0)}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {loadingSections ? (
                            <div className="py-10 text-center text-sm text-gray-400">Đang tải...</div>
                        ) : sections.length === 0 ? (
                            <div className="py-10 text-center text-sm text-gray-400">Không có học phần nào</div>
                        ) : (
                            sections.map((s) => (
                                <CourseSectionLecturer
                                    key={s.id}
                                    section={s}
                                    isSelected={s.id === selectedSectionId}
                                    onClick={() => setSelectedSectionId(s.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div>
                    {selectedSection ? (
                        <>
                            <div className="mb-4 flex items-center gap-3 dark:bg-gray-900">
                                <div className="h-13 w-1 rounded-full bg-blue-500" />
                                <div className='gap-2 flex flex-col'>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {selectedSection.subject.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {selectedSection.sectionCode} · {selectedSection.plannedClass.name} ·{" "}
                                        {selectedSection.semester.name} {selectedSection.semester.academicYear}
                                    </p>
                                </div>
                            </div>
                            <StudentEnrollmentIsPaid courseSectionId={selectedSection.id} />
                        </>
                    ) : (
                        <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-white">Chọn một học phần</p>
                                <p className="mt-0.5 text-xs text-gray-400 dark:text-[#eebbc3]">
                                    Danh sách sinh viên sẽ hiển thị ở đây
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}