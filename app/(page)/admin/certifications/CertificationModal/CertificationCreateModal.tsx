import { ICreateCertification } from "@/types/admin/certification.type"
import { useCreateCertification } from "@/hooks/admin/useCertification";
import { useForm } from "react-hook-form"
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';

export default function CertificationCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateCertification>({ mode: "onBlur" });
    const mutation = useCreateCertification(onClose);
    const onSubmit = (data: ICreateCertification) => {
        mutation.mutate(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-1">
            <div className="space-y-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                        Loại chứng chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập loại chứng chỉ..."
                        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm w-full
                                   focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                        {...register("name", {
                            required: "Loại chứng chỉ không được bỏ trống",
                        })}
                    />
                    <ErrorResponse error={errors.name} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                        Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Nhập mô tả..."
                        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm w-full resize-none
                                   focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                        {...register("description", {
                            required: "Mô tả không được bỏ trống",
                        })}
                    />
                    <ErrorResponse error={errors.description} />
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
                        ? <><Loader className="size-4 animate-spin" /> Đang thêm...</>
                        : "Thêm chứng chỉ"
                    }
                </button>
            </div>
        </form>
    )
}
