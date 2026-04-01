import { useGetScheduleByCourseSection } from '@/hooks/student/useCourseSection';
import { Clock, MapPin, Calendar, User, Layout, Loader2, Video, CheckCircle2, X } from 'lucide-react';
import { minutestoHour, dayOfWeekToString } from '@/app/utils/schedule';
import { IRegisterCourseSection, TScheduleGroupItem, IPracticeOfScheduleByCourseSection } from '@/app/types/student/courseSection.type';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ScheduleOfCourseSection({
    selectedCourseSectionId,
    onClose,
    onRegister
}: {
    selectedCourseSectionId: number | null;
    onClose: () => void;
    onRegister: (data: IRegisterCourseSection) => void;
}) {
    const { data, isLoading } = useGetScheduleByCourseSection(selectedCourseSectionId as number);
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    const hasPractice = (data?.practices?.length ?? 0) > 0;

    const handleRegister = () => {
        if (!selectedCourseSectionId) return;
        if (hasPractice && selectedGroup === null) {
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

    const RenderScheduleGroup = ({
        title,
        items,
        badgeColor
    }: {
        title: string;
        items: TScheduleGroupItem[];
        badgeColor: string;
    }) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="mb-6 last:mb-0">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-1 h-4 ${badgeColor} rounded-full shadow-sm`}></div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {title} ({items.length})
                    </h3>
                </div>

                <div className="space-y-3">
                    {items.map((group, idx) => (
                        <div
                            key={idx}
                            className="group/card border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900/50"
                        >
                            <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                                        <User size={12} /> {group.lecturer}
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                    <div className="text-[11px] font-bold text-[#ec5d15]">{group.plannedClass}</div>
                                </div>
                                <div className="text-[10px] font-mono font-bold text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-700">
                                    {group.slot}
                                </div>
                            </div>
                            <div className="p-3 space-y-2">
                                {(Array.isArray(group.schedules) ? group.schedules : [group.schedules]).map((sched: any) => (
                                    <div
                                        key={sched.id}
                                        className="flex flex-col md:flex-row items-center gap-4 p-3 rounded-xl border border-transparent hover:border-orange-100 dark:hover:border-orange-900/30 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all"
                                    >
                                        <div className="flex flex-col items-center justify-center min-w-15 h-15 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group-hover/card:scale-105 transition-transform">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">
                                                {sched.dayOfWeek === 8 ? "CN" : `T.${sched.dayOfWeek}`}
                                            </span>
                                            <span className="text-sm font-black text-gray-700 dark:text-gray-200">
                                                {dayOfWeekToString(sched.dayOfWeek)}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-100">
                                                    <Clock size={14} className="text-[#ec5d15]" />
                                                    {minutestoHour(sched.startTimeMinutes)} - {minutestoHour(sched.endTimeMinutes)}
                                                </div>
                                                {sched.room ? (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <MapPin size={13} /> {sched.room}
                                                    </div>
                                                ) : sched.meetingLink ? (
                                                    <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium">
                                                        <Video size={13} /> Trực tuyến
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                                <Calendar size={12} />
                                                <span>{new Date(sched.startDate).toLocaleDateString('vi-VN')}</span>
                                                <span className="opacity-50">→</span>
                                                <span>{new Date(sched.endDate).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const hasNoData = !data?.theory?.length && !data?.practices?.length && !data?.online?.length;

    return (
        <div className="flex flex-col max-h-[70vh]">
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto py-2 pr-2 custom-scrollbar">
                <RenderScheduleGroup
                    title="Lý thuyết"
                    items={data?.theory || []}
                    badgeColor="bg-blue-500"
                />

                {/* Practice group selector */}
                {hasPractice && (
                    <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                        <p className="text-[11px] font-bold text-orange-500 mb-2 uppercase tracking-widest">
                            Chọn ca thực hành
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {data?.practices.map((p: IPracticeOfScheduleByCourseSection, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedGroup(p.group)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all
                                        ${selectedGroup === p.group
                                            ? 'bg-[#ec5d15] text-white border-[#ec5d15] shadow-md shadow-orange-200'
                                            : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-orange-300'
                                        }`}
                                >
                                    Ca {p.group ?? idx + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <RenderScheduleGroup
                    title="Thực hành"
                    items={data?.practices || []}
                    badgeColor="bg-emerald-500"
                />

                <RenderScheduleGroup
                    title="Trực tuyến"
                    items={data?.online || []}
                    badgeColor="bg-purple-500"
                />

                {hasNoData && (
                    <div className="py-20 text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                            <Layout size={20} className="text-gray-300" />
                        </div>
                        <p className="text-xs text-gray-400 italic">Học phần này hiện chưa được xếp lịch cụ thể.</p>
                    </div>
                )}
            </div>

            {/* Footer actions - fixed at bottom */}
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
                        disabled={hasPractice && selectedGroup === null}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#ec5d15] hover:bg-[#d44d0f] active:scale-95
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                                   text-white rounded-xl text-xs font-bold transition-all
                                   shadow-md shadow-orange-200 dark:shadow-none cursor-pointer"
                    >
                        <CheckCircle2 size={15} />
                        {hasPractice && selectedGroup === null ? 'Chọn ca thực hành trước' : 'Xác nhận đăng ký'}
                    </button>
                </div>
            )}
        </div>
    );
}
