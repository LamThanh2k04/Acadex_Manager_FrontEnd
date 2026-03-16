"use client"
import { ILecturerManager, IUpdateLecturerInfo, IMajorSimple } from '@/app/types/admin/lecturer.type';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader, Upload } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdateLecturer, useGetMajorsSimple } from '@/hooks/admin/useLecturer';
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from 'react';

export default function LecturerUpdateModal({ onClose, selectedLecturer }: { selectedLecturer: ILecturerManager, onClose: () => void }) {
    const [avatarPreview, setAvatarPreview] = useState(selectedLecturer.avatar ?? null);
    const mutation = useUpdateLecturer(onClose);
    const fileRef = useRef<HTMLInputElement>(null);
    const { data: majorData, isLoading: isLoadingMajorData } = useGetMajorsSimple();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUpdateLecturerInfo>({
        defaultValues: {
            fullName: selectedLecturer.fullName,
            email: selectedLecturer.email,
            lecturerCode: selectedLecturer.lecturer.lecturerCode,
            personalEmail: selectedLecturer.lecturer.personalEmail,
            placeOfBirth: selectedLecturer.lecturer.placeOfBirth,
            ethnicity: selectedLecturer.lecturer.ethnicity,
            address: selectedLecturer.address,
            phoneNumber: selectedLecturer.phoneNumber,
            citizenId: selectedLecturer.lecturer.citizenId,
            majorId: selectedLecturer.lecturer.major.id,
            dateOfBirth: selectedLecturer.dateOfBirth
                ? new Date(selectedLecturer.dateOfBirth).toISOString().split("T")[0]
                : "",
            gender: selectedLecturer.gender as "MALE" | "FEMALE",
            degree: selectedLecturer.lecturer.degree as "BACHELOR" | "MASTER" | "DOCTOR" | "ASSOCIATE_PROFESSOR" | "PROFESSOR",
            position: selectedLecturer.lecturer.position as "LECTURER" | "HEAD_SUBJECT" | "HEAD_DEPARTMENT",
            status: selectedLecturer.lecturer.status as "WORKING" | "TRUANT"
        }
    });
    const { ref: registerRef, ...registerAvatar } = register("avatar");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setAvatarPreview(URL.createObjectURL(file))
    }
    const onSubmit = (data: IUpdateLecturerInfo) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("lecturerCode", data.lecturerCode);
        formData.append("personalEmail", data.personalEmail);
        formData.append("placeOfBirth", data.placeOfBirth);
        formData.append("ethnicity", data.ethnicity);
        formData.append("address", data.address);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("citizenId", data.citizenId);
        formData.append("majorId", data.majorId.toString());
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("gender", data.gender);
        formData.append("degree", data.degree);
        formData.append("position", data.position);
        formData.append("status", data.status);
        if (data.avatar?.[0]) {
            formData.append("avatar", data.avatar[0]);
        }
        mutation.mutate({ formData, lecturerId: selectedLecturer.lecturer.id });
    }
    useEffect(() => {
        if (majorData) {
            setValue("majorId", selectedLecturer.lecturer.major.id)
        }
    }, [majorData]);
    return (
        <ScrollArea className="h-[70vh] pr-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex gap-6">
                    <div
                        onClick={() => fileRef.current?.click()}
                        className="w-32 h-36 shrink-0 border-2 border-dashed border-gray-200 rounded-xl
                           flex flex-col items-center justify-center gap-2 cursor-pointer
                           hover:border-orange-300 hover:bg-orange-50 transition"
                    >
                        {avatarPreview
                            ? <img src={avatarPreview} className="w-full h-full object-cover rounded-xl" />
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
                                    placeholder="Nguyễn Văn A..."
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("fullName", { required: "Họ và tên không được để trống" })}
                                />
                                <ErrorResponse error={errors.fullName} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="A@edu.acadex..."
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("email", { required: "Email không được để trống" })}
                                />
                                <ErrorResponse error={errors.email} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    placeholder="0988222111..."
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                    {...register("phoneNumber")}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Giới tính
                                </label>
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
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100" />
                <div>
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Thông tin liên lạc</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Địa chỉ</label>
                            <input
                                type="text"
                                placeholder="123 Quận 2..."
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("address")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Email cá nhân</label>
                            <input
                                type="text"
                                placeholder="A1@gmail.com..."
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("personalEmail", {
                                    required: "Email cá nhân không được để trống", pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Email không đúng định dạng"
                                    }
                                })}
                            />
                            <ErrorResponse error={errors.personalEmail} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100" />
                <div>
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Thông tin định danh</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Căn cước công dân</label>
                            <input
                                type="text"
                                placeholder="0792333..."
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("citizenId")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Dân tộc</label>
                            <input
                                type="text"
                                placeholder="Kinh..."
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("ethnicity")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Nơi sinh</label>
                            <input
                                type="text"
                                placeholder="TP.Hồ Chí Minh..."
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("placeOfBirth")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Ngày sinh</label>
                            <input
                                type="date"
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("dateOfBirth")}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100" />
                <div>
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Thông tin giảng dạy</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">
                                Mã giảng viên <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="SV001"
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("lecturerCode", { required: "Mã giảng viên không được bỏ trống" })}
                            />
                            <ErrorResponse error={errors.lecturerCode} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("status", { required: "Trạng thái không được bỏ trống" })}
                            >
                                <option value="">-- Trạng thái --</option>
                                <option value="WORKING">Đang dạy</option>
                                <option value="TRUANT">Đã nghỉ dạy</option>
                            </select>
                            <ErrorResponse error={errors.status} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Bằng cấp</label>
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("degree", { required: "Bằng cấp không được bỏ trống" })}
                            >
                                <option value="">-- Bằng cấp --</option>
                                <option value="BACHELOR">Cử nhân</option>
                                <option value="MASTER">Thạc sĩ</option>
                                <option value="DOCTOR">Tiến sĩ</option>
                                <option value="ASSOCIATE_PROFESSOR">Phó giáo sư</option>
                                <option value="PROFESSOR">Giáo sư</option>
                            </select>
                            <ErrorResponse error={errors.degree} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Vị trí</label>
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("position", { required: "Vị trí không được bỏ trống" })}
                            >
                                <option value="">-- Vị trí --</option>
                                <option value="LECTURER">Giảng viên</option>
                                <option value="HEAD_SUBJECT">Trưởng bộ môn</option>
                                <option value="HEAD_DEPARTMENT">Trưởng khoa</option>
                            </select>
                            <ErrorResponse error={errors.position} />
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                            <label className="text-sm font-medium text-gray-600">Chuyên ngành</label>
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("majorId", { required: "Chuyên ngành không được bỏ trống" })}
                            >
                                <option value="">-- Chọn chuyên ngành --</option>
                                {isLoadingMajorData
                                    ? <option disabled>Đang tải...</option>
                                    : majorData?.map((major: IMajorSimple) => (
                                        <option key={major.id} value={major.id.toString()}>{major.name}</option>
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
                        onClick={onClose}
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
                            ? <><Loader className="size-4 animate-spin" /> Đang cập nhật...</>
                            : "Lưu thay đổi"
                        }
                    </button>
                </div>
            </form>
        </ScrollArea>
    )
}