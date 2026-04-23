"use client";
import ErrorResponse from "@/app/(auth)/login/ErrorResponse";
import { ICreateProgram } from "@/types/admin/program.type";
import { useGetMajorsSimple } from "@/hooks/admin/useLecturer";
import { useCreateProgram } from "@/hooks/admin/useProgram";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
export default function ProgramCreateModal({ onClose }: { onClose: () => void }) {
    const mutation = useCreateProgram(onClose);
    const { register, handleSubmit, reset, formState: { errors },
    } = useForm<ICreateProgram>({ mode: "onBlur" });
    const { data: majorData, isLoading: isLoadingMajor } = useGetMajorsSimple();
    const onSubmit = (data: ICreateProgram) => {
        mutation.mutate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Tên chương trình
                </label>
                <input
                    type="text"
                    placeholder="Nhập chương trình"
                    {...register("name", { required: "Vui lòng nhập chương trình" })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100"
                />
                <ErrorResponse error={errors.name} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Bằng cấp
                    </label>
                    <select
                        {...register("trainingLevel", { required: "Vui lòng chọn loại bằng cấp" })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100 bg-white"
                    >
                        <option value="">-- Chọn bằng cấp --</option>
                        <option value="BACHELOR">Cử nhân</option>
                        <option value="COLLEGE">Cao đẳng</option>
                        <option value="MASTER">Thạc sĩ</option>
                    </select>
                    <ErrorResponse error={errors.trainingLevel} />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Loại đào tạo
                    </label>
                    <select
                        {...register("educationType", { required: "Vui lòng chọn loại đào tạo" })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100 bg-white"
                    >
                        <option value="">-- Chọn loại đào tạo --</option>
                        <option value="FULL_TIME">Chính quy</option>
                        <option value="PART_TIME">Bán thời gian</option>
                        <option value="DISTANCE_LEARNING">Học từ xa</option>
                    </select>
                    <ErrorResponse error={errors.educationType} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Số năm đào tạo
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Nhập số năm đào tạo"
                        {...register("plannedEducationYear", {
                            required: "Vui lòng nhập số năm đào tạo",
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100"
                    />
                    <ErrorResponse error={errors.plannedEducationYear} />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Học phí / tín chỉ
                    </label>
                    <input
                        type="number"
                        placeholder="Nhập tiền theo chỉ"
                        {...register("feePerCredit", {
                            required: "Vui lòng nhập tiền theo chỉ",
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100"
                    />
                    <ErrorResponse error={errors.feePerCredit} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Phiên bản chương trình
                    </label>
                    <input
                        type="number"
                        placeholder="Nhập phiên bản chương trình"
                        {...register("version", {
                            required: "Vui lòng nhập phiên bản chương trình",
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100"
                    />
                    <ErrorResponse error={errors.version} />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Chuyên ngành
                    </label>
                    <select
                        {...register("majorId", {
                            required: "Vui lòng chọn chuyên ngành",
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#ec5d15] focus:ring-2 focus:ring-orange-100 bg-white"
                    >
                        <option value="">-- Vui lòng chọn chuyên ngành --</option>
                        {isLoadingMajor ? (
                            <option value="">Đang tải...</option>
                        ) : (
                            majorData?.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))
                        )}
                    </select>
                    <ErrorResponse error={errors.majorId} />
                </div>
            </div>
            <div className="border-t border-gray-100 pt-4" />
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => {
                        reset();
                        onClose();
                    }}
                    className="px-4 py-2 cursor-pointer text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                    Huỷ
                </button>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 text-sm bg-[#ec5d15] cursor-pointer text-white rounded-xl hover:bg-orange-500 transition disabled:opacity-50 flex items-center gap-2"
                >
                    {mutation.isPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            Đang thêm...
                        </>
                    ) : (
                        "Thêm chương trình"
                    )}
                </button>
            </div>
        </form>
    );
}