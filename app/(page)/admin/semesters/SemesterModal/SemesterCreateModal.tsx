import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { ICreateSemester } from '@/app/types/admin/semester.type';
import { useCreateSemester } from '@/hooks/admin/useSemester';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
export default function SemesterCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICreateSemester>({ mode: "onBlur" });
    const mutation = useCreateSemester(onClose);
    const onSubmit = (data: ICreateSemester) => {
        mutation.mutate(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Tên học kì <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Vui lòng nhập tên học kì..."
                        className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("name", {
                            required: "Tên học kì không được bỏ trống",
                        })}
                    />
                </div>
                <ErrorResponse error={errors.name} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Niên khóa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Vui lòng nhập niên khóa..."
                        className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("academicYear", {
                            required: "Niên khác không được bỏ trống",
                        })}
                    />
                </div>
                <ErrorResponse error={errors.academicYear} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">Ngày bắt đầu</label>
                <input
                    type="date"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("startDate")}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Ngày kết thúc</label>
                <input
                    type="date"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("endDate")}
                />
            </div>
            <div className="flex justify-end gap-3 mt-5">
                <button
                    type="button"
                    onClick={() => { onClose(); reset() }}
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
                        ? <><Loader className="size-4 animate-spin" /> Đang thêm...</>
                        : "Thêm học kì"
                    }
                </button>
            </div>
        </form>
    )
}