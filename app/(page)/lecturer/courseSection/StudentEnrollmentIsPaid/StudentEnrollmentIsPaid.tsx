"use client"
import { IStudentEnrollmentIsPaid } from "@/app/types/lecturer/courseSection/courseSection.type";
import { useGetStudentEnrollmentIsPaid } from "@/hooks/lecturer/courseSection/useGetStudentEnrollmentIsPaid";
import { useState } from "react";
import GradeModal from "../GradeModal/GradeModal";
import { useSearchParams } from "next/navigation";
export function StudentEnrollmentIsPaid({
    courseSectionId,
}: {
    courseSectionId: number;
}) {
    const [gradeTarget, setGradeTarget] = useState<IStudentEnrollmentIsPaid | null>(null);
    const searchParams = useSearchParams();
    const search = searchParams.get("searchStudent") ?? "";
    const { data, isLoading } = useGetStudentEnrollmentIsPaid(courseSectionId, search);
    const students: IStudentEnrollmentIsPaid[] = data?.students ?? [];
    const scoreColor = (score: number | null) => {
        if (score === null) return "text-gray-300";
        if (score >= 8) return "text-green-600";
        if (score >= 5) return "text-amber-600";
        return "text-red-500";
    };
    const AVATAR_COLORS = ["#DBEAFE|#1E40AF", "#D1FAE5|#065F46", "#EDE9FE|#5B21B6", "#FEF9C3|#854D0E"];
    function avatarColor(name: string) {
        const [bg, text] = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length].split("|");
        return { bg, text };
    }
    function getInitials(name: string) {
        return name
            .split(" ")
            .slice(-2)
            .map((w) => w[0])
            .join("")
            .toUpperCase();
    }
    return (
        <>
            <div className="mb-3 flex items-center gap-3">
                <span className="shrink-0 text-xs text-gray-400">
                    {data?.pagination?.total ?? 0} sinh viên
                </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="grid grid-cols-[2fr_1fr_repeat(4,0.8fr)_0.8fr_0.8fr_0.6fr] gap-x-2 border-b border-gray-100 bg-gray-50 px-4 py-2.5 dark:bg-gray-900">
                    {["Họ tên", "MSSV", "CC1", "CC2", "Giữa kỳ", "Cuối kỳ", "Tổng kết"].map((h) => (
                        <span key={h} className="text-xs font-medium text-gray-500">{h}</span>
                    ))}
                </div>

                {isLoading ? (
                    <div className="py-12 text-center text-sm text-gray-400">Đang tải...</div>
                ) : students.length === 0 ? (
                    <div className="py-12 text-center text-sm text-gray-400">Không tìm thấy sinh viên</div>
                ) : (
                    students.map((s) => {
                        const { bg, text } = avatarColor(s.fullName);
                        return (
                            <div
                                key={s.enrollmentId}
                                className="grid grid-cols-[2fr_1fr_repeat(4,0.8fr)_0.8fr_0.8fr_0.6fr] gap-x-2 border-b border-gray-100 dark:bg-gray-900 px-4 py-3 last:border-0 hover:bg-gray-50"
                            >
                                <div className="flex min-w-0 items-center gap-2.5">
                                    {s.avatar ? (
                                        <img src={s.avatar} className="h-7 w-7 shrink-0 rounded-full object-cover" alt="" />
                                    ) : (
                                        <div
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium"
                                            style={{ backgroundColor: bg, color: text }}
                                        >
                                            {getInitials(s.fullName)}
                                        </div>
                                    )}
                                    <span className="truncate text-sm text-gray-800 dark:text-white">{s.fullName}</span>
                                </div>
                                <span className="self-center text-sm text-gray-500">{s.studentCode}</span>
                                {([s.theory1, s.theory2, s.midterm, s.final] as (number | null)[]).map((v, i) => (
                                    <span key={i} className={`self-center text-sm font-medium ${scoreColor(v)}`}>
                                        {v ?? "—"}
                                    </span>
                                ))}
                                <span className={`self-center text-sm font-medium ${scoreColor(s.totalScore)}`}>
                                    {s.totalScore}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setGradeTarget(s)}
                                    className="self-center rounded-lg border-none px-4 py-1 text-[10px] md:text-[12px] dark:bg-[#eebbc3] dark:text-[#232946] bg-orange-100 text-orange-400 hover:bg-orange-400 hover:text-white duration-300 transition-all"
                                >
                                    Nhập điểm
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
            {gradeTarget && (
                <GradeModal student={gradeTarget}
                    open={!!gradeTarget}
                    onClose={() => setGradeTarget(null)}
                />
            )}
        </>
    );
}