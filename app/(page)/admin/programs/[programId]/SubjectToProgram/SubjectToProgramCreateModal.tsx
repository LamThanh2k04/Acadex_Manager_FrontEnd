"use client"
import { ICreateSubjectOfProgram } from "@/types/admin/program.type"
import { useCreateSubjectToProgram, useGetAllSubjectToProgram } from "@/hooks/admin/useProgram";
import { useForm } from "react-hook-form"
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
export default function SubjectToProgramCreateModal({ onClose, programId }: { onClose: () => void, programId: number }) {
    const { register, handleSubmit, setValue, clearErrors, setError, watch, formState: { errors }, reset } = useForm<ICreateSubjectOfProgram>({ mode: "onBlur" });
    const { data, isLoading } = useGetAllSubjectToProgram(programId);
    console.log(data);
    const mutation = useCreateSubjectToProgram(onClose);
    const selectedSubjectIds = watch("subjectIds");
    const onSubmit = (data: ICreateSubjectOfProgram) => {
        if (!data.subjectIds || data.subjectIds.length === 0) {
            setError("subjectIds", { message: "Vui lòng chọn ít nhất 1 môn học" });
            return;
        }
        const payload: ICreateSubjectOfProgram = {
            ...(data.subjectIds && data.subjectIds.length > 0 ? { subjectIds: data.subjectIds } : {}),
            semesterOrder: data.semesterOrder,
            type: data.type,
            feePerCredit: data.feePerCredit
        }
        mutation.mutate({ programId: programId, data: payload });
    }
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
                        required: "Vui lòng nhập học phí",
                    })}
                />
                <ErrorResponse error={errors.feePerCredit} />
            </div>

            <div className="flex flex-col gap-1 mb-2">
                <label className="text-sm font-medium text-gray-600">
                    Chọn môn học
                </label>
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <select
                    multiple
                    value={selectedSubjectIds?.map(String) || []}
                    onChange={(e) => {
                        const selectedValues = Array.from(
                            e.target.selectedOptions,
                            (option) => Number(option.value)
                        );
                        setValue("subjectIds", selectedValues);
                        if (selectedValues.length > 0) {
                            clearErrors("subjectIds");
                        }
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 min-h-45"
                >
                    {isLoading ? (
                        <option disabled>Đang tải danh sách học kì...</option>
                    ) : data?.length ? (
                        data.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.code} - {subject.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có dữ liệu học kì</option>
                    )}
                </select>
                {errors.subjectIds && (
                    <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                        <span>{errors.subjectIds.message as string}</span>
                    </div>
                )}
            </div>
            <div className="mb-5">
                <p className="text-sm text-gray-600">
                    Đã chọn: <span className="font-semibold text-[#ec5d15]">{selectedSubjectIds?.length || 0}</span> học kì
                </p>
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
                            Đang thêm...
                        </>
                    ) : (
                        "Thêm môn học"
                    )}
                </button>
            </div>
        </form>
    );
}