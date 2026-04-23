"use client"
import ErrorResponse from "@/app/(auth)/login/ErrorResponse";
import { ISubmitCertificate } from "@/types/student/certification.type";
import { useGetAllCertificationProgram, useSubmitCertification } from "@/hooks/student/useCertification"
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, Upload, X, ImageIcon, Award, Calendar, ChevronDown } from 'lucide-react';

export default function CertificationSubmitModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ISubmitCertificate>({ mode: "onBlur" });
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const mutation = useSubmitCertification(onClose);
    const { data, isLoading } = useGetAllCertificationProgram();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    const onSubmit = (data: ISubmitCertificate) => {
        const formData = new FormData();
        formData.append("templateId", data.templateId.toString());
        formData.append("issueDate", data.issueDate);
        if (data.imageCertificate?.[0]) {
            formData.append("imageCertificate", data.imageCertificate[0]);
        }
        mutation.mutate(formData);
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <ImageIcon size={12} className="text-[#ec5d15]" />
                        Hình ảnh chứng chỉ
                    </label>
                    <label
                        htmlFor="imageCertificate"
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`relative flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden
                            ${isDragging
                                ? "border-[#ec5d15] bg-orange-50"
                                : preview
                                    ? "border-orange-200 bg-orange-50/30"
                                    : "border-gray-200 bg-gray-50/50 hover:border-orange-300 hover:bg-orange-50/50"
                            }`}
                        style={{ minHeight: preview ? "200px" : "140px" }}
                    >
                        {preview ? (
                            <>
                                <Image
                                    src={preview}
                                    alt="preview image certification"
                                    fill
                                    className="object-contain p-2"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                    <div className="flex items-center gap-2 text-white text-xs font-bold bg-black/50 px-4 py-2 rounded-xl">
                                        <Upload size={14} />
                                        Thay ảnh khác
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2 py-8 px-4 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                                    <Upload size={20} className="text-[#ec5d15]" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Kéo thả hoặc{" "}
                                        <span className="text-[#ec5d15]">chọn ảnh</span>
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                        JPG, JPEG, PNG · Tối đa 5MB
                                    </p>
                                </div>
                            </div>
                        )}
                        <input
                            id="imageCertificate"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            {...register("imageCertificate", {
                                required: "Vui lòng tải hình ảnh chứng chỉ",
                                validate: {
                                    maxSize: (files) =>
                                        files[0]?.size <= 5 * 1024 * 1024 || "Ảnh không được vượt quá 5MB",
                                    fileType: (files) =>
                                        ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type) ||
                                        "Chỉ chấp nhận ảnh JPG, JPEG, PNG",
                                },
                            })}
                            onChange={handleFileChange}
                        />
                    </label>
                    <ErrorResponse error={errors.imageCertificate} />
                </div>
                <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <Award size={12} className="text-[#ec5d15]" />
                        Loại chứng chỉ
                    </label>
                    <div className="relative">
                        <select
                            {...register("templateId", { required: "Vui lòng chọn chứng chỉ" })}
                            className="w-full appearance-none text-sm px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-white
                                       text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                                       transition-all cursor-pointer disabled:opacity-50"
                            disabled={isLoading}
                        >
                            <option value="">-- Vui lòng chọn chứng chỉ --</option>
                            {isLoading ? (
                                <option disabled>Đang tải...</option>
                            ) : (
                                data?.map((certificate) => (
                                    <option key={certificate.template.id} value={certificate.template.id}>
                                        {certificate.template.name} - {certificate.template.description}
                                    </option>
                                ))
                            )}
                        </select>
                        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <ErrorResponse error={errors.templateId} />
                </div>
                <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <Calendar size={12} className="text-[#ec5d15]" />
                        Ngày cấp
                    </label>
                    <input
                        type="date"
                        {...register("issueDate", {
                            required: "Vui lòng chọn ngày cấp",
                        })}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border dark:bg-gray-800 dark:text-white border-gray-200 bg-white
                                   text-gray-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                                   transition-all"
                    />
                    <ErrorResponse error={errors.issueDate} />
                </div>
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => { onClose(); reset(); setPreview(null); }}
                        className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-500
                                   hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                    >
                        <X size={14} />
                        Huỷ
                    </button>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white
                                   bg-[#ec5d15] hover:bg-[#d44d0f] active:scale-95
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                                   rounded-xl transition-all shadow-md shadow-orange-200 cursor-pointer"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader className="size-3.5 animate-spin" />
                                Đang nộp...
                            </>
                        ) : (
                            <>
                                <Upload size={14} />
                                Nộp chứng chỉ
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
