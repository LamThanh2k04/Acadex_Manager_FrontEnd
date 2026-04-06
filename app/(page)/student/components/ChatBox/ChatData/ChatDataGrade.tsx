import { IChatGradeData } from "@/app/types/student/chatbox.type";
import { CheckCircle2, XCircle, BookOpen, CreditCard } from "lucide-react";

const letterGradeColor = (grade: string | null) => {
    if (!grade) return "text-gray-400";
    if (["A+", "A"].includes(grade)) return "text-purple-500";
    if (["B+", "B"].includes(grade)) return "text-emerald-500";
    if (["C+", "C"].includes(grade)) return "text-yellow-500";
    if (["D+", "D"].includes(grade)) return "text-orange-500";
    return "text-red-500";
};
const classificationColor = (c: string | null) => {
    if (!c) return "bg-gray-100 text-gray-400";
    if (c === "XUẤT SẮC") return "bg-purple-50 text-purple-600 border border-purple-200";
    if (c === "GIỎI") return "bg-blue-50 text-blue-600 border border-blue-200";
    if (c === "KHÁ") return "bg-emerald-50 text-emerald-600 border border-emerald-200";
    if (c === "TRUNG BÌNH") return "bg-yellow-50 text-yellow-600 border border-yellow-200";
    return "bg-red-50 text-red-500 border border-red-200";
};
export default function ChatDataGrade({ data }: { data: IChatGradeData[] }) {
    return (
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
            {data.map((grade) => (
                <div
                    key={grade.id}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 text-xs"
                >
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                            <p className="font-bold text-gray-700 dark:text-gray-200 truncate">
                                {grade.enrollment.courseSection.subject.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-[10px] text-gray-400">
                                    {grade.enrollment.courseSection.subject.code}
                                </span>
                                <span className="text-gray-300">·</span>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <BookOpen size={10} />
                                    {grade.enrollment.courseSection.subject.credits} TC
                                </div>
                            </div>
                        </div>
                        {grade.classification && (
                            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${classificationColor(grade.classification)}`}>
                                {grade.classification}
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 mb-2">
                        {[
                            { label: "Tổng kết", value: grade.totalScore?.toFixed(1) ?? "—" },
                            { label: "GPA/4", value: grade.gpaScale4?.toFixed(1) ?? "—" },
                            { label: "Điểm chữ", value: grade.letterGrade ?? "—", isGrade: true },
                            { label: "Tín chỉ", value: `${grade.enrollment.courseSection.subject.theoryMinutes / 750}h` },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center bg-gray-50 dark:bg-gray-700/50 rounded-lg py-1.5">
                                <span className="text-[9px] text-gray-400 mb-0.5">{item.label}</span>
                                <span className={`font-bold ${item.isGrade ? `text-sm ${letterGradeColor(grade.letterGrade)}` : "text-gray-700 dark:text-gray-200"}`}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <CreditCard size={10} />
                            <span>{grade.enrollment.fee.toLocaleString("vi-VN")} VND</span>
                            <span className={`ml-1 font-bold ${grade.enrollment.isPaid ? "text-emerald-500" : "text-red-400"}`}>
                                {grade.enrollment.isPaid ? "· Đã đóng" : "· Chưa đóng"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {grade.isPassed ? (
                                <div className="flex items-center gap-1 text-emerald-500">
                                    <CheckCircle2 size={12} />
                                    <span className="text-[10px] font-bold">Đạt</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-red-400">
                                    <XCircle size={12} />
                                    <span className="text-[10px] font-bold">Không đạt</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}