"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import viLocale from "@fullcalendar/core/locales/vi";
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { CalendarApi } from "@fullcalendar/core";
import {
    IScheduleLecturer,
    IStudySchedulesOfSchedule,
    TTypeLecturer,
} from "@/types/lecturer/schedule/schedule.type";
interface StudyMeta {
    kind: "STUDY";
    type: TTypeLecturer;
    subjectCode: string;
    subjectName: string;
    room: string;
    semester: string;
    academicYear: string;
    startTimeLabel: string;
    endTimeLabel: string;
}
const STUDY_TYPE_COLOR: Record<
    TTypeLecturer,
    { bg: string; text: string; border: string }
> = {
    THEORY: { bg: "#DBEAFE", text: "#1E40AF", border: "#3B82F6" },
    PRACTICE: { bg: "#D1FAE5", text: "#065F46", border: "#10B981" },
    ONLINE: { bg: "#EDE9FE", text: "#5B21B6", border: "#8B5CF6" },
};

const STUDY_TYPE_LABEL: Record<TTypeLecturer, string> = {
    THEORY: "Lý thuyết",
    PRACTICE: "Thực hành",
    ONLINE: "Trực tuyến",
};

const DOW_TO_RRULE_NUM: Record<number, number> = {
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
};

const DOW_TO_JS: Record<number, number> = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 0,
};
const minutesToTime = (minutes: number): string => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};
const findFirstOccurrence = (startDate: string, dayOfWeek: number): string => {
    const targetDay = DOW_TO_JS[dayOfWeek];
    const date = new Date(startDate);
    while (date.getDay() !== targetDay) {
        date.setDate(date.getDate() + 1);
    }
    return date.toISOString().slice(0, 10);
};

const getDuration = (start: string, end: string): string => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const diff = (eh * 60 + em) - (sh * 60 + sm);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const formatDateVN = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN");

const isValidDateString = (value: string | null): value is string => {
    if (!value) return false;
    return !Number.isNaN(new Date(value).getTime());
};
const toStudyEvent = (schedule: IStudySchedulesOfSchedule, index: number) => {
    const startDateOnly = schedule.startDate.slice(0, 10);
    const endDateOnly = schedule.endDate.slice(0, 10);

    const firstDate = findFirstOccurrence(startDateOnly, schedule.dayOfWeek);
    const startTimeLabel = minutesToTime(schedule.startTime);
    const endTimeLabel = minutesToTime(schedule.endTime);

    const color = STUDY_TYPE_COLOR[schedule.type] ?? STUDY_TYPE_COLOR.THEORY;

    const meta: StudyMeta = {
        kind: "STUDY",
        type: schedule.type,
        subjectCode: schedule.subjectCode,
        subjectName: schedule.subjectName,
        room: schedule.room,
        semester: schedule.semester,
        academicYear: schedule.academicYear,
        startTimeLabel,
        endTimeLabel,
    };

    return {
        id: `study-${schedule.subjectCode}-${schedule.dayOfWeek}-${schedule.startTime}-${index}`,
        title: schedule.subjectName,
        rrule: {
            freq: "weekly",
            byweekday: [DOW_TO_RRULE_NUM[schedule.dayOfWeek]],
            dtstart: `${firstDate}T${startTimeLabel}:00`,
            until: `${endDateOnly}T23:59:59`,
        },
        duration: getDuration(startTimeLabel, endTimeLabel),
        backgroundColor: color.bg,
        borderColor: color.border,
        textColor: color.text,
        extendedProps: meta,
    };
};
function LegendDot({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span>{label}</span>
        </div>
    );
}
function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <span className="w-20 shrink-0 pt-0.5 text-xs text-gray-400">{label}</span>
            <span className="text-sm font-medium text-gray-700">{value}</span>
        </div>
    );
}
function EventContent({ info }: { info: EventContentArg }) {
    const meta = info.event.extendedProps as StudyMeta;
    const isMonthView = info.view.type === "dayGridMonth";

    if (isMonthView) {
        return (
            <div className="flex w-full items-center gap-1 overflow-hidden px-1 py-0.5">
                <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: info.event.borderColor }}
                />
                <span
                    className="truncate text-[11px] font-medium"
                    style={{ color: info.event.textColor }}
                >
                    {info.event.title}
                </span>
            </div>
        );
    }
    return (
        <div className="h-full overflow-hidden px-1.5 py-1">
            <p
                className="truncate text-[11px] font-semibold leading-tight"
                style={{ color: info.event.textColor }}
            >
                {info.event.title}
            </p>
            <p
                className="mt-0.5 truncate text-[10px] opacity-80"
                style={{ color: info.event.textColor }}
            >
                {meta.startTimeLabel} – {meta.endTimeLabel}
            </p>
            <p
                className="truncate text-[10px] opacity-70"
                style={{ color: info.event.textColor }}
            >
                {meta.room}
            </p>
        </div>
    );
}
function EventModal({ meta, onClose }: { meta: StudyMeta; onClose: () => void }) {
    const color = STUDY_TYPE_COLOR[meta.type];
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="px-5 py-4"
                    style={{
                        backgroundColor: color.bg,
                        borderBottom: `1px solid ${color.border}20`,
                    }}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <span
                                className="rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{
                                    backgroundColor: `${color.border}25`,
                                    color: color.text,
                                }}
                            >
                                {STUDY_TYPE_LABEL[meta.type]}
                            </span>
                            <h3
                                className="mt-2 text-sm font-semibold leading-snug"
                                style={{ color: color.text }}
                            >
                                {meta.subjectName}
                            </h3>
                            <p
                                className="mt-0.5 text-xs opacity-70"
                                style={{ color: color.text }}
                            >
                                {meta.subjectCode}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-0.5 text-xl leading-none text-gray-400 transition hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                </div>
                <div className="space-y-2.5 px-5 py-4">
                    <DetailRow
                        label="Thời gian"
                        value={`${meta.startTimeLabel} – ${meta.endTimeLabel}`}
                    />
                    <DetailRow label="Phòng" value={meta.room} />
                    <DetailRow
                        label="Học kỳ"
                        value={`${meta.semester} – ${meta.academicYear}`}
                    />
                    <DetailRow label="Hình thức" value={STUDY_TYPE_LABEL[meta.type]} />
                </div>
            </div>
        </div>
    );
}
interface IScheduleLecturerProps {
    data: IScheduleLecturer;
}

