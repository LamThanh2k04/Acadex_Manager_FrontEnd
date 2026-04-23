import { useGetAllSchedulesByCourseSectionRegister } from '@/hooks/student/useCourseSection';
import { Clock, MapPin, Calendar, Video, Layout, Loader2, X } from 'lucide-react';
import { minutestoHour, dayOfWeekToString } from '@/utils/schedule';
import { ISchedulesByCourseSectionRegister } from '@/app/types/student/courseSection.type';

export default function ScheduleOfEnrollment({ onClose, selectedCourseSectionId }: { onClose: () => void; selectedCourseSectionId: number | null }) {
    const { data, isLoading } = useGetAllSchedulesByCourseSectionRegister(selectedCourseSectionId ?? 0);
    const schedules: ISchedulesByCourseSectionRegister[] = Array.isArray(data) ? data : [];
    const theorySchedules = schedules.filter(item => item.type === 'THEORY');
    const practiceSchedules = schedules.filter(item => item.type === 'PRACTICE');
    const onlineSchedules = schedules.filter(item => item.type === 'ONLINE');
    const hasNoData = schedules.length === 0;
    const RenderScheduleList = (title: string, list: ISchedulesByCourseSectionRegister[], iconColor: string) => {
        if (list.length === 0) return null;
        return (
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-1 h-4 ${iconColor} rounded-full shadow-sm`} />
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {title} ({list.length})
                    </h3>
                </div>

                <div className="space-y-3">
                    {list.map(item => (
                        <div key={item.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900/50">
                            <div className="px-4 py-2 bg-gray-50/60 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-bold">Ca {item.practiceGroup ?? '-'} </span>
                                    <span className="text-[10px] font-mono text-gray-400">{item.isActive ? 'Đang hoạt động' : 'Ngưng'}</span>
                                </div>
                                <div className="text-[10px] font-bold text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-700">
                                    {item.room?.name ?? 'Chưa xác định'} · {item.room?.building?.name ?? ''}
                                </div>
                            </div>

                            <div className="p-3 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-100">
                                        <Clock size={14} className="text-[#ec5d15]" />
                                        {minutestoHour(item.startTimeMinutes)} - {minutestoHour(item.endTimeMinutes)}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        {item.meetingLink ? <><Video size={14} /> Trực tuyến</> : <><MapPin size={14} /> Phòng</>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <Calendar size={12} />
                                    <span>{new Date(item.startDate).toLocaleDateString('vi-VN')}</span>
                                    <span className="opacity-50">→</span>
                                    <span>{new Date(item.endDate).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                    <Layout size={12} />
                                    Ngày: {item.dayOfWeek === 8 ? 'CN' : `T.${item.dayOfWeek}`} ({dayOfWeekToString(item.dayOfWeek)})
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (!selectedCourseSectionId) {
        return (
            <div className="py-10 text-center text-gray-400">Vui lòng chọn học phần để xem lịch.</div>
        );
    }
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 size={24} className="animate-spin text-[#ec5d15]" />
                <p className="text-xs text-gray-400">Đang tải lịch học...</p>
            </div>
        );
    }
    return (
        <div className="flex flex-col max-h-[70vh]">
            <div className="flex-1 overflow-y-auto py-2 pr-2 custom-scrollbar">
                {RenderScheduleList('Lý thuyết', theorySchedules, 'bg-blue-500')}
                {RenderScheduleList('Thực hành', practiceSchedules, 'bg-emerald-500')}
                {RenderScheduleList('Trực tuyến', onlineSchedules, 'bg-purple-500')}

                {hasNoData && (
                    <div className="py-20 text-center space-y-3">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                            <Layout size={20} className="text-gray-300" />
                        </div>
                        <p className="text-xs text-gray-400 italic">Học phần này hiện chưa có lịch học.</p>
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <X size={14} />
                    Đóng
                </button>
            </div>
        </div>
    );
}