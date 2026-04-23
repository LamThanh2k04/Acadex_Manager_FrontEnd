import { IPeriodData, TUpdatePeriod } from "@/types/admin/period.type";
import { useUpdatePeriodInfo } from "@/hooks/admin/usePeriod";
import { useForm } from "react-hook-form";
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';

export default function PeriodUpdateModal({ onClose, selectedPeriod }: { onClose: () => void, selectedPeriod: IPeriodData }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TUpdatePeriod>({
        defaultValues: {
            period: selectedPeriod.period,
            startTime: selectedPeriod.startTime,
            endTime: selectedPeriod.endTime,
        },
        mode: "onBlur"
    });
    const mutation = useUpdatePeriodInfo(onClose)
    const onSubmit = (data: TUpdatePeriod) => {
        mutation.mutate({
            periodId: selectedPeriod.id, data: {
                period: data.period,
                startTime: data.startTime,
                endTime: data.endTime
            }
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-1">
            <div className="space-y-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                        Tiết học <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Nhập tiết học..."
                        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm w-full
                                   focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                        {...register("period", {
                            required: "Tiết học không được bỏ trống",
                        })}
                    />
                    <ErrorResponse error={errors.period} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Bắt đầu <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="1000 phút"
                            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm w-full
                                       focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                            {...register("startTime", {
                                required: "Không được bỏ trống",
                            })}
                        />
                        <ErrorResponse error={errors.startTime} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Kết thúc <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="1050 phút"
                            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm w-full
                                       focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                            {...register("endTime", {
                                required: "Không được bỏ trống",
                            })}
                        />
                        <ErrorResponse error={errors.endTime} />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 mb-4" />
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => { onClose(); reset(); }}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg
                               hover:bg-gray-50 transition cursor-pointer"
                >
                    Huỷ
                </button>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 text-sm bg-[#ec5d15] text-white rounded-lg
                               hover:bg-orange-500 transition disabled:opacity-50
                               flex items-center gap-2 cursor-pointer"
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