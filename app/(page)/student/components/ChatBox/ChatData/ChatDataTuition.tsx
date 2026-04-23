import { IChatTuitionData } from "@/types/student/chatbox.type";
import { CreditCard, BookOpen, CheckCircle2, XCircle } from "lucide-react";

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
export default function ChatDataTuition({ data }: { data: IChatTuitionData[] }) {
    const total = data.reduce((sum, e) => sum + e.fee, 0);
    const paidCount = data.filter((e) => e.isPaid).length;
    const unpaidCount = data.length - paidCount;
    return (
        <div className="mt-2 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
                <div className="flex flex-col items-center bg-orange-50 dark:bg-orange-900/10 rounded-xl py-2 px-1">
                    <CreditCard size={12} className="text-[#ec5d15] mb-0.5" />
                    <span className="text-[9px] text-gray-400">Tổng</span>
                    <span className="text-[11px] font-black text-[#ec5d15] text-center leading-tight">
                        {formatCurrency(total)}
                    </span>
                </div>
                <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-900/10 rounded-xl py-2 px-1">
                    <CheckCircle2 size={12} className="text-emerald-500 mb-0.5" />
                    <span className="text-[9px] text-gray-400">Đã đóng</span>
                    <span className="text-[11px] font-black text-emerald-600">{paidCount} môn</span>
                </div>
                <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/10 rounded-xl py-2 px-1">
                    <XCircle size={12} className="text-red-400 mb-0.5" />
                    <span className="text-[9px] text-gray-400">Chưa đóng</span>
                    <span className="text-[11px] font-black text-red-500">{unpaidCount} môn</span>
                </div>
            </div>
            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                {data.map((enrollment) => (
                    <div
                        key={enrollment.id}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs transition-all
                            ${enrollment.isPaid
                                ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                                : "bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30"
                            }`}
                    >
                        <div className="shrink-0">
                            {enrollment.isPaid
                                ? <CheckCircle2 size={14} className="text-emerald-500" />
                                : <XCircle size={14} className="text-red-400" />
                            }
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-700 dark:text-gray-200 truncate">
                                {enrollment.courseSection.subject.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
                                <BookOpen size={9} />
                                <span>{enrollment.courseSection.subject.credits} TC</span>
                                <span className="text-gray-300">·</span>
                                <span>{enrollment.courseSection.semester.name} {enrollment.courseSection.semester.academicYear}</span>
                                {enrollment.practiceGroup && (
                                    <>
                                        <span className="text-gray-300">·</span>
                                        <span>Ca {enrollment.practiceGroup}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="shrink-0 text-right">
                            <p className={`font-bold ${enrollment.isPaid ? "text-gray-700 dark:text-gray-200" : "text-red-500"}`}>
                                {formatCurrency(enrollment.fee)}
                            </p>
                            <p className={`text-[10px] font-medium ${enrollment.isPaid ? "text-emerald-500" : "text-red-400"}`}>
                                {enrollment.isPaid ? "Đã đóng" : "Chưa đóng"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