export default function ScheduleLecturer({ data }: IScheduleLecturerProps) {
    const searchParams = useSearchParams();
    const calendarRef = useRef<FullCalendar | null>(null);

    const [selectedMeta, setSelectedMeta] = useState<StudyMeta | null>(null);

    const rawDate = searchParams.get("date");
    const selectedDate = isValidDateString(rawDate) ? rawDate : data.weekStart;

    const events = useMemo(
        () => (data.studySchedules ?? []).map((item, index) => toStudyEvent(item, index)),
        [data.studySchedules],
    );

    useEffect(() => {
        const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
        if (!calendarApi || !selectedDate) return;

        const timer = setTimeout(() => {
            calendarApi.gotoDate(selectedDate);
        }, 0);

        return () => clearTimeout(timer);
    }, [selectedDate]);

    const handleEventClick = (info: EventClickArg) => {
        setSelectedMeta(info.event.extendedProps as StudyMeta);
    };

    return (
        <div className="w-full">
            <p className="mb-4 text-sm text-gray-500 dark:text-white">
                Tuần:{" "}
                <span className="font-medium text-gray-700 dark:text-[#eebbc3]">
                    {formatDateVN(data.weekStart)}
                </span>
                {" – "}
                <span className="font-medium text-gray-700 dark:text-[#eebbc3]">
                    {formatDateVN(data.weekEnd)}
                </span>
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
                    locales={[viLocale]}
                    locale="vi"
                    initialView="dayGridMonth"
                    initialDate={selectedDate}
                    firstDay={1}
                    headerToolbar={{
                        left: "",
                        center: "title",
                        right: "",
                    }}
                    titleFormat={{ year: "numeric", month: "long" }}
                    events={events}
                    eventContent={(info) => <EventContent info={info} />}
                    eventClick={handleEventClick}
                    dayMaxEvents={3}
                    height="auto"
                    slotMinTime="06:00:00"
                    slotMaxTime="22:00:00"
                />
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                <LegendDot color="#3B82F6" label="Lý thuyết" />
                <LegendDot color="#10B981" label="Thực hành" />
                <LegendDot color="#8B5CF6" label="Trực tuyến" />
            </div>
            {selectedMeta && (
                <EventModal
                    meta={selectedMeta}
                    onClose={() => setSelectedMeta(null)}
                />
            )}
        </div>
    );
}