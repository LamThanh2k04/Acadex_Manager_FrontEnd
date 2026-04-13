"use client"
import { EyeOff, Eye, User, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonLoginForm from './ButtonLoginForm';
import { ILoginUser } from '@/app/types/auth.type';
import ErrorResponse from './ErrorResponse';
import { loginUserAction } from '@/app/actions/auth.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hook';
import { setUser } from '@/lib/features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';
export default function LoginForm() {
    const [toggle, setToggle] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ILoginUser>({ mode: "onBlur" })
    const router = useRouter();
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const onSubmit = async (data: ILoginUser) => {
        const result = await loginUserAction(data);
        if (result.success) {
            queryClient.clear();
            dispatch(setUser(result.user));
            localStorage.setItem("user_info", JSON.stringify(result.user));
            toast.success(result.message);
            const rolePath = result.role.toLowerCase();
            router.push(`/${rolePath}/dashboard`);
        } else {
            console.log("Đăng nhập thất bại", result.error);
            toast.error(result.error ?? "Đã có lỗi xảy ra");
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
            <div className='flex flex-col p-5 relative'>
                <label className='text-[#6a717e] text-sm mb-2'>Tài khoản</label>
                <span className='absolute top-14 left-7'><User /></span>
                <input
                    type="text"
                    className='border w-80 p-2 pl-10 border-gray-300 rounded-xl'
                    placeholder="e.g. 2200010762@edu.acadex/2200010762"
                    autoComplete="username"
                    {...register("identifier", {
                        required: "Tài khoản không được để trống", minLength: {
                            value: 3,
                            message: "Thông tin đăng nhập phải bao gồm email hoặc mã số đi kèm"
                        }
                    })}
                />
                <ErrorResponse error={errors.identifier} />
            </div>
            <div className='flex flex-col p-5 relative'>
                <label className='text-[#6a717e] text-sm mb-2'>Mật khẩu</label>
                <span className='absolute top-14 left-7'><Lock /></span>
                <input className='border w-80 p-2 pl-10 border-gray-300 rounded-xl'
                    type={toggle ? "text" : "password"}
                    placeholder="e.g. *****************"
                    autoComplete="current-password"
                    {...register("password", {
                        required: "Mật khẩu không được để trống", minLength: {
                            value: 6,
                            message: "Mật khẩu phải bao gồm 6 ký tự"
                        }
                    })}
                />
                <button type='button' className='absolute cursor-pointer right-8 top-14' onClick={() => { setToggle(!toggle) }}>{toggle ? <EyeOff /> : <Eye />}</button>
                <ErrorResponse error={errors.password} />
            </div>
            <ButtonLoginForm isPending={isSubmitting} />
        </form>
    )
}