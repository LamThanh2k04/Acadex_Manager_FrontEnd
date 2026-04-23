"use client"
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { useForm } from 'react-hook-form';
import { Loader, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useResetPassword } from '@/hooks/lecturer/resetPassword/useResetPassword';
import { IResetPassword } from '@/types/lecturer/resetPassword/resetPassword.type';
function PasswordInput({ label, placeholder, error, registration }: {
    label: string;
    placeholder: string;
    error?: any;
    registration: any;
}) {
    const [show, setShow] = useState(false);
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold dark:text-white text-gray-600 uppercase tracking-wider">
                <Lock size={11} className="text-[#ec5d15]" />
                {label}
            </label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    {...registration}
                    className="w-full text-sm px-4 py-2.5 pr-10 rounded-xl border border-gray-200
                               bg-white text-gray-700 placeholder:text-gray-300
                               focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                               transition-all"
                />
                <button
                    type="button"
                    onClick={() => setShow(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
            </div>
            <ErrorResponse error={error} />
        </div>
    );
}

export default function ResetPasswordModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IResetPassword>({ mode: "onBlur" });
    const mutation = useResetPassword(onClose);
    const onSubmit = (data: IResetPassword) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <PasswordInput
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại..."
                error={errors.oldPassword}
                registration={register("oldPassword", { required: "Vui lòng nhập mật khẩu hiện tại" })}
            />
            <PasswordInput
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới..."
                error={errors.newPassword}
                registration={register("newPassword", { required: "Vui lòng nhập mật khẩu mới" })}
            />
            <PasswordInput
                label="Xác nhận mật khẩu"
                placeholder="Xác nhận mật khẩu..."
                error={errors.confirmPassword}
                registration={register("confirmPassword", { required: "Vui lòng xác nhận mật khẩu" })}
            />
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => { reset(); onClose(); }}
                    className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
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
                            Đang đổi...
                        </>
                    ) : (
                        <>
                            <Lock size={13} />
                            Xác nhận
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}