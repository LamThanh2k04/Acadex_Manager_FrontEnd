"use client"
import { useGetCourseSectionsBySubject, useRegisterCourseSection } from '@/hooks/student/useCourseSection';
import { CalendarSearch, User, Users, Fingerprint, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import ScheduleOfCourseSection from '../Modal/ScheduleOfCourseSection/ScheduleOfCourseSection';
export default function CourseSectionBySubject({ subjectId, semesterId }: { subjectId: number, semesterId: number }) {
    const { data: courseSections, isLoading } = useGetCourseSectionsBySubject(subjectId, semesterId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseSectionId, setSelectedCourseSectionId] = useState<number | null>(null);
    const { mutate: registerCourseSection } = useRegisterCourseSection();
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10 gap-2 text-gray-400">
                <Loader2 size={16} className="animate-spin text-[#ec5d15]" />
                <span className="text-xs">Đang tải danh sách học phần...</span>
            </div>
        );
    }
    if (!courseSections || courseSections.length === 0) {
        return (
            <div className="py-6 text-center text-xs text-gray-400 italic border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                Hiện chưa có lớp học nào được mở cho môn học này.
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 bg-[#ec5d15] rounded-full"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Danh sách học phần đang mở
                </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {courseSections?.map((section: any) => (
                    <div
                        key={section.id}
                        className="flex flex-wrap md:flex-nowrap items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#ec5d15]/50 transition-all shadow-sm"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Fingerprint size={13} className="text-gray-400" />
                                    <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-200">
                                        {section.sectionCode}
                                    </span>
                                    <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                                        {section.plannedClass.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <User size={13} className="text-gray-400" />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        GV: {section.lecturer.user.fullName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-3 md:mt-0">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <Users size={13} />
                                    <span className="text-xs font-semibold">{section.slot}</span>
                                </div>
                                <div className="w-20 h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                                    <div
                                        className="h-full bg-[#ec5d15]"
                                        style={{ width: `${(section._count.enrollments / section.maxStudents) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setSelectedCourseSectionId(section.id)
                                }}
                                className="flex items-center gap-1.5 bg-[#ec5d15] hover:bg-[#d44d0f] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-md shadow-orange-200 dark:shadow-none">
                                <CalendarSearch size={14} />
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Thông tin chung</DialogTitle>
                        </DialogHeader>
                        <ScheduleOfCourseSection onRegister={(data) => registerCourseSection(data)} selectedCourseSectionId={selectedCourseSectionId} onClose={() => setIsModalOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}