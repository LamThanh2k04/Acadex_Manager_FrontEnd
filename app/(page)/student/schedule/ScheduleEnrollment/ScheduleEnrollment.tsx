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
    IScheduleEnrollmentDataProps,
    IStudySchedules,
    IExamSchedules,
    TTypeOfStudySchedules,
} from "@/app/types/student/scheduleEnrollment.type";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ScheduleFilterType = "" | "STUDY" | "EXAM";

interface StudyMeta {
    kind: "STUDY";
    type: TTypeOfStudySchedules;
    subjectCode: string;
    subjectName: string;
    room: string;
    semester: string;
    academicYear: string;
    startTimeLabel: string;
    endTimeLabel: string;
}

interface ExamMeta {
    kind: "EXAM";
    subjectCode: string;
    subjectName: string;
    room: string;
    semester: string;
    academicYear: string;
    startTimeLabel: string;
    endTimeLabel: string;
}

type EventMeta = StudyMeta | ExamMeta;

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STUDY_TYPE_COLOR: Record<
    TTypeOfStudySchedules,
    { bg: string; text: string; border: string }
> = {
    THEORY: { bg: "#DBEAFE", text: "#1E40AF", border: "#3B82F6" },
    PRACTICE: { bg: "#D1FAE5", text: "#065F46", border: "#10B981" },
    ONLINE: { bg: "#EDE9FE", text: "#5B21B6", border: "#8B5CF6" },
};

const EXAM_COLOR = {
    bg: "#FEE2E2",
    text: "#991B1B",
    border: "#EF4444",
};

const STUDY_TYPE_LABEL: Record<TTypeOfStudySchedules, string> = {
    THEORY: "Lý thuyết",
    PRACTICE: "Thực hành",
    ONLINE: "Trực tuyến",
};

/**
 * Backend dayOfWeek:
 * 1 = Thứ 2 ... 6 = Thứ 7, 7 = Chủ nhật
 *
 * RRULE byweekday:
 * MO=0, TU=1, WE=2, TH=3, FR=4, SA=5, SU=6
 */
const DOW_TO_RRULE_NUM: Record<number, number> = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
};

/**
 * JS Date.getDay():
 * 0 = Chủ nhật, 1 = Thứ 2 ... 6 = Thứ 7
 */
const DOW_TO_JS: Record<number, number> = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 0,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert tiết học → HH:mm
 * Tiết 1 = 07:00, mỗi tiết = 50 phút
 */
const tietToTime = (tiet: number): string => {
    const totalMinutes = (tiet - 1) * 50 + 7 * 60;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

/**
 * Convert số phút từ 00:00 → HH:mm
 * Ví dụ: 480 = 08:00
 */
const minutesToTime = (minutes: number): string => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

/**
 * Từ startDate của môn, tìm ngày đầu tiên khớp đúng dayOfWeek
 * để dtstart của RRULE không bị lệch thứ.
 */
const findFirstOccurrence = (startDate: string, dayOfWeek: number): string => {
    const targetDay = DOW_TO_JS[dayOfWeek];
    const date = new Date(startDate);

    while (date.getDay() !== targetDay) {
        date.setDate(date.getDate() + 1);
    }

    return date.toISOString().slice(0, 10);
};

/**
 * Tính duration HH:mm cho FullCalendar RRULE
 */
const getDuration = (start: string, end: string): string => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;
    const diff = endTotal - startTotal;

    const hour = Math.floor(diff / 60);
    const minute = diff % 60;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const formatDateVN = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN");

const isValidFilterType = (value: string | null): value is ScheduleFilterType => {
    return value === "" || value === "STUDY" || value === "EXAM";
};

const isValidDateString = (value: string | null): value is string => {
    if (!value) return false;
    return !Number.isNaN(new Date(value).getTime());
};

// ─────────────────────────────────────────────────────────────────────────────
// Convert data → calendar events
// ─────────────────────────────────────────────────────────────────────────────

const toStudyEvent = (schedule: IStudySchedules, index: number) => {
    const firstDate = findFirstOccurrence(schedule.startDate, schedule.dayOfWeek);
    const startTimeLabel = tietToTime(schedule.startTime);

    /**
     * endTime là tiết cuối cùng,
     * nên +1 để ra thời điểm kết thúc thực tế
     */
    const endTimeLabel = tietToTime(schedule.endTime + 1);

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
            until: `${schedule.endDate}T23:59:59`,
        },
        duration: getDuration(startTimeLabel, endTimeLabel),
        backgroundColor: color.bg,
        borderColor: color.border,
        textColor: color.text,
        extendedProps: meta,
    };
};

