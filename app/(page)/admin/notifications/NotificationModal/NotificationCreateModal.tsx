"use client";
import { ICreateNotification } from "@/app/types/admin/notification.type";
import { useGetStudentBySearch, useSendNotification } from "@/hooks/admin/useNotification";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import ErrorResponse from "@/app/(auth)/login/ErrorResponse";
export default function NotificationCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors },
    } = useForm<ICreateNotification>({ mode: "onBlur", });

    const { data: studentData, isLoading: isLoadingStudentData } = useGetStudentBySearch();
    const mutation = useSendNotification(onClose);
    const selectedUserIds = watch("userIds");

    const onSubmit = (data: ICreateNotification) => {
        const payload: ICreateNotification = {
            title: data.title,
            message: data.message,
            ...(data.userIds && data.userIds.length > 0 ? { userIds: data.userIds } : {}),
        };
        mutation.mutate(payload);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Tiêu đề thông báo <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Nhập tiêu đề thông báo..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("title", {
                        required: "Vui lòng nhập tiêu đề thông báo",
                    })}
                />
                <ErrorResponse error={errors.title} />
            </div>

            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Nội dung thông báo <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={4}
                    placeholder="Nhập nội dung thông báo..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 resize-none"
                    {...register("message", {
                        required: "Vui lòng nhập nội dung thông báo",
                    })}
                />
                <ErrorResponse error={errors.message} />
            </div>

            <div className="flex flex-col gap-1 mb-2">
                <label className="text-sm font-medium text-gray-600">
                    Chọn sinh viên nhận thông báo
                </label>
                <p className="text-xs text-gray-500">
                    Không chọn sinh viên nào sẽ gửi thông báo cho tất cả sinh viên.
                </p>
            </div>

            <div className="flex flex-col gap-1 mb-5">
                <select
                    multiple
                    value={selectedUserIds?.map(String) || []}
                    onChange={(e) => {
                        const selectedValues = Array.from(
                            e.target.selectedOptions,
                            (option) => Number(option.value)
                        );
                        setValue("userIds", selectedValues, { shouldValidate: true });
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 min-h-45"
                >
                    {isLoadingStudentData ? (
                        <option disabled>Đang tải danh sách sinh viên...</option>
                    ) : studentData?.length ? (
                        studentData.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.fullName} - {student.student.studentCode}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có dữ liệu sinh viên</option>
                    )}
                </select>
            </div>
            <div className="mb-5">
                <p className="text-sm text-gray-600">
                    Đã chọn: <span className="font-semibold text-[#ec5d15]">{selectedUserIds?.length || 0}</span> sinh viên
                </p>
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
                    className="px-4 py-2 text-sm bg-[#ec5d15] cursor-pointer text-white rounded-lg
                    hover:bg-orange-500 transition disabled:opacity-50 flex items-center gap-2"
                >
                    {mutation.isPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            Đang gửi...
                        </>
                    ) : (
                        "Gửi thông báo"
                    )}
                </button>
            </div>
        </form>
    );
}