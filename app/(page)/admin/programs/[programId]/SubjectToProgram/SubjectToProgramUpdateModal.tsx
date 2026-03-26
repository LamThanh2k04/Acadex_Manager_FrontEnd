"use client"
import { IProgramSubject, IUpdateSubjectOfProgram } from "@/app/types/admin/program.type";
import { useUpdateSubjectToProgram } from "@/hooks/admin/useProgram";
import { useForm } from "react-hook-form";
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
export default function SubjectToProgramUpdateModa({ selectedProgramSubject, onClose }: { selectedProgramSubject: IProgramSubject, onClose: () => void }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdateSubjectOfProgram>({
        defaultValues: {
            semesterOrder: selectedProgramSubject.semesterOrder,
            type: selectedProgramSubject.type,
            feePerCredit: selectedProgramSubject.feePerCredit,
            isActive: selectedProgramSubject.isActive
        }
    });
    const mutation = useUpdateSubjectToProgram(onClose);
    const onSubmit = (data: IUpdateSubjectOfProgram) => {
        mutation.mutate({ programSubjectId: selectedProgramSubject.id, data: data });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Học kì <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    placeholder="Nhập học kì..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("semesterOrder", {
                        required: "Vui lòng nhập học kì",
                    })}
                />
                <ErrorResponse error={errors.semesterOrder} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Học phí / tín chỉ <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    placeholder="Nhập học phí..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 resize-none"
                    {...register("feePerCredit", {
                        required: "Vui lòng nhập học phí"
                    })}
                />
                <ErrorResponse error={errors.feePerCredit} />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Loại môn học</label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("type", { required: "Loại môn học không được bỏ trống" })}
                >
                    <option value="">-- Chọn loại môn học --</option>
                    <option value="MANDATORY">Bắt buộc</option>
                    <option value="ELECTIVE">Tự chọn</option>
                </select>
                <ErrorResponse error={errors.type} />
            </div>
            <label className="flex items-center mt-5 mb-5 gap-3 w-fit cursor-pointer group">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="isActive"
                        className="sr-only peer"
                        {...register("isActive")}
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-orange-400 transition-colors duration-300" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5" />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                    Trạng thái môn học
                </span>
            </label>
            <div className="flex justify-end gap-3 mt-5">
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
                            Đang cập nhật...
                        </>
                    ) : (
                        "Lưu thay đổi"
                    )}
                </button>
            </div>
        </form>
    );
}