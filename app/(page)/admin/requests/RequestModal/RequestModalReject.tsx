"use client";
import { useRejectRequest } from "@/hooks/admin/useRequest";
import { TRejectRequest } from "@/types/admin/request.type";
import { useForm } from "react-hook-form";
import { Loader, CircleX } from "lucide-react";
export default function RequestModalReject({ onClose, requestId }: { onClose: () => void, requestId: number }) {
    const mutation = useRejectRequest(onClose);
    const { register, handleSubmit, reset } = useForm<TRejectRequest>({
        mode: "onBlur",
        defaultValues: {
            note: "",
        },
    });

    const onSubmit = (data: TRejectRequest) => {
        mutation.mutate({
            certificateId: requestId,
            note: data.note,
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-red-100 p-2">
                        <CircleX className="size-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-red-700">
                            Xác nhận từ chối yêu cầu
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-red-600">
                            Bạn có thể nhập ghi chú cho sinh viên (không bắt buộc). Nếu không
                            nhập, hệ thống vẫn cho phép duyệt yêu cầu bình thường.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Ghi chú (không bắt buộc)
                </label>
                <textarea
                    {...register("note")}
                    rows={5}
                    placeholder="Ví dụ: Yêu cầu chưa được xác minh và chưa đủ điều kiện để xét chứng chỉ..."
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 resize-none"
                />
                <p className="text-xs text-gray-400">
                    Bạn có thể để trống nếu không muốn gửi ghi chú.
                </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => {
                        reset();
                        onClose();
                    }}
                    className="cursor-pointer rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-700"
                >
                    Huỷ
                </button>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#ec5d15] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {mutation.isPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            Đang từ chối...
                        </>
                    ) : (
                        "Từ chối yêu cầu"
                    )}
                </button>
            </div>
        </form>
    );
}