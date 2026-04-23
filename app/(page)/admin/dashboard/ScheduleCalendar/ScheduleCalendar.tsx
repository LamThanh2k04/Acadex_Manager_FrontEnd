"use client"
import { IScheduleResponseProps } from "@/types/admin/overview.type"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Loader } from 'lucide-react';
export default function ScheduleCalendar({ data, date, setDate, page, setPage, isFetching }: IScheduleResponseProps) {
    const selectedDate = new Date(date)

    const handleSelectDate = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(format(newDate, "yyyy-MM-dd"))
        }
    }
    const getTypeLabel = (type: string) => {
        switch (type) {
            case "THEORY": return { label: "Lý thuyết", color: "bg-blue-100 text-blue-600" }
            case "PRACTICE": return { label: "Thực hành", color: "bg-green-100 text-green-600" }
            case "ONLINE": return { label: "Online", color: "bg-orange-100 text-[#ec5d15]" }
            default: return { label: type, color: "bg-gray-100 text-gray-600" }
        }
    }
    const formatTime = (minutes: number) => {
        const h = Math.floor(minutes / 60)
        const m = minutes % 60
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
    }
    return (
        <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:mb-5">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                locale={vi}
                className="rounded-xl border border-orange-100 w-full"
            />
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-700 mb-3">
                    Lịch ngày {format(selectedDate, "dd/MM/yyyy")}
                </h3>
                {isFetching && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Loader className="size-3 animate-spin text-[#ec5d15]" />
                        Đang tải...
                    </div>
                )}
            </div>
            <div className={isFetching ? "opacity-50 pointer-events-none" : ""}>
                {data.schedules.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                        Không có lịch học trong ngày này
                    </p>
                ) : (
                    <div className="flex flex-col bg-white gap-3">
                        {data.schedules.map((schedule) => {
                            const { label, color } = getTypeLabel(schedule.type)
                            return (
                                <div
                                    key={schedule.id}
                                    className="border border-orange-100 rounded-xl p-3 flex flex-col gap-1.5 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-sm text-gray-800">
                                            {schedule.courseSection.subject.name}
                                        </p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>
                                            {label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {formatTime(schedule.startTimeMinutes)} — {formatTime(schedule.endTimeMinutes)}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{schedule.courseSection.plannedClass.name}</span>
                                        <span>{schedule.room.building.symbol} - {schedule.room.name}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            {data.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-3">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="text-xs px-3 py-1.5 border border-orange-100 rounded-lg
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   hover:bg-orange-50 text-[#ec5d15] transition"
                    >
                        Trước
                    </button>
                    <span className="text-xs text-gray-400">
                        {page} / {data.pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === data.pagination.totalPages}
                        className="text-xs px-3 py-1.5 border border-orange-100 rounded-lg
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   hover:bg-orange-50 text-[#ec5d15] transition"
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    )
}