const toExamEvent = (exam: IExamSchedules) => {
    const startTimeLabel = minutesToTime(exam.startMinute);
    const endTimeLabel = minutesToTime(exam.endMinute);

    const meta: ExamMeta = {
        kind: "EXAM",
        subjectCode: exam.subjectCode,
        subjectName: exam.subjectName,
        room: exam.room,
        semester: exam.semester,
        academicYear: exam.academicYear,
        startTimeLabel,
        endTimeLabel,
    };

    return {
        id: `exam-${exam.subjectCode}-${exam.examDate}`,
        title: exam.subjectName,
        start: `${exam.examDate}T${startTimeLabel}:00`,
        end: `${exam.examDate}T${endTimeLabel}:00`,
        backgroundColor: EXAM_COLOR.bg,
        borderColor: EXAM_COLOR.border,
        textColor: EXAM_COLOR.text,
        extendedProps: meta,
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// UI nhỏ
// ─────────────────────────────────────────────────────────────────────────────

function LegendDot({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: color }}
            />
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

// ─────────────────────────────────────────────────────────────────────────────
// Event content
// ─────────────────────────────────────────────────────────────────────────────

function EventContent({ info }: { info: EventContentArg }) {
    const meta = info.event.extendedProps as EventMeta;
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
                    {meta.kind === "EXAM" ? "[THI] " : ""}
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
                {meta.kind === "EXAM" ? "[THI] " : ""}
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

// ─────────────────────────────────────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────────────────────────────────────

function EventModal({
    meta,
    onClose,
}: {
    meta: EventMeta;
    onClose: () => void;
}) {
    const isStudy = meta.kind === "STUDY";

    const accentBg = isStudy ? STUDY_TYPE_COLOR[meta.type].bg : EXAM_COLOR.bg;
    const accentText = isStudy ? STUDY_TYPE_COLOR[meta.type].text : EXAM_COLOR.text;
    const accentBorder = isStudy
        ? STUDY_TYPE_COLOR[meta.type].border
        : EXAM_COLOR.border;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="px-5 py-4"
                    style={{
                        backgroundColor: accentBg,
                        borderBottom: `1px solid ${accentBorder}20`,
                    }}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <span
                                className="rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{
                                    backgroundColor: `${accentBorder}25`,
                                    color: accentText,
                                }}
                            >
                                {isStudy
                                    ? STUDY_TYPE_LABEL[(meta as StudyMeta).type]
                                    : "Kỳ thi"}
                            </span>

                            <h3
                                className="mt-2 text-sm font-semibold leading-snug"
                                style={{ color: accentText }}
                            >
                                {meta.subjectName}
                            </h3>

                            <p
                                className="mt-0.5 text-xs opacity-70"
                                style={{ color: accentText }}
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

                {/* Body */}
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
                    {isStudy && (
                        <DetailRow
                            label="Hình thức"
                            value={STUDY_TYPE_LABEL[(meta as StudyMeta).type]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function ScheduleEnrollment({
    data,
}: IScheduleEnrollmentDataProps) {
    const searchParams = useSearchParams();
    const calendarRef = useRef<FullCalendar | null>(null);

    const [selectedMeta, setSelectedMeta] = useState<EventMeta | null>(null);

    const rawType = searchParams.get("type");
    const rawDate = searchParams.get("date");

    const selectedType: ScheduleFilterType = isValidFilterType(rawType)
        ? rawType
        : "";

    const selectedDate = isValidDateString(rawDate) ? rawDate : data.weekStart;

    const events = useMemo(() => {
        const studyEvents =
            selectedType === "EXAM"
                ? []
                : (data.studySchedules ?? []).map((item, index) =>
                    toStudyEvent(item, index)
                );

        const examEvents =
            selectedType === "STUDY"
                ? []
                : (data.examSchedules ?? []).map(toExamEvent);

        return [...studyEvents, ...examEvents];
    }, [data, selectedType]);

    useEffect(() => {
        const calendarApi: CalendarApi | undefined =
            calendarRef.current?.getApi();

        if (!calendarApi || !selectedDate) return;

        calendarApi.gotoDate(selectedDate);
    }, [selectedDate]);

    const handleEventClick = (info: EventClickArg) => {
        setSelectedMeta(info.event.extendedProps as EventMeta);
    };

    return (
        <div className="w-full">
            {/* Week info */}
            <p className="mb-4 text-sm text-gray-500">
                Tuần:{" "}
                <span className="font-medium text-gray-700">
                    {formatDateVN(data.weekStart)}
                </span>
                {" – "}
                <span className="font-medium text-gray-700">
                    {formatDateVN(data.weekEnd)}
                </span>
            </p>

            {/* Calendar */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        rrulePlugin,
                    ]}
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
                    titleFormat={{
                        year: "numeric",
                        month: "long",
                    }}
                    events={events}
                    eventContent={(info) => <EventContent info={info} />}
                    eventClick={handleEventClick}
                    dayMaxEvents={3}
                    height="auto"
                    slotMinTime="06:00:00"
                    slotMaxTime="22:00:00"
                />
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                <LegendDot color="#3B82F6" label="Lý thuyết" />
                <LegendDot color="#10B981" label="Thực hành" />
                <LegendDot color="#8B5CF6" label="Trực tuyến" />
                <LegendDot color="#EF4444" label="Kỳ thi" />
            </div>

            {/* Modal */}
            {selectedMeta && (
                <EventModal
                    meta={selectedMeta}
                    onClose={() => setSelectedMeta(null)}
                />
            )}
        </div>
    );
}