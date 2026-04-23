import { ISemesterOrderProgramResponseProps } from '@/types/student/curriculumFramework.type'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import CreditDot from '@/components/CreditDot';
import SectionLabel from '@/components/SectionLabel';
import StatusBadge from '@/components/StatusBadge';
export default function CurriculumFrameworkClient({
    data,
    subjects,
    selectedSemesterOrder,
    onChangeSubject,
}: ISemesterOrderProgramResponseProps) {
    const { semesters, summary } = data
    const { mandatorySubjects, electiveSubjects } = subjects.subjects;
    const selectedSemester = semesters.find(s => s.semesterOrder === selectedSemesterOrder)
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                        <BookOpen size={15} className="text-[#ec5d15]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                            Chương trình khung
                        </h3>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                            {summary.totalRequiredCredits} tín chỉ toàn khóa
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                            Tổng TC
                        </p>
                        <p className="text-lg font-bold text-[#ec5d15] leading-none">
                            {summary.totalRequiredCredits}
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                            Bắt buộc
                        </p>
                        <p className="text-lg font-bold text-gray-700 dark:text-gray-300 leading-none">
                            {summary.totalMandatoryCredits}
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                            Tự chọn
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">
                            {summary.totalElectiveCredits}
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-none">
                <div className="flex gap-1.5 px-4 py-3 w-max">
                    {semesters.map((sem) => (
                        <button
                            key={sem.semesterOrder}
                            onClick={() => onChangeSubject(sem.semesterOrder)}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 border",
                                selectedSemesterOrder === sem.semesterOrder
                                    ? "bg-[#ec5d15] border-[#ec5d15] text-white shadow-sm"
                                    : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#ec5d15] hover:text-[#ec5d15] dark:hover:text-orange-400"
                            )}
                        >
                            HK {sem.semesterOrder}
                            <span className={cn(
                                "text-[10px] font-medium",
                                selectedSemesterOrder === sem.semesterOrder
                                    ? "opacity-75"
                                    : "opacity-60"
                            )}>
                                {sem.totalCredits}TC
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            {selectedSemester && (
                <div className="flex items-center justify-between px-5 py-2 bg-orange-50/50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/20">
                    <span className="text-xs font-semibold text-[#ec5d15]">
                        Học kỳ {selectedSemester.semesterOrder}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                        {selectedSemester.totalCredits} tín chỉ
                    </span>
                </div>
            )}
            <div>
                {mandatorySubjects.length > 0 && (
                    <>
                        <SectionLabel label="Môn bắt buộc" count={mandatorySubjects.length} />
                        {mandatorySubjects.map((subject, index) => (
                            <div
                                key={subject.id}
                                className={cn(
                                    "flex items-center gap-3 px-5 py-3 hover:bg-orange-50/40 dark:hover:bg-orange-900/10 transition-colors duration-100 group",
                                    index < mandatorySubjects.length - 1 && "border-b border-gray-100 dark:border-gray-800"
                                )}
                            >
                                <CreditDot credits={subject.credits} isPassed={subject.isPassed} />

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate group-hover:text-[#ec5d15] transition-colors duration-100">
                                        {subject.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                                            {subject.code}
                                        </span>
                                        {!subject.countToGpa && (
                                            <span className="text-[10px] text-gray-300 dark:text-gray-600">
                                                · Không tính GPA
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 hidden sm:inline-flex">
                                        Bắt buộc
                                    </span>
                                    <StatusBadge
                                        enrollmentStatus={subject.enrollmentStatus}
                                        isPassed={subject.isPassed}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {electiveSubjects.length > 0 && (
                    <>
                        <SectionLabel label="Môn tự chọn" count={electiveSubjects.length} />
                        {electiveSubjects.map((subject, index) => (
                            <div
                                key={subject.id}
                                className={cn(
                                    "flex items-center gap-3 px-5 py-3 hover:bg-orange-50/40 dark:hover:bg-orange-900/10 transition-colors duration-100 group",
                                    index < electiveSubjects.length - 1 && "border-b border-gray-100 dark:border-gray-800"
                                )}
                            >
                                <CreditDot credits={subject.credits} isPassed={subject.isPassed} />

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate group-hover:text-[#ec5d15] transition-colors duration-100">
                                        {subject.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                                            {subject.code}
                                        </span>
                                        {!subject.countToGpa && (
                                            <span className="text-[10px] text-gray-300 dark:text-gray-600">
                                                · Không tính GPA
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hidden sm:inline-flex">
                                        Tự chọn
                                    </span>
                                    <StatusBadge
                                        enrollmentStatus={subject.enrollmentStatus}
                                        isPassed={subject.isPassed}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {mandatorySubjects.length === 0 && electiveSubjects.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 py-12">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <BookOpen size={18} className="text-gray-300 dark:text-gray-600" />
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Không có môn học trong học kỳ này
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-800/20">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-emerald-100 dark:bg-emerald-900/40" />
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">Đã qua</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-orange-100 dark:bg-orange-900/40" />
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">Đã đăng ký</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-gray-800" />
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">Chưa học</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                    <div className="w-2.5 h-2.5 rounded-sm bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800" />
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">Bắt buộc</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800" />
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">Tự chọn</span>
                </div>
            </div>
        </div>
    )
}
