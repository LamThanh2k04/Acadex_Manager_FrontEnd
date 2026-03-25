"use client";
import { useCreateExamSchedule, useGetAvailableRoomForExamSchedule, useGetCourseSectionHaveSchedule, useGetSuggestExamSchedule } from "@/hooks/admin/useExam";
import { useGetAllSemesterSimple } from "@/hooks/admin/useSimple";
import { useForm } from "react-hook-form";
import { ICreateExamSchedule, ICreateExamScheduleForm } from "@/app/types/admin/exam.type";
import ErrorResponse from "@/app/(auth)/login/ErrorResponse";
import { useEffect } from "react";
import { formatDateForInput } from "@/app/utils/date";
import { Loader } from "lucide-react";

export default function ExamCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ICreateExamScheduleForm>({
        mode: "onBlur"
    });
    const selectedSemesterId = watch("semesterId");
    const selectedCourseSectionId = watch("courseSectionId");
    const selectedDate = watch("examDate");
    const selectedStartMinute = watch("startMinute");
    const selectedEndMinute = watch("endMinute");
    const { data: semesterData, isLoading: isLoadingSemester } = useGetAllSemesterSimple();
    const { data: courseSectionData, isLoading: isLoadingCourseSection } =
        useGetCourseSectionHaveSchedule(selectedSemesterId);

    const { data: suggestExamScheduleData, isLoading: isLoadingSuggestExamSchedule } =
        useGetSuggestExamSchedule(selectedCourseSectionId);

    const { data: availableRoomData, isLoading: isLoadingAvailableRoom } =
        useGetAvailableRoomForExamSchedule(
            selectedDate,
            selectedStartMinute,
            selectedEndMinute
        );
    const mutation = useCreateExamSchedule(onClose);
    const onSubmit = (data: ICreateExamScheduleForm) => {
        const payload: ICreateExamSchedule = {
            courseSectionId: data.courseSectionId,
            examDate: data.examDate,
            startMinute: data.startMinute,
            endMinute: data.endMinute,
            roomId: data.roomId,
            note: data.note
        };
        mutation.mutate(payload);
    };
    useEffect(() => {
        if (suggestExamScheduleData?.suggestedExamDate) {
            setValue("examDate", formatDateForInput(suggestExamScheduleData.suggestedExamDate));
        }
    }, [suggestExamScheduleData, setValue]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Học kì <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("semesterId", {
                            required: "Học kì không được bỏ trống",
                        })}
                    >
                        <option value="">-- Chọn học kì --</option>
                        {isLoadingSemester ? (
                            <option disabled>Đang tải...</option>
                        ) : (
                            semesterData?.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} - {s.academicYear}
                                </option>
                            ))
                        )}
                    </select>
                    <ErrorResponse error={errors.semesterId} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Học phần <span className="text-red-500">*</span>
                    </label>
                    <select
                        disabled={!selectedSemesterId}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        {...register("courseSectionId", {
                            required: "Học phần không được bỏ trống",
                        })}
                    >
                        <option value="">-- Chọn học phần --</option>
                        {isLoadingCourseSection ? (
                            <option disabled>Đang tải...</option>
                        ) : (
                            courseSectionData?.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.subject.name}
                                </option>
                            ))
                        )}
                    </select>
                    <ErrorResponse error={errors.courseSectionId} />
                </div>
            </div>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Ngày học cuối
                    </label>
                    <input
                        type="date"
                        value={formatDateForInput(suggestExamScheduleData?.lastStudyDate)}
                        readOnly
                        disabled={!selectedCourseSectionId || isLoadingSuggestExamSchedule}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Ngày thi gợi ý
                    </label>
                    <input
                        type="date"
                        value={formatDateForInput(suggestExamScheduleData?.suggestedExamDate)}
                        readOnly
                        disabled={!selectedCourseSectionId || isLoadingSuggestExamSchedule}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
            </div>
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
                    disabled={!selectedDate || !selectedStartMinute || !selectedEndMinute}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    {...register("roomId", {
                        required: "Phòng thi không được bỏ trống",
                    })}
                >
                    <option value="">-- Chọn phòng thi --</option>
                    {isLoadingAvailableRoom ? (
                        <option disabled>Đang tải...</option>
                    ) : (
                        availableRoomData?.map((a) => (
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
                <ErrorResponse error={errors.note} />
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
                            Đang thêm...
                        </>
                    ) : (
                        "Thêm lịch thi"
                    )}
                </button>
            </div>
        </form>
    );
}