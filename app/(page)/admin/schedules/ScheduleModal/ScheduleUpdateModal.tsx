"use client"
import { IScheduleData, IScheduleFormUpdate, TUpdateSchedule } from '@/app/types/admin/schedule.type';
import { useUpdateScheduleInfo } from '@/hooks/admin/useSchedule';
import { useGetAllPeriodSimple, useGetAllRoomSimple } from '@/hooks/admin/useSimple';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { useEffect } from 'react';
export default function ScheduleUpdateModal({ onClose, selectedSchedule }: { onClose: () => void, selectedSchedule: IScheduleData }) {
    const { register, watch, handleSubmit, setValue, formState: { errors }, reset } = useForm<IScheduleFormUpdate>({
        defaultValues: {
            type: selectedSchedule.type,
            dayOfWeek: selectedSchedule.dayOfWeek,
            roomId: selectedSchedule.room.id,
            startDate: selectedSchedule.startDate ? new Date(selectedSchedule.startDate).toISOString().split("T")[0]
                : "",
            endDate: selectedSchedule.endDate ? new Date(selectedSchedule.endDate).toISOString().split("T")[0]
                : "",
            maxStudents: selectedSchedule.maxStudents,
            practiceGroup: selectedSchedule.practiceGroup,
            meetingLink: selectedSchedule.meetingLink
        }
    })
    const mutation = useUpdateScheduleInfo(onClose);
    const { data: periodData, isLoading: isLoadingPeriod } = useGetAllPeriodSimple();
    const { data: roomData, isLoading: isLoadingRoom } = useGetAllRoomSimple();
    const selectedType = watch("type");
    const selectedPeriodStartId = watch("startPeriodId");
    const selectedPeriodEndId = watch("endPeriodId");
    const selectedPeriodStart = periodData?.find(p => p.id === Number(selectedPeriodStartId));
    const selectedPeriodEnd = periodData?.find(p => p.id === Number(selectedPeriodEndId));
    const onSubmit = (data: IScheduleFormUpdate) => {
        const { maxStudents, practiceGroup, meetingLink, startPeriodId, endPeriodId, ...base } = data;
        const baseWithTime = {
            ...base,
            startTimeMinutes: selectedPeriodStart!.startTime,
            endTimeMinutes: selectedPeriodEnd!.endTime,
        };
        let payload: TUpdateSchedule;
        if (data.type === "THEORY") {
            payload = { ...baseWithTime, type: "THEORY" };
        } else if (data.type === "PRACTICE") {
            payload = { ...baseWithTime, maxStudents, practiceGroup, type: "PRACTICE" };
        } else {
            payload = { ...baseWithTime, meetingLink, type: "ONLINE" };
        };
        mutation.mutate({ scheduleId: selectedSchedule.id, data: payload });
    };
    useEffect(() => {
        if (!periodData) return;
        const startPeriod = periodData.find(p => p.startTime === selectedSchedule.startTimeMinutes);
        const endPeriod = periodData.find(p => p.endTime === selectedSchedule.endTimeMinutes);
        if (startPeriod) setValue("startPeriodId", startPeriod.id);
        if (endPeriod) setValue("endPeriodId", endPeriod.id);
    }, [periodData]);
    if (isLoadingPeriod || isLoadingRoom) {
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
                    Loại lịch học <span className="text-red-500">*</span>
                </label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("type", { required: "Vui lòng chọn loại lịch học" })}
                >
                    <option value="">-- Chọn loại --</option>
                    <option value="THEORY">Lý thuyết</option>
                    <option value="PRACTICE">Thực hành</option>
                    <option value="ONLINE">Online</option>
                </select>
                <ErrorResponse error={errors.type} />
            </div>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Giờ học bắt đầu <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("startPeriodId", { required: "Vui lòng chọn giờ học bắt đầu" })}
                    >
                        <option value="">-- Chọn giờ học bắt đầu --</option>
                        {isLoadingPeriod
                            ? <option disabled>Đang tải...</option>
                            : periodData?.map(p => (
                                <option key={p.id} value={p.id}>{p.startHour}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.startPeriodId} />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Giờ học kết thúc <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("endPeriodId", { required: "Vui lòng chọn giờ học kết thúc" })}
                    >
                        <option value="">-- Chọn giờ học kết thúc --</option>
                        {isLoadingPeriod
                            ? <option disabled>Đang tải...</option>
                            : periodData?.map(p => (
                                <option key={p.id} value={p.id}>{p.endHour}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.endPeriodId} />
                </div>
            </div>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Phòng học <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("roomId", { required: "Vui lòng chọn phòng học" })}
                    >
                        <option value="">-- Chọn phòng học --</option>
                        {isLoadingRoom
                            ? <option disabled>Đang tải...</option>
                            : roomData?.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.roomId} />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Ngày trong tuần <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("dayOfWeek", { required: "Vui lòng chọn ngày trong tuần" })}
                    >
                        <option value="">-- Chọn ngày --</option>
                        <option value={2}>Thứ 2</option>
                        <option value={3}>Thứ 3</option>
                        <option value={4}>Thứ 4</option>
                        <option value={5}>Thứ 5</option>
                        <option value={6}>Thứ 6</option>
                        <option value={7}>Thứ 7</option>
                        <option value={8}>Chủ nhật</option>
                    </select>
                    <ErrorResponse error={errors.dayOfWeek} />
                </div>
            </div>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Ngày bắt đầu <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
                    />
                    <ErrorResponse error={errors.startDate} />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Ngày kết thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
                    />
                    <ErrorResponse error={errors.endDate} />
                </div>
            </div>
            {selectedType === "PRACTICE" && (
                <div className="flex gap-3 mb-5">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium text-gray-600">
                            Ca thực hành <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Nhập ca thực hành..."
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                            {...register("practiceGroup", { required: "Vui lòng nhập ca thực hành" })}
                        />
                        <ErrorResponse error={errors.practiceGroup} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium text-gray-600">
                            Sĩ số <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Nhập sĩ số sinh viên..."
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                            {...register("maxStudents", { required: "Vui lòng nhập sĩ số" })}
                        />
                        <ErrorResponse error={errors.maxStudents} />
                    </div>
                </div>
            )}

            {selectedType === "ONLINE" && (
                <div className="flex flex-col gap-1 mb-5">
                    <label className="text-sm font-medium text-gray-600">
                        Đường dẫn học trực tuyến
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập đường dẫn meeting..."
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("meetingLink")}
                    />
                    <ErrorResponse error={errors.meetingLink} />
                </div>
            )}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => { onClose(); reset(); }}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                    Huỷ
                </button>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 text-sm bg-[#ec5d15] cursor-pointer text-white rounded-lg
                           hover:bg-orange-500 transition disabled:opacity-50 flex items-center gap-2"
                >
                    {mutation.isPending
                        ? <><Loader className="size-4 animate-spin" /> Đang cập nhật...</>
                        : "Lưu thay đổi"
                    }
                </button>
            </div>
        </form>
    )
}