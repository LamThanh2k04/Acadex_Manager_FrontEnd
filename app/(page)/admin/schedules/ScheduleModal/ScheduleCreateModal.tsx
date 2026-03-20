import { IScheduleFormSemester, TCreateSchedule } from "@/app/types/admin/schedule.type"
import { useCreateSchedule } from "@/hooks/admin/useSchedule";
import { useForm } from "react-hook-form"
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { useGetAllPeriodSimple, useGetAllRoomSimple, useGetAllSemesterSimple } from "@/hooks/admin/useSimple";
import { useGetCourseSectionBySemester } from "@/hooks/admin/useCourse";

export default function ScheduleCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IScheduleFormSemester>({ mode: "onBlur" });
    const mutation = useCreateSchedule(onClose);
    const selectedSemesterId = watch("semesterId");
    const selectedPeriodStartId = watch("startPeriodId");
    const selectedPeriodEndId = watch("endPeriodId");
    const selectedType = watch("type");
    const { data: semesterData, isLoading: isLoadingSemester } = useGetAllSemesterSimple();
    const { data: periodData, isLoading: isLoadingPeriod } = useGetAllPeriodSimple();
    const { data: roomData, isLoading: isLoadingRoom } = useGetAllRoomSimple();
    const { data: courseBySemesterData, isLoading: isLoadingCourseBySemester } = useGetCourseSectionBySemester(selectedSemesterId);
    const selectedPeriodStart = periodData?.find(p => p.id === Number(selectedPeriodStartId));
    const selectedPeriodEnd = periodData?.find(p => p.id === Number(selectedPeriodEndId));
    const onSubmit = (data: IScheduleFormSemester) => {
        const { semesterId, startPeriodId, endPeriodId, maxStudents, practiceGroup, meetingLink, ...base } = data;
        const baseWithTime = {
            ...base,
            startTimeMinutes: selectedPeriodStart!.startTime,
            endTimeMinutes: selectedPeriodEnd!.endTime,
        };
        let payload: TCreateSchedule;
        if (data.type === "THEORY") {
            payload = { ...baseWithTime, type: "THEORY" }
        } else if (data.type === "PRACTICE") {
            payload = { ...baseWithTime, practiceGroup, maxStudents, type: "PRACTICE" }
        } else {
            payload = { ...baseWithTime, type: "ONLINE", meetingLink }
        }
        mutation.mutate(payload);
    };

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
                        Học kì <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("semesterId", { required: "Vui lòng chọn học kì" })}
                    >
                        <option value="">-- Chọn học kì --</option>
                        {isLoadingSemester
                            ? <option disabled>Đang tải...</option>
                            : semesterData?.map(s => (
                                <option key={s.id} value={s.id}>{s.name} - {s.academicYear}</option>
                            ))
                        }
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
                        {...register("courseSectionId", { required: "Vui lòng chọn học phần" })}
                    >
                        <option value="">-- Chọn học phần --</option>
                        {isLoadingCourseBySemester
                            ? <option disabled>Đang tải...</option>
                            : courseBySemesterData?.map(c => (
                                <option key={c.id} value={c.id}>{c.sectionCode} - {c.subject.name}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.courseSectionId} />
                </div>
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
                        ? <><Loader className="size-4 animate-spin" /> Đang thêm...</>
                        : "Thêm lịch học"
                    }
                </button>
            </div>
        </form>
    )
}