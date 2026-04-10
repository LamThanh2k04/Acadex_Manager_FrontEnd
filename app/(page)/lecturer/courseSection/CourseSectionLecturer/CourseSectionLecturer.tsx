"use client"
import { ICourseSection } from "@/app/types/lecturer/courseSection/courseSection.type";

export function CourseSectionLecturer({
    section,
    isSelected,
    onClick,
}: {
    section: ICourseSection;
    isSelected: boolean;
    onClick: () => void;
}) {
    const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
        THEORY: { bg: "#DBEAFE", text: "#1E40AF" },
        PRACTICE: { bg: "#D1FAE5", text: "#065F46" },
        ONLINE: { bg: "#EDE9FE", text: "#5B21B6" },
    };
    const typeKey = section.isActive ? "THEORY" : "THEORY";
    const color = TYPE_COLOR.THEORY;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-2xl border p-4 text-left transition-all ${isSelected
                ? "border-blue-400 bg-blue-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-medium text-gray-900">
                            {section.subject.name}
                        </span>
                        <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                            style={{ backgroundColor: color.bg, color: color.text }}
                        >
                            {section.subject.credits} tín chỉ
                        </span>
                        {section.isActive ? (
                            <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                                Đang hoạt động
                            </span>
                        ) : (
                            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                                Đã kết thúc
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                        <span className="text-xs text-gray-500">
                            Mã lớp: <span className="text-gray-700">{section.sectionCode}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                            Lớp: <span className="text-gray-700">{section.plannedClass.name}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                            Học kỳ: <span className="text-gray-700">{section.semester.name} – {section.semester.academicYear}</span>
                        </span>
                    </div>
                </div>
                <div className="shrink-0 text-right">
                    <p className="text-xl font-semibold text-gray-900">{section.maxStudents}</p>
                    <p className="text-[11px] text-gray-400">tối đa</p>
                </div>
            </div>
        </button>
    );
}
