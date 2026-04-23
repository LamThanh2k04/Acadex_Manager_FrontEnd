"use client"
import { ICreateMajor } from "@/types/admin/major.type"
import { useCreateMajor, useGetAllFacultiesSimple } from "@/hooks/admin/useMajor";
import { useForm } from "react-hook-form"
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';
export default function MajorCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateMajor>({ mode: "onBlur" });
    const { data: facultiesSimpleData, isLoading: isLoadingFacultiesSimpleData } = useGetAllFacultiesSimple();
    const mutation = useCreateMajor(onClose);
    const onSubmit = (data: ICreateMajor) => {
        mutation.mutate({ facultyId: data.facultyId, name: data.name })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Tên ngành đào tạo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Vui lòng nhập tên ngành..."
                        className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("name", {
                            required: "Tên ngành không được bỏ trống",
                        })}
                    />
                </div>
                <ErrorResponse error={errors.name} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">Khoa đào tạo</label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("facultyId", { required: "Khoa đào tạo không được bỏ trống" })}
                >
                    <option value="">-- Chọn khoa đào tạo --</option>
                    {isLoadingFacultiesSimpleData
                        ? <option disabled>Đang tải...</option>
                        : facultiesSimpleData?.map((fa) => (
                            <option key={fa.id} value={fa.id}>{fa.name}</option>
                        ))
                    }
                </select>
                <ErrorResponse error={errors.facultyId} />
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => { onClose(), reset() }}
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
                        : "Thêm chuyên ngành"
                    }
                </button>
            </div>
        </form>
    )
}