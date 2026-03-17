import { IFaculty, IUpdateFalcuty } from "@/app/types/admin/faculty.type";
import { useUpdateFacultiesInfo } from "@/hooks/admin/useFaculty"
import { useForm } from "react-hook-form";
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';

export default function FacultyUpdateModal({ selectedFaculty, onClose }: { selectedFaculty: IFaculty, onClose: () => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm<IUpdateFalcuty>({
        defaultValues: {
            name: selectedFaculty.name
        }
    })
    const mutation = useUpdateFacultiesInfo(onClose);
    const onSubmit = (data: IUpdateFalcuty) => {
        mutation.mutate({ facultyId: selectedFaculty.id, name: data.name });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                    Tên khoa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type="text"

                        className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("name", {
                            required: "Tên khoa không được bở trống",
                        })}
                    />
                </div>
                <ErrorResponse error={errors.name} />
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