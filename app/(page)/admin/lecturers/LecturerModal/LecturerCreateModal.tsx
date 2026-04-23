"use client"
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { ICreateLecturer, IMajorSimple } from '@/types/admin/lecturer.type';
import { useCreateLecture, useGetMajorsSimple } from '@/hooks/admin/useLecturer';
import { Loader, Upload, EyeClosed, Eye } from 'lucide-react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
export default function LecturerCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateLecturer>({ mode: "onBlur" });
    const [preview, setPreview] = useState<string | null>(null);
    const mutation = useCreateLecture(onClose);
    const [toggle, setToggle] = useState(false);
    const { ref: registerRef, ...registerAvatar } = register("avatar");
    const fileRef = useRef<HTMLInputElement>(null)
    const { data: majorData, isLoading: isLoadingMajorData } = useGetMajorsSimple();
    const onSubmit = (data: ICreateLecturer) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("lecturerCode", data.lecturerCode);
        formData.append("gender", data.gender);
        formData.append("majorId", data.majorId.toString());
        if (data.avatar?.[0]) {
            formData.append("avatar", data.avatar[0]);
        };
        mutation.mutate(formData);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setPreview(URL.createObjectURL(file))
    };
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
                                    Mã giảng viên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="GV001"
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("lecturerCode", { required: "Mã giảng viên không được bỏ trống" })}
                                />
                                <ErrorResponse error={errors.lecturerCode} />
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
                <h2 className="text-base font-semibold text-gray-800 mb-4">Thông tin dạy học</h2>
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
                        <label className="text-sm font-medium text-gray-600">Chuyên ngành</label>
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                            {...register("majorId", { required: "Chuyên ngành không được bỏ trống" })}
                        >
                            <option value="">-- Chọn chuyên ngành --</option>
                            {isLoadingMajorData
                                ? <option disabled>Đang tải...</option>
                                : majorData?.map((major: IMajorSimple) => (
                                    <option key={major.id} value={major.id}>{major.name}</option>
                                ))
                            }
                        </select>
                        <ErrorResponse error={errors.majorId} />
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