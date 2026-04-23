"use client";
import { useGetScheduleByCourseSection } from "@/hooks/student/useCourseSection";
import {
    Clock,
    MapPin,
    Calendar,
    User,
    Layout,
    Loader2,
    Video,
    CheckCircle2,
    X,
    Users,
} from "lucide-react";
import { minutestoHour, dayOfWeekToString } from "@/utils/schedule";
import {
    IRegisterCourseSection,
    TScheduleGroupItem,
    IPracticeOfScheduleByCourseSection,
} from "@/types/student/courseSection.type";
import { useState } from "react";
import toast from "react-hot-toast";
const parseSlot = (slot: string): { current: number; total: number } | null => {
    const parts = slot?.split("/");
    if (parts?.length !== 2) return null;
    const current = Number(parts[0]);
    const total = Number(parts[1]);
    if (isNaN(current) || isNaN(total) || total === 0) return null;
    return { current, total };
};
const slotPercent = (slot: string): number => {
    const parsed = parseSlot(slot);
    if (!parsed) return 0;
    return Math.round((parsed.current / parsed.total) * 100);
};
const slotBadgeStyle = (slot: string) => {
    const percent = slotPercent(slot);
    if (percent >= 100) return "bg-red-50 text-red-500 border-red-100 dark:bg-red-900/20 dark:border-red-900/30";
    if (percent >= 80) return "bg-amber-50 text-amber-500 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30";
    return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30";
};
const isSlotFull = (slot: string): boolean => {
    const parsed = parseSlot(slot);
    if (!parsed) return false;
    return parsed.current >= parsed.total;
};
function SlotBadge({ slot }: { slot: string }) {
    const parsed = parseSlot(slot);
    if (!parsed) return null;
    const full = parsed.current >= parsed.total;
    return (
        <div
            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${slotBadgeStyle(slot)}`}
        >
            <Users size={10} />
            {parsed.current}/{parsed.total}
            {full && <span className="ml-0.5">· Đầy</span>}
        </div>
    );
}

function DayBadge({ dayOfWeek }: { dayOfWeek: number }) {
    return (
        <div className="flex flex-col items-center justify-center min-w-[52px] h-[52px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group-hover/card:scale-105 transition-transform shrink-0">
            <span className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-0.5">
                {dayOfWeek === 8 ? "CN" : `T.${dayOfWeek}`}
            </span>
            <span className="text-sm font-black text-gray-700 dark:text-gray-200">
                {dayOfWeekToString(dayOfWeek)}
            </span>
        </div>
    );
}
function RenderScheduleGroup({
    title,
    items,
    badgeColor,
    selectedId,
    type,
    onSelectGroup,
}: {
    title: string;
    items: TScheduleGroupItem[];
    badgeColor: string;
    selectedId: number | null;
    type?: string;
    onSelectGroup?: (groupValue: number) => void;
}) {
    if (!items || items.length === 0) return null;

    return (
        <div className="mb-6 last:mb-0">
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-1 h-4 ${badgeColor} rounded-full shadow-sm`} />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {title} ({items.length})
                </h3>
            </div>

            <div className="space-y-3">
                {items.map((group, idx) => {
                    const practiceGroup = group as IPracticeOfScheduleByCourseSection;
                    const groupValue =
                        type === "practice"
                            ? (practiceGroup.group ?? idx + 1)
                            : null;

                    const isHighlighted =
                        type === "practice" && groupValue === selectedId;

                    const full = isSlotFull(group.slot);

                    return (
                        <div
                            key={idx}
                            onClick={() => {
                                if (type === "practice" && onSelectGroup && groupValue !== null && !full) {
                                    onSelectGroup(groupValue);
                                }
                            }}
                            className={`group/card border rounded-2xl overflow-hidden transition-all duration-300
                                ${type === "practice" && !full ? "cursor-pointer" : ""}
                                ${isHighlighted
                                    ? "border-[#ec5d15] bg-orange-50/50 dark:bg-orange-900/20 ring-2 ring-[#ec5d15]/20 shadow-lg"
                                    : full && type === "practice"
                                        ? "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 opacity-60"
                                        : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-orange-100 dark:hover:border-orange-900/30"
                                }`}
                        >
                            <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2 flex-wrap min-w-0">
                                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 min-w-0">
                                        <User size={12} className="shrink-0" />
                                        <span className="truncate">{group.lecturer}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                    <div className="text-[11px] font-bold text-[#ec5d15] shrink-0">
                                        {group.plannedClass}
                                    </div>
                                    {type === "practice" && groupValue !== null && (
                                        <>
                                            <div className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                            <div className="text-[11px] font-bold text-gray-500 shrink-0">
                                                Ca {groupValue}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <SlotBadge slot={group.slot} />
                            </div>
                            <div className="p-3 space-y-2">
                                {(Array.isArray(group.schedules)
                                    ? group.schedules
                                    : [group.schedules]
                                ).map((sched: any) => (
                                    <div
                                        key={sched.id}
                                        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl border border-transparent hover:border-orange-100 dark:hover:border-orange-900/30 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all"
                                    >
                                        <DayBadge dayOfWeek={sched.dayOfWeek} />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center flex-wrap gap-3 mb-1">
                                                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-100">
                                                    <Clock size={14} className="text-[#ec5d15] shrink-0" />
                                                    {minutestoHour(sched.startTimeMinutes)} –{" "}
                                                    {minutestoHour(sched.endTimeMinutes)}
                                                </div>
                                                {sched.room ? (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <MapPin size={12} className="shrink-0" />
                                                        <span className="truncate">{sched.room}</span>
                                                    </div>
                                                ) : sched.meetingLink ? (
                                                    <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium">
                                                        <Video size={12} className="shrink-0" />
                                                        Trực tuyến
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                                <Calendar size={11} className="shrink-0" />
                                                <span>
                                                    {new Date(sched.startDate).toLocaleDateString("vi-VN")}
                                                </span>
                                                {sched.startDate !== sched.endDate && (
                                                    <>
                                                        <span className="opacity-50">→</span>
                                                        <span>
                                                            {new Date(sched.endDate).toLocaleDateString("vi-VN")}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default function ScheduleOfCourseSection({
    selectedCourseSectionId,
    onClose,
    onRegister,
}: {
    selectedCourseSectionId: number | null;
    onClose: () => void;
    onRegister: (data: IRegisterCourseSection) => void;
}) {
    const { data, isLoading } = useGetScheduleByCourseSection(
        selectedCourseSectionId as number
    );
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    const hasPractice = (data?.practices?.length ?? 0) > 0;
    const practicesHaveNullGroup = data?.practices?.every(
        (p: IPracticeOfScheduleByCourseSection) => p.group === null
    ) ?? false;
    const requireGroupSelection = hasPractice && !practicesHaveNullGroup;

    const handleRegister = () => {
        if (!selectedCourseSectionId) return;
        if (requireGroupSelection && selectedGroup === null) {
            toast.error("Vui lòng chọn ca thực hành");
            return;
        }
        onRegister({
            courseSectionId: selectedCourseSectionId,
            practiceGroup: selectedGroup ?? 0,
        });
    };
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 size={24} className="animate-spin text-[#ec5d15]" />
                <p className="text-xs text-gray-400">Đang tải lịch học...</p>
            </div>
        );
    }

    const hasNoData =
        !data?.theory?.length &&
        !data?.practices?.length &&
        !data?.online?.length;

    return (
        <div className="flex flex-col max-h-[70vh]">
            <div className="flex-1 overflow-y-auto py-2 pr-2 custom-scrollbar space-y-1">
                <RenderScheduleGroup
                    title="Lý thuyết"
                    items={data?.theory || []}
                    badgeColor="bg-blue-500"
                    type="theory"
                    selectedId={selectedGroup}
                />
                {requireGroupSelection && (
                    <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                        <p className="text-[11px] font-bold text-orange-500 mb-2 uppercase tracking-widest">
                            Chọn ca thực hành
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {data?.practices.map(
                                (p: IPracticeOfScheduleByCourseSection, idx: number) => {
                                    const groupValue = p.group ?? idx + 1;
                                    const full = isSlotFull(p.slot);
                                    const parsed = parseSlot(p.slot);

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => !full && setSelectedGroup(groupValue)}
                                            disabled={full}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all
                                                ${selectedGroup === groupValue
                                                    ? "bg-[#ec5d15] text-white border-[#ec5d15] shadow-md shadow-orange-200"
                                                    : full
                                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700"
                                                        : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-orange-300"
                                                }`}
                                        >
                                            Ca {groupValue}
                                            {parsed && (
                                                <span className={`text-[10px] opacity-70`}>
                                                    ({parsed.current}/{parsed.total})
                                                </span>
                                            )}
                                            {full && <span className="text-[10px]">· Đầy</span>}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>
                )}
                <RenderScheduleGroup
                    title="Thực hành"
                    items={data?.practices || []}
                    badgeColor="bg-emerald-500"
                    type="practice"
                    selectedId={selectedGroup}
                    onSelectGroup={(val) => requireGroupSelection && setSelectedGroup(val)}
                />
                <RenderScheduleGroup
                    title="Trực tuyến"
                    items={data?.online || []}
                    badgeColor="bg-purple-500"
                    type="online"
                    selectedId={selectedGroup}
                />
                {hasNoData && (
                    <div className="py-20 text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                            <Layout size={20} className="text-gray-300" />
                        </div>
                        <p className="text-xs text-gray-400 italic">
                            Học phần này hiện chưa được xếp lịch cụ thể.
                        </p>
                    </div>
                )}
            </div>
            {!hasNoData && (
                <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <X size={14} />
                        Đóng
                    </button>
                    <button
                        onClick={handleRegister}
                        disabled={requireGroupSelection && selectedGroup === null}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#ec5d15] hover:bg-[#d44d0f] active:scale-95
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                                   text-white rounded-xl text-xs font-bold transition-all
                                   shadow-md shadow-orange-200 dark:shadow-none cursor-pointer"
                    >
                        <CheckCircle2 size={15} />
                        {requireGroupSelection && selectedGroup === null
                            ? "Chọn ca thực hành trước"
                            : "Xác nhận đăng ký"}
                    </button>
                </div>
            )}
        </div>
    );
}
