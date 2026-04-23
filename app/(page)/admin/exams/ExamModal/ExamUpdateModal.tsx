"use client"
import { IExamScheduleData, TUpdateExamScheduleInfo } from '@/types/admin/exam.type';
import { formatDateForInput } from "@/utils/date"
import { useUpdateExamScheduleInfo, useGetAvailableRoomForExamSchedule } from '@/hooks/admin/useExam';
import { useForm } from "react-hook-form"
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';
import { useGetAllRoomSimple } from '@/hooks/admin/useSimple';
export default function ExamUpdateModal({ onClose, selectedExamSchedule }: { onClose: () => void, selectedExamSchedule: IExamScheduleData }) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<TUpdateExamScheduleInfo>({
        defaultValues: {
            examDate: formatDateForInput(selectedExamSchedule.examDate),
            startMinute: selectedExamSchedule.startMinute,
            endMinute: selectedExamSchedule.endMinute,
            roomId: selectedExamSchedule.room.id,
            note: selectedExamSchedule.note
        }
    });
    const mutation = useUpdateExamScheduleInfo(onClose);
    const { data: roomSimpleData, isLoading: isLoadingRoomSimpleData } = useGetAllRoomSimple();
    const onSubmit = (data: TUpdateExamScheduleInfo) => {
        mutation.mutate({
            examScheduleId: selectedExamSchedule.id, data: {
                examDate: data.examDate,
                startMinute: data.startMinute,
                endMinute: data.endMinute,
                roomId: data.roomId,
                note: data.note
            }
        })
    };
    if (isLoadingRoomSimpleData) {
        return (
            <div className="flex items-center justify-center py-10">
                <Loader className="size-5 animate-spin text-orange-400" />
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Ngày thi <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("examDate", {
                        required: "Ngày thi không được để trống"
                    })}
                />
                <ErrorResponse error={errors.examDate} />
            </div>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Giờ bắt đầu (phút) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Ví dụ: 420"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("startMinute", {
                            required: "Giờ bắt đầu không được bỏ trống",
                        })}
                    />
                    <ErrorResponse error={errors.startMinute} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Giờ kết thúc (phút) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Ví dụ: 540"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("endMinute", {
                            required: "Giờ kết thúc không được bỏ trống",
                        })}
                    />
                    <ErrorResponse error={errors.endMinute} />
                </div>
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Phòng thi <span className="text-red-500">*</span>
                </label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    {...register("roomId", {
                        required: "Phòng thi không được bỏ trống",
                    })}
                >
                    <option value="">-- Chọn phòng thi --</option>
                    {isLoadingRoomSimpleData ? (
                        <option disabled>Đang tải...</option>
                    ) : (
                        roomSimpleData?.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.name} - {a.building.name}
                            </option>
                        ))
                    )}
                </select>
                <ErrorResponse error={errors.roomId} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Ghi chú
                </label>
                <input
                    type="text"
                    placeholder="Nhập ghi chú (nếu có)..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("note")}
                />
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => {
                        onClose();
                        reset();
                    }}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                    Huỷ
                </button>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 text-sm bg-[#ec5d15] cursor-pointer text-white rounded-lg hover:bg-orange-500 transition disabled:opacity-50 flex items-center gap-2"
                >
                    {mutation.isPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            Đang cập nhật...
                        </>
                    ) : (
                        "Lưu thay đổi"
                    )}
                </button>
            </div>
        </form>
    )
}