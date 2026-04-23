import { IChatExamData } from "@/types/student/chatbox.type";
import { Clock, MapPin, Calendar, AlertCircle, BookOpen } from "lucide-react";
const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};
const TYPE_CONFIG = {
    FINAL: { label: "Cuối kỳ", className: "bg-red-50 text-red-500 border border-red-200" },
    MIDTERM: { label: "Giữa kỳ", className: "bg-orange-50 text-[#ec5d15] border border-orange-200" },
};
const isUpcoming = (examDate: string) => new Date(examDate) >= new Date();
export default function ChatDataExam({ data }: { data: IChatExamData[] }) {
    const sorted = [...data].sort(
        (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
    );

    return (
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
            {sorted.map((exam) => {
                const type = TYPE_CONFIG[exam.type];
                const upcoming = isUpcoming(exam.examDate);

                return (
                    <div
                        key={exam.id}
                        className={`bg-white dark:bg-gray-800 border rounded-xl overflow-hidden text-xs
                            ${upcoming
                                ? "border-orange-200 dark:border-orange-900/50"
                                : "border-gray-100 dark:border-gray-700 opacity-70"
                            }`}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-3 py-2 border-b
                            ${upcoming
                                ? "bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30"
                                : "bg-gray-50/80 dark:bg-gray-700/50 border-gray-100 dark:border-gray-700"
                            }`}
                        >
                            <p className="font-bold text-gray-700 dark:text-gray-200 truncate">
                                {exam.courseSection.subject.name}
                            </p>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                {upcoming && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                                        Sắp thi
                                    </span>
                                )}
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${type.className}`}>
                                    {type.label}
                                </span>
                            </div>
                        </div>

                        <div className="px-3 py-2 space-y-1.5">
                            {/* Ngày thi */}
                            <div className="flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-200">
                                <Calendar size={11} className="text-[#ec5d15] shrink-0" />
                                {new Date(exam.examDate).toLocaleDateString("vi-VN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                    <Clock size={11} className="text-[#ec5d15] shrink-0" />
                                    {minutesToTime(exam.startMinute)} – {minutesToTime(exam.endMinute)}
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <MapPin size={11} className="shrink-0" />
                                    Phòng {exam.room.name}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-gray-400">
                                <div className="flex items-center gap-1">
                                    <BookOpen size={10} />
                                    {exam.courseSection.subject.credits} TC
                                </div>
                                <span className="text-gray-300">·</span>
                                <span>
                                    {exam.courseSection.semester.name} {exam.courseSection.semester.academicYear}
                                </span>
                            </div>
                            {exam.note && (
                                <div className="flex items-start gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 px-2 py-1.5 rounded-lg border border-amber-100 dark:border-amber-900/30">
                                    <AlertCircle size={10} className="shrink-0 mt-0.5" />
                                    {exam.note}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
