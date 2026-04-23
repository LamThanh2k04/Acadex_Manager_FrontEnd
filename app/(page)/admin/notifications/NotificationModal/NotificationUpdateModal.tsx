import { INotificationData, TUpdateNotification } from "@/types/admin/notification.type";
import { useUpdateNotification } from "@/hooks/admin/useNotification";
import { useForm } from "react-hook-form";
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';

export default function NotificationUpdateModal({ onClose, selectedNotification }: { onClose: () => void, selectedNotification: INotificationData }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TUpdateNotification>({
        defaultValues: {
            title: selectedNotification.title,
            message: selectedNotification.message
        }
    })
    const mutation = useUpdateNotification(onClose);
    const onSubmit = (data: TUpdateNotification) => {
        mutation.mutate({
            notificationId: selectedNotification.id, data: {
                title: data.title,
                message: data.message
            }
        })
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
    )
}