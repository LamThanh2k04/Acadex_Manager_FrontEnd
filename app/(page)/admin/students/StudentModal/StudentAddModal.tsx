"use client"
import ErrorResponse from "@/app/(auth)/login/ErrorResponse"
import { IAddStudent } from "@/app/types/admin/student.type"
import { useCreateStudent } from "@/hooks/admin/useStudent"
import { useGetAllProgramSimple, useGetAllClassSimple } from "@/hooks/admin/useSimple"
import { useForm } from "react-hook-form"
import { Loader, Upload } from 'lucide-react'
import { useRef, useState } from "react"
import { EyeClosed, Eye } from 'lucide-react';
export default function StudentAddModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IAddStudent>({ mode: "onBlur" });
    const [toggle, setToggle] = useState(false);
    const { data: programData, isLoading: isLoadingProgram } = useGetAllProgramSimple()
    const { data: classData, isLoading: isLoadingClass } = useGetAllClassSimple()
    const mutation = useCreateStudent(onClose)
    const [preview, setPreview] = useState<string | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const { ref: registerRef, ...registerAvatar } = register("avatar");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setPreview(URL.createObjectURL(file))
    };
    const onSubmit = (data: IAddStudent) => {
        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("gender", data.gender)
        formData.append("studentCode", data.studentCode)
        formData.append("classId", data.classId.toString())
        formData.append("programId", data.programId.toString())
        if (data.avatar?.[0]) {
            formData.append("avatar", data.avatar[0])
        }
        mutation.mutate(formData)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div>
                <div className="flex gap-6">
                    <div
                        onClick={() => fileRef.current?.click()}
                        className="w-32 h-36 shrink-0 border-2 border-dashed border-gray-200 rounded-xl
                                   flex flex-col items-center justify-center gap-2 cursor-pointer
                                   hover:border-orange-300 hover:bg-orange-50 transition"
                    >
                        {preview
                            ? <img src={preview} className="w-full h-full object-cover rounded-xl" />
                            : <>
                                <Upload className="size-5 text-gray-400" />
                                <p className="text-xs text-center text-gray-400 px-2">
                                    Thả ảnh vào đây hoặc{" "}
                                    <span className="text-[#ec5d15]">chọn file</span>
                                </p>
                            </>
                        }
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(e) => {
                                registerRef(e)
                                fileRef.current = e
                            }}
                            {...registerAvatar}
                            onChange={(e) => {
                                registerAvatar.onChange(e)
                                handleFileChange(e)
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nguyễn Văn A"
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("fullName", { required: "Họ và tên không được để trống" })}
                                />
                                <ErrorResponse error={errors.fullName} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Mã sinh viên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="SV001"
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("studentCode", { required: "Mã sinh viên không được bỏ trống" })}
                                />
                                <ErrorResponse error={errors.studentCode} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="example@edu.vn"
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("email", { required: "Email không được để trống" })}
                                />
                                <ErrorResponse error={errors.email} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Mật khẩu <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={toggle ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                        {...register("password", {
                                            required: "Mật khẩu không được để trống",
                                            minLength: { value: 6, message: "Mật khẩu phải gồm 6 ký tự" },
                                            pattern: {
                                                value: /^[A-Za-z0-9]{6,}$/,
                                                message: "Mật khẩu phải gồm chữ và số"
                                            }
                                        })}
                                    />
                                    <button type="button" className="absolute top-2 left-35 text-gray-300" onClick={() => { setToggle(!toggle) }}>{toggle ? <EyeClosed /> : <Eye />}</button>
                                </div>
                                <ErrorResponse error={errors.password} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100" />
            <div>
                <h2 className="text-base font-semibold text-gray-800 mb-4">Thông tin học tập</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Giới tính</label>
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                            {...register("gender", { required: "Giới tính không được bỏ trống" })}
                        >
                            <option value="">-- Chọn giới tính --</option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                        </select>
                        <ErrorResponse error={errors.gender} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Chương trình học</label>
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                            {...register("programId", { required: "Chương trình học không được bỏ trống" })}
                        >
                            <option value="">-- Chọn chương trình --</option>
                            {isLoadingProgram
                                ? <option disabled>Đang tải...</option>
                                : programData?.map((pr) => (
                                    <option key={pr.id} value={pr.id}>{pr.name}</option>
                                ))
                            }
                        </select>
                        <ErrorResponse error={errors.programId} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Lớp học</label>
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                            {...register("classId", { required: "Lớp học không được bỏ trống" })}
                        >
                            <option value="">-- Chọn lớp --</option>
                            {isLoadingClass
                                ? <option disabled>Đang tải...</option>
                                : classData?.map((cl) => (
                                    <option key={cl.id} value={cl.id}>{cl.name}</option>
                                ))
                            }
                        </select>
                        <ErrorResponse error={errors.classId} />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => { onClose(), reset() }}
                    className="px-4 py-2 cursor-pointer text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition"
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
                        : "Thêm sinh viên"
                    }
                </button>
            </div>
        </form>
    )
}