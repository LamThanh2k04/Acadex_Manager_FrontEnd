"use client"
import { CheckCircle2, XCircle, Minus } from "lucide-react";
import { IStudyResultDataProps } from '@/app/types/student/studyResult.type';
const fmt = (val: number | null) =>
    val !== null && val !== undefined ? val.toFixed(1) : "—";
const classificationColor = (classification: string | null) => {
    if (!classification) return "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500";
    switch (classification) {
        case "XUẤT SẮC": return "bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30";
        case "GIỎI": return "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30";
        case "KHÁ": return "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30";
        case "TRUNG BÌNH": return "bg-yellow-50 text-yellow-600 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30";
        case "YẾU":
        case "KÉM": return "bg-red-50 text-red-500 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30";
        default: return "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
    }
};
const letterGradeColor = (grade: string | null) => {
    if (!grade) return "text-gray-300 dark:text-gray-600";
    if (["A+", "A"].includes(grade)) return "text-purple-500";
    if (["B+", "B"].includes(grade)) return "text-emerald-500";
    if (["C+", "C"].includes(grade)) return "text-yellow-500";
    if (["D+", "D"].includes(grade)) return "text-orange-500";
    return "text-red-500";
};
function ScoreCell({ value }: { value: number | null }) {
    if (value === null || value === undefined) {
        return <span className="text-gray-300 dark:text-gray-600 text-xs">—</span>;
    }
    const color = value >= 8 ? "text-emerald-600" : value >= 5 ? "text-yellow-600" : "text-red-500";
    return <span className={`text-xs font-semibold ${color}`}>{value.toFixed(1)}</span>;
}
function PassedCell({ isPassed }: { isPassed: boolean | null }) {
    if (isPassed === null || isPassed === undefined) {
        return <Minus size={14} className="text-gray-300 mx-auto" />;
    }
    return isPassed
        ? <CheckCircle2 size={15} className="text-emerald-500 mx-auto" />
        : <XCircle size={15} className="text-red-400 mx-auto" />;
}
const TH = ({ children, center }: { children: React.ReactNode; center?: boolean }) => (
    <th className={`px-3 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap
        ${center ? "text-center" : "text-left"}`}>
        {children}
    </th>
);
export default function StudyResult({ data }: IStudyResultDataProps) {
    console.log(data);
    if (!data.studyResults || data.studyResults.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-xs text-gray-400 italic">Chưa có kết quả học tập</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {data.studyResults.map((semester, semIndex) => (
                <div key={semIndex} className="overflow-hidden mt-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between px-5 py-3.5 bg-linear-to-r from-orange-50 to-white dark:from-orange-900/10 dark:to-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-[#ec5d15] rounded-full" />
                            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">
                                {semester.semester.name}
                            </h3>
                            <span className="text-xs text-gray-400 font-medium">
                                {semester.semester.academicYear}
                            </span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">
                            {semester.subjects?.length} môn học
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm bg-white dark:bg-gray-900/50">
                            <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <TH>STT</TH>
                                    <TH>Môn học</TH>
                                    <TH center>TC</TH>
                                    <TH center>GK</TH>
                                    <TH center>CK</TH>
                                    <TH center>LT1</TH>
                                    <TH center>LT2</TH>
                                    <TH center>TH1</TH>
                                    <TH center>TH2</TH>
                                    <TH center>TH3</TH>
                                    <TH center>Tổng</TH>
                                    <TH center>GPA</TH>
                                    <TH center>Điểm chữ</TH>
                                    <TH center>Xếp loại</TH>
                                    <TH center>Kết quả</TH>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {semester.subjects?.map((subject, subIndex) => (
                                    <tr
                                        key={subject.sectionCode}
                                        className="hover:bg-orange-50/40 dark:hover:bg-orange-900/10 transition-colors"
                                    >
                                        {/* STT */}
                                        <td className="px-3 py-3.5 text-xs font-mono font-bold text-gray-300 dark:text-gray-600 w-10">
                                            {String(subIndex + 1).padStart(2, "0")}
                                        </td>

                                        {/* Môn học */}
                                        <td className="px-3 py-3.5 min-w-45">
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-snug">
                                                {subject.subjectName}
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                                {subject.sectionCode}
                                            </p>
                                        </td>

                                        {/* Tín chỉ */}
                                        <td className="px-3 py-3.5 text-center">
                                            <span className="text-xs font-bold text-[#ec5d15]">
                                                {subject.credits}
                                            </span>
                                        </td>

                                        {/* Điểm */}
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.midterm} /></td>
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.final} /></td>
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.theory1} /></td>
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.theory2} /></td>
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.practice1} /></td>
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.practice2} /></td>
                                        <td className="px-3 py-3.5 text-center"><ScoreCell value={subject.practice3} /></td>

                                        {/* Tổng */}
                                        <td className="px-3 py-3.5 text-center">
                                            <span className={`text-xs font-bold ${subject.totalScore !== null ? "text-gray-700 dark:text-gray-200" : "text-gray-300"}`}>
                                                {fmt(subject.totalScore)}
                                            </span>
                                        </td>

                                        {/* GPA */}
                                        <td className="px-3 py-3.5 text-center">
                                            <span className={`text-xs font-bold ${subject.gpaScale4 !== null ? "text-gray-700 dark:text-gray-200" : "text-gray-300"}`}>
                                                {fmt(subject.gpaScale4)}
                                            </span>
                                        </td>

                                        {/* Điểm chữ */}
                                        <td className="px-3 py-3.5 text-center">
                                            <span className={`text-sm font-black ${letterGradeColor(subject.letterGrade)}`}>
                                                {subject.letterGrade ?? "—"}
                                            </span>
                                        </td>

                                        {/* Xếp loại */}
                                        <td className="px-3 py-3.5 text-center">
                                            {subject.classification ? (
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${classificationColor(subject.classification)}`}>
                                                    {subject.classification}
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 text-xs">—</span>
                                            )}
                                        </td>

                                        {/* Kết quả */}
                                        <td className="px-3 py-3.5">
                                            <PassedCell isPassed={subject.isPassed} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
