"use client"
import { ICreateBuilding } from "@/app/types/admin/building.type";
import { useCreateBuilding } from "@/hooks/admin/useBuilding";
import { useForm } from "react-hook-form"
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';
export default function BuildingCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateBuilding>({ mode: "onBlur" });
    const mutation = useCreateBuilding(onClose);
    const onSubmit = (data: ICreateBuilding) => {
        mutation.mutate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-around">
                <div>
                    <div className="flex flex-col gap-1 mb-5">
                        <label className="text-sm font-medium text-gray-600">
                            Mã cơ sở <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Vui lòng nhập mã cơ sở..."
                                className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("code", {
                                    required: "Mã cơ sở không được bỏ trống",
                                })}
                            />
                        </div>
                        <ErrorResponse error={errors.code} />
                    </div>
                    <div className="flex flex-col gap-1 mb-5">
                        <label className="text-sm font-medium text-gray-600">
                            Tên cơ sở <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Vui lòng nhập tên lớp..."
                                className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("name", {
                                    required: "Tên lớp học không được bỏ trống",
                                })}
                            />
                        </div>
                        <ErrorResponse error={errors.name} />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-1 mb-5">
                        <label className="text-sm font-medium text-gray-600">
                            Ký hiệu  <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Vui lòng nhập ký hiệu cơ sở..."
                                className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("symbol", {
                                    required: "Ký hiệu cơ sở không được bỏ trống",
                                })}
                            />
                        </div>
                        <ErrorResponse error={errors.symbol} />
                    </div>
                    <div className="flex flex-col gap-1 mb-5">
                        <label className="text-sm font-medium text-gray-600">
                            Địa chỉ  <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Vui lòng nhập địa chỉ cơ sở..."
                                className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("location", {
                                    required: "Địa chỉ cơ sở không được bỏ trống",
                                })}
                            />
                        </div>
                        <ErrorResponse error={errors.location} />
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => { reset(), onClose() }}
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
        </form >
    )
}