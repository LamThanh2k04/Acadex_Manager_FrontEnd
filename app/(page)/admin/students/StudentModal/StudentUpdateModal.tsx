"use client"
import { IClassSimple, IStudentManager, IUpdateStudentInfo } from "@/app/types/admin/student.type";
import { useClassedByProgram, useUpdateStudentInfo } from "@/hooks/admin/useStudent";
import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader, Upload } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
export default function StudentUpdateModal({ selectedStudent, onClose }: { onClose: () => void, selectedStudent: IStudentManager }) {
    const [avatarPreview, setAvatarPreview] = useState(selectedStudent.avatar ?? null);
    const fileRef = useRef<HTMLInputElement>(null)
    const mutation = useUpdateStudentInfo(onClose);
    const { data: dataClassed, isLoading } = useClassedByProgram(selectedStudent.student.program.id);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUpdateStudentInfo>({
        defaultValues: {
            fullName: selectedStudent.fullName,
            email: selectedStudent.email,
            phoneNumber: selectedStudent.phoneNumber,
            address: selectedStudent.address,
            studentCode: selectedStudent.student.studentCode,
            personalEmail: selectedStudent.student.personalEmail,
            citizenId: selectedStudent.student.citizenId,
            placeOfBirth: selectedStudent.student.placeOfBirth,
            ethnicity: selectedStudent.student.ethnicity,
            gender: selectedStudent.gender as "MALE" | "FEMALE",
            dateOfBirth: selectedStudent.dateOfBirth
                ? new Date(selectedStudent.dateOfBirth).toISOString().split("T")[0]
                : "",
            admissionYear: selectedStudent.student.admissionYear,
            graduateYear: selectedStudent.student.graduateYear,
            classId: selectedStudent.student.class.id,
            status: selectedStudent.student.status as "STUDYING" | "GRADUATE" | "TRUANT",
        }
    });
    const { ref: registerRef, ...registerAvatar } = register("avatar");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setAvatarPreview(URL.createObjectURL(file))
    }
    const onSubmit = (data: IUpdateStudentInfo) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("address", data.address);
        formData.append("studentCode", data.studentCode);
        formData.append("personalEmail", data.personalEmail);
        formData.append("citizenId", data.citizenId);
        formData.append("placeOfBirth", data.placeOfBirth);
        formData.append("ethnicity", data.ethnicity);
        formData.append("gender", data.gender);
        formData.append("admissionYear", data.admissionYear.toString());
        formData.append("graduateYear", data.graduateYear.toString());
        formData.append("classId", data.classId.toString());
        formData.append("status", data.status);
        if (data.avatar?.[0]) {
            formData.append("avatar", data.avatar[0])
        };
        if (data.dateOfBirth) {
            formData.append("dateOfBirth", data.dateOfBirth);
        };
        mutation.mutate({ studentId: selectedStudent.student.id, formData });
    };
    useEffect(() => {
        if (dataClassed) {
            setValue("classId", selectedStudent.student.class.id)
        }
    }, [dataClassed])
    console.log(selectedStudent.student.class.name);

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
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Thông tin học tập</h2>
                    <div className="grid grid-cols-2 gap-4">
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
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("status", { required: "Trạng thái không được bỏ trống" })}
                            >
                                <option value="">-- Trạng thái --</option>
                                <option value="STUDYING">Đang học</option>
                                <option value="GRADUATE">Đã tốt nghiệp</option>
                                <option value="TRUANT">Đang bảo lưu</option>
                            </select>
                            <ErrorResponse error={errors.status} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Năm vào trường</label>
                            <input
                                type="number"
                                placeholder="2022..."
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("admissionYear", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Năm tốt nghiệp</label>
                            <input
                                type="number"
                                placeholder="2026"
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("graduateYear", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                            <label className="text-sm font-medium text-gray-600">Lớp học</label>
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                                {...register("classId", {
                                    required: "Lớp học không được bỏ trống",
                                    valueAsNumber: true
                                })}
                            >
                                <option value="">-- Chọn lớp --</option>
                                {isLoading
                                    ? <option disabled>Đang tải...</option>
                                    : dataClassed?.map((cl: IClassSimple) => (
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