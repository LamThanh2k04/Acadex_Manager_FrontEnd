import { ISubjectsBySemesterDataProps } from '@/types/student/courseSection.type';
import { BookOpen } from 'lucide-react';
import { minutestoHour } from '@/utils/schedule';
import CourseSectionBySubject from '../CourseSectionBySubject/CourseSectionBySubject';
import { useState } from 'react';
import React from 'react';
export default function SubjectBySemester({ subjects, selectedSemesterId }: ISubjectsBySemesterDataProps) {
    const [expandedSubjectId, setExpandedSubjectId] = useState<number | null>(null);
    if (!selectedSemesterId) {
        return;
    }
    const toggleSubject = (subjectId: number) => {
        setExpandedSubjectId(expandedSubjectId === subjectId ? null : subjectId);
    };
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/60 text-[10px]">
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-5 py-2.5 w-10">
                                STT
                            </th>
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5">
                                Môn học
                            </th>
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap">
                                Mã môn học
                            </th>
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap">
                                Số giờ lý thuyết
                            </th>
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap">
                                Số giờ thực hành
                            </th>
                            <th className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap">
                                Tín chỉ
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {subjects.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                            <BookOpen size={18} className="text-gray-300 dark:text-gray-600" />
                                        </div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Không có môn học nào trong học kỳ này
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {subjects.map((subject, index) => {
                            const isLast = index === subjects.length - 1
                            const isExpanded = expandedSubjectId === subject.subject.id
                            return (
                                <React.Fragment key={subject.subject.id}>
                                    <tr
                                        onClick={() => toggleSubject(subject.subject.id)}
                                        className={`group cursor-pointer transition-colors text-[10px] duration-100 hover:bg-orange-50/50 dark:hover:bg-orange-900/10
                                        ${isExpanded ? "bg-orange-50/50 dark:bg-orange-900/20" : "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"}
                                                ${!isLast || isExpanded ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
                                    >
                                        <td className="px-5 py-3 text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-[#ec5d15] transition-colors duration-100">
                                                {subject.subject.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                                {subject.subject.code}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                                {minutestoHour(subject.subject.theoryMinutes)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                                {minutestoHour(subject.subject.practiceMinutes)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                                            ${subject.subject.credits >= 4
                                                    ? "bg-orange-100 text-[#ec5d15] dark:bg-orange-900/30 dark:text-orange-300"
                                                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                                }`}
                                            >
                                                {subject.subject.credits}
                                            </span>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={6} className="bg-gray-50/50 dark:bg-gray-800/30 px-5 py-4">
                                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <CourseSectionBySubject
                                                        subjectId={subject.subject.id}
                                                        semesterId={selectedSemesterId}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )

                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}