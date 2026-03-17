"use client"
import { ICreateClasses } from "@/app/types/admin/classes.type";
import { useCreateClasses, useGetAllHomeroomLecturerSimple } from '@/hooks/admin/useClasses';
import { useForm } from "react-hook-form";
import { useGetMajorsSimple } from '@/hooks/admin/useLecturer';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';

export default function ClassesCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ICreateClasses>({ mode: "onBlur" });
    const mutation = useCreateClasses(onClose);
    const selectedMajorId = watch("majorId");
    const { data: majorSimpleData, isLoading: isLoadingMajorSimpleData } = useGetMajorsSimple();
    const { data: homeroomLecturerData, isLoading: isLoadingHomeroomLecturer } = useGetAllHomeroomLecturerSimple(selectedMajorId);
    const onSubmit = (data: ICreateClasses) => {
        mutation.mutate({ majorId: data.majorId, homeroomLecturerId: data.homeroomLecturerId, name: data.name });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Tên lớp học <span className="text-red-500">*</span>
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
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">Ngành đào tạo</label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("majorId", { required: "Chuyên ngành đào tạo không được bỏ trống" })}
                >
                    <option value="">-- Chọn ngành đào tạo --</option>
                    {isLoadingMajorSimpleData
                        ? <option disabled>Đang tải...</option>
                        : majorSimpleData?.map((ma) => (
                            <option key={ma.id} value={ma.id}>{ma.name}</option>
                        ))
                    }
                </select>
                <ErrorResponse error={errors.majorId} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">Giảng viên đảm nhiệm</label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    disabled={!selectedMajorId}
                    {...register("homeroomLecturerId", { required: "Giảng viên đảm nhiệm không được để trống" })}
                >
                    <option value="">
                        {!selectedMajorId
                            ? "-- Vui lòng chọn ngành trước --"
                            : "-- Chọn giáo viên đảm nhiệm --"
                        }
                    </option>
                    {isLoadingHomeroomLecturer
                        ? <option disabled>Đang tải...</option>
                        : homeroomLecturerData?.map((home) => (
                            <option key={home.id} value={home.id}>{home.user?.fullName}</option>
                        ))
                    }
                </select>
                <ErrorResponse error={errors.homeroomLecturerId} />
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