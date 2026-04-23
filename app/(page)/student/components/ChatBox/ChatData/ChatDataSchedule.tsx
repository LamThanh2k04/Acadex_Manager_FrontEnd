// ChatData/ChatDataSchedule.tsx
import { IChatScheduleData } from "@/types/student/chatbox.type";
import { Clock, MapPin, Calendar, Video } from "lucide-react";

const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const DAY_LABEL: Record<number, string> = {
    2: "T2", 3: "T3", 4: "T4", 5: "T5",
    6: "T6", 7: "T7", 8: "CN"
};

const TYPE_CONFIG = {
    THEORY: { label: "Lý thuyết", className: "bg-blue-50 text-blue-600 border border-blue-200" },
    PRACTICE: { label: "Thực hành", className: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
    ONLINE: { label: "Trực tuyến", className: "bg-purple-50 text-purple-600 border border-purple-200" },
};
export default function ChatDataSchedule({ data }: { data: IChatScheduleData[] }) {
    return (
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
            {data.map((schedule) => {
                const type = TYPE_CONFIG[schedule.type];
                return (
                    <div
                        key={schedule.id}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden text-xs"
                    >
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-50/80 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                            <p className="font-bold text-gray-700 dark:text-gray-200 truncate">
                                {schedule.courseSection.subject.name}
                            </p>
                            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 ${type.className}`}>
                                {type.label}
                            </span>
                        </div>
                        <div className="px-3 py-2 space-y-1.5">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 shrink-0">
                                    <span className="text-[10px] font-black text-[#ec5d15]">
                                        {DAY_LABEL[schedule.dayOfWeek]}
                                    </span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 font-semibold">
                                        <Clock size={11} className="text-[#ec5d15]" />
                                        {minutesToTime(schedule.startTimeMinutes)} – {minutesToTime(schedule.endTimeMinutes)}
                                    </div>
                                    {schedule.meetingLink ? (
                                        <div className="flex items-center gap-1 text-[10px] text-blue-500 mt-0.5">
                                            <Video size={10} />
                                            Trực tuyến
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                                            <MapPin size={10} />
                                            Phòng {schedule.room.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                <Calendar size={10} />
                                {new Date(schedule.startDate).toLocaleDateString("vi-VN")}
                                <span className="opacity-50">→</span>
                                {new Date(schedule.endDate).toLocaleDateString("vi-VN")}
                                <span className="text-gray-300 mx-1">·</span>
                                {schedule.courseSection.semester.name} {schedule.courseSection.semester.academicYear}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}