"use client"
import { ICreateCertificateOfProgram } from "@/types/admin/program.type";
import { useCreateCertificateToProgram, useGetAllCertificateToProgram } from '@/hooks/admin/useProgram';
import { useForm } from "react-hook-form"
import { Loader } from 'lucide-react';
export default function CertificateToProgramCreateModal({ onClose, programId }: { onClose: () => void, programId: number }) {
    const { handleSubmit, setValue, watch, reset, setError, clearErrors, formState: { errors } } = useForm<ICreateCertificateOfProgram>({ mode: "onBlur" });
    const mutation = useCreateCertificateToProgram(onClose);
    const selectedCertificateIds = watch("certificateIds");
    const { data, isLoading } = useGetAllCertificateToProgram(programId);
    const onSubmit = (data: ICreateCertificateOfProgram) => {
        if (!data.certificateIds || data.certificateIds.length === 0) {
            setError("certificateIds", { message: "Vui lòng chọn ít nhất 1 chứng chỉ" });
            return;
        }
        const payload: ICreateCertificateOfProgram = {
            ...(data.certificateIds && data.certificateIds.length > 0 ? { certificateIds: data.certificateIds } : {}),
        }
        mutation.mutate({ programId: programId, data: payload });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-2">
                <label className="text-sm font-medium text-gray-600">
                    Chọn chứng chỉ
                </label>
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <select
                    multiple
                    value={selectedCertificateIds?.map(String) || []}
                    onChange={(e) => {
                        const selectedValues = Array.from(
                            e.target.selectedOptions,
                            (option) => Number(option.value)
                        );
                        setValue("certificateIds", selectedValues);
                        if (selectedValues.length > 0) {
                            clearErrors("certificateIds");
                        }
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 min-h-45"
                >
                    {isLoading ? (
                        <option disabled>Đang tải danh sách học kì...</option>
                    ) : data?.length ? (
                        data.map((certificate) => (
                            <option key={certificate.id} value={certificate.id}>
                                {certificate.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có dữ liệu học kì</option>
                    )}
                </select>
                {errors.certificateIds && (
                    <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                        <span>{errors.certificateIds.message as string}</span>
                    </div>
                )}
            </div>
            <div className="mb-5">
                <p className="text-sm text-gray-600">
                    Đã chọn: <span className="font-semibold text-[#ec5d15]">{selectedCertificateIds?.length || 0}</span> học kì
                </p>
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
                        "Thêm chứng chỉ"
                    )}
                </button>
            </div>
        </form>
    )
}