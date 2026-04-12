"use client"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"

import { useEffect, useState } from "react"
import { useComfirmGrade } from "@/hooks/lecturer/courseSection/useComfirmGrade"
import { IConfirmGrade, IStudentEnrollmentIsPaid } from "@/app/types/lecturer/courseSection/courseSection.type"

export default function GradeModal({
    student,
    open,
    onClose,
}: {
    student: IStudentEnrollmentIsPaid
    open: boolean
    onClose: () => void
}) {
    const { mutate, isPending } = useComfirmGrade(onClose)
    const [form, setForm] = useState({
        enrollmentId: student.enrollmentId,
        theory1: "",
        theory2: "",
        midterm: "",
        final: "",
    })
    useEffect(() => {
        if (open) {
            setForm({
                enrollmentId: student.enrollmentId,
                theory1: student.theory1?.toString() ?? "",
                theory2: student.theory2?.toString() ?? "",
                midterm: student.midterm?.toString() ?? "",
                final: student.final?.toString() ?? "",
            })
        }
    }, [open, student])
    const set = (field: keyof Omit<IConfirmGrade, "enrollmentId">, value: string) => {
        if (!/^\d*\.?\d*$/.test(value)) return

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }
    const toNumber = (v: string) => {
        if (v === "" || v === ".") return null
        const num = parseFloat(v)
        if (isNaN(num)) return null
        return Math.min(10, Math.max(0, num))
    }
    const scoreColor = (v: string) => {
        const num = toNumber(v)
        if (num === null) return "text-gray-400 border-gray-200"
        if (num >= 8) return "text-green-600 border-green-300"
        if (num >= 5) return "text-amber-600 border-amber-300"
        return "text-red-500 border-red-300"
    }
    const isValid = () => {
        const fields = ["theory1", "theory2", "midterm", "final"] as const
        return fields.every((key) => {
            const val = form[key]
            const num = toNumber(val)
            return num !== null && num >= 0 && num <= 10
        })
    }
    const handleSubmit = () => {
        const payload = {
            enrollmentId: form.enrollmentId,
            theory1: toNumber(form.theory1) ?? 0,
            theory2: toNumber(form.theory2) ?? 0,
            midterm: toNumber(form.midterm) ?? 0,
            final: toNumber(form.final) ?? 0,
        }

        mutate([payload])
    }

    const fields = [
        { label: "Chuyên cần 1", key: "theory1" },
        { label: "Chuyên cần 2", key: "theory2" },
        { label: "Giữa kỳ", key: "midterm" },
        { label: "Cuối kỳ", key: "final" },
    ] as const

    return (
        <Drawer
            open={open}
            onOpenChange={(val) => {
                if (!val) onClose()
            }}
        >
            <DrawerContent className="max-h-[90vh] px-4 pb-4">
                <DrawerHeader>
                    <DrawerTitle>{student.fullName}</DrawerTitle>
                    <p className="text-xs text-gray-400">{student.studentCode}</p>
                </DrawerHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    {fields.map(({ label, key }) => (
                        <div key={key} className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-500">
                                {label}
                            </label>

                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="0 - 10"
                                value={form[key]}
                                onChange={(e) => set(key, e.target.value)}
                                onBlur={(e) => {
                                    const num = toNumber(e.target.value)
                                    if (num !== null) {
                                        set(key, num.toString())
                                    }
                                }}
                                className={`rounded-xl border px-3 py-2 text-center text-sm outline-none transition focus:ring-2 focus:ring-blue-400 ${scoreColor(form[key])}`}
                            />
                        </div>
                    ))}
                </div>
                <DrawerFooter className="flex-row gap-3">
                    <DrawerClose asChild>
                        <button className="flex-1 rounded-xl border py-2 text-sm font-medium">
                            Huỷ
                        </button>
                    </DrawerClose>

                    <button
                        disabled={!isValid() || isPending}
                        onClick={handleSubmit}
                        className="flex-1 rounded-xl bg-orange-100 py-2 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 disabled:opacity-50"
                    >
                        {isPending ? "Đang lưu..." : "Xác nhận"}
                    </button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}