import { IEnrollmentSemesterProps } from "@/app/types/student/dashboard.type"
import { BookOpen } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function EnrollmentTable({ enrollments, semesters, selectedSemesterId, onChangeSemester, }: IEnrollmentSemesterProps) {
    console.log(selectedSemesterId);
    const selectedSemester = semesters.find((s) => s.id === selectedSemesterId)
    const totalCredits = enrollments.reduce(
        (sum, e) => sum + e.courseSection.subject.credits,
        0
    )
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden mt-5">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                        <BookOpen size={15} className="text-[#ec5d15]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                            Lớp học phần
                        </h3>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                            {selectedSemester
                                ? `${selectedSemester.name} — ${selectedSemester.academicYear}`
                                : "Chọn học kỳ"
                            }
                        </p>
                    </div>
                </div>
                <Select
                    value={selectedSemesterId ? String(selectedSemesterId) : undefined}
                    onValueChange={(val) => onChangeSemester(Number(val))}
                >
                    <SelectTrigger className="w-30 h-8 text-xs rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:ring-1 focus:ring-[#ec5d15]/40">
                        <SelectValue placeholder="Chọn học kỳ" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                        {semesters.map((sem) => (
                            <SelectItem
                                key={sem.id}
                                value={String(sem.id)}
                                className="text-xs cursor-pointer focus:bg-orange-50 focus:text-[#ec5d15] dark:focus:bg-orange-900/20"
                            >
                                {sem.name} — {sem.academicYear}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/60 text-[10px]">
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-5 py-2.5 w-10">
                                STT
                            </th>
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5">
                                Tên học phần
                            </th>
                            <th className="text-left text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap">
                                Mã lớp
                            </th>
                            <th className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-4 py-2.5 whitespace-nowrap">
                                Tín chỉ
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {enrollments.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                            <BookOpen size={18} className="text-gray-300 dark:text-gray-600" />
                                        </div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Không có học phần nào trong học kỳ này
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {enrollments.map((enrollment, index) => {
                            const { sectionCode, subject } = enrollment.courseSection
                            const isLast = index === enrollments.length - 1
                            return (
                                <tr
                                    key={sectionCode}
                                    className={`group transition-colors text-[10px] duration-100 hover:bg-orange-50/50 dark:hover:bg-orange-900/10
                                        ${!isLast ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
                                >
                                    <td className="px-5 py-3 text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-[#ec5d15] transition-colors duration-100">
                                            {subject.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                            {sectionCode}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                                            ${subject.credits >= 4
                                                ? "bg-orange-100 text-[#ec5d15] dark:bg-orange-900/30 dark:text-orange-300"
                                                : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                            }`}
                                        >
                                            {subject.credits}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {enrollments.length > 0 && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        {enrollments.length} học phần
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                            Tổng tín chỉ
                        </span>
                        <span className="text-sm font-bold text-[#ec5d15]">
                            {totalCredits}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
