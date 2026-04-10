"use client"
import { IConfirmGrade, IStudentEnrollmentIsPaid } from "@/app/types/lecturer/courseSection/courseSection.type";
import { useComfirmGrade } from "@/hooks/lecturer/courseSection/useComfirmGrade";
import { useState } from "react";

export default function GradeModal({
    student,
    onClose,
}: {
    student: IStudentEnrollmentIsPaid;
    onClose: () => void;
}) {
    const { mutate, isPending } = useComfirmGrade(onClose);

    const [form, setForm] = useState<IConfirmGrade>({
        enrollmentId: student.enrollmentId,
        theory1: student.theory1,
        theory2: student.theory2,
        midterm: student.midterm,
        final: student.final,
    });

    const set = (field: keyof Omit<IConfirmGrade, "enrollmentId">, value: string) => {
        const num = parseFloat(value);
        setForm((prev) => ({ ...prev, [field]: isNaN(num) ? 0 : Math.min(10, Math.max(0, num)) }));
    };

    const fields: { label: string; key: keyof Omit<IConfirmGrade, "enrollmentId"> }[] = [
        { label: "Chuyên cần 1", key: "theory1" },
        { label: "Chuyên cần 2", key: "theory2" },
        { label: "Giữa kỳ", key: "midterm" },
        { label: "Cuối kỳ", key: "final" },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div className="border-b border-gray-100 px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                            <p className="mt-0.5 text-xs text-gray-400">{student.studentCode}</p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-xl leading-none text-gray-400 hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* body */}
                <div className="space-y-3 px-5 py-4">
                    {fields.map(({ label, key }) => (
                        <div key={key} className="flex items-center justify-between gap-4">
                            <label className="w-28 shrink-0 text-sm text-gray-500">{label}</label>
                            <input
                                type="number"
                                min={0}
                                max={10}
                                step={0.1}
                                value={form[key]}
                                onChange={(e) => set(key, e.target.value)}
                                className="w-24 rounded-lg border border-gray-200 px-3 py-1.5 text-right text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    ))}
                </div>

                {/* footer */}
                <div className="flex gap-2 border-t border-gray-100 px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        Huỷ
                    </button>
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={() => mutate(form)}
                        className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? "Đang lưu..." : "Xác nhận"}
                    </button>
                </div>
            </div>
        </div>
    );
}