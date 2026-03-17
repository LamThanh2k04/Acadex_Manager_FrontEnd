"use client"
import { useUpdatePasswordStudent } from "@/hooks/admin/useStudent";
import { Loader } from 'lucide-react';
import { useForm } from "react-hook-form";
import { INewPasswordForStudent } from "@/app/types/admin/student.type";
import ErrorResponse from "@/app/(auth)/login/ErrorResponse";
import { useState } from "react";
import { Eye, EyeClosed } from 'lucide-react';
export default function StudentResetPasswordModal({ studentId, onClose }: { studentId: number, onClose: () => void }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<INewPasswordForStudent>({ mode: "onBlur" });
    const [toggle, setToggle] = useState(false);
    const mutation = useUpdatePasswordStudent(onClose);
    const onSubmit = (data: INewPasswordForStudent) => {
        mutation.mutate({ studentId, newPassword: data.newPassword });
        reset();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                    Mật khẩu mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type={toggle ? "text" : "password"}
                        placeholder="********"
                        className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("newPassword", {
                            required: "Mật khẩu không được để trống",
                            minLength: {
                                value: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự"
                            },
                            pattern: {
                                value: /^[A-Za-z0-9]{6,}$/,
                                message: "Mật khẩu phải gồm chữ và số"
                            }
                        })}
                    />
                    <button type="button" onClick={() => setToggle(!toggle)} className="absolute top-2 left-52 text-gray-300">{toggle ? <EyeClosed /> : <Eye />}</button>
                </div>
                <ErrorResponse error={errors.newPassword} />
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
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
                        ? <><Loader className="size-4 animate-spin" /> Đang cập nhật...</>
                        : "Lưu thay đổi"
                    }
                </button>
            </div>
        </form>
    )
}