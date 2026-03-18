import { ISubjectData, TUpdateSubject } from "@/app/types/admin/subject.type";
import { useUpdateSubjectInfo } from "@/hooks/admin/useSubject";
import { useForm } from "react-hook-form";
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
import { Loader } from 'lucide-react';

export default function SubjectUpdateModal({ onClose, selectedSubject }: { onClose: () => void, selectedSubject: ISubjectData }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TUpdateSubject>({
        defaultValues: {
            name: selectedSubject.name,
            credits: selectedSubject.credits,
            theoryPeriods: selectedSubject.theoryPeriods,
            practicePeriods: selectedSubject.practicePeriods,
            countToGpa: selectedSubject.countToGpa
        }
    })
    const mutation = useUpdateSubjectInfo(onClose);
    const onSubmit = (data: TUpdateSubject) => {
        mutation.mutate({
            subjectId: selectedSubject.id, data: {
                name: data.name,
                credits: data.credits,
                theoryPeriods: data.theoryPeriods,
                practicePeriods: data.practicePeriods,
                countToGpa: data.countToGpa
            }
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                    Tên môn học <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Vui lòng nhập tên môn học..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 w-full"
                    {...register("name", { required: "Tên môn học không được bỏ trống" })}
                />
                <ErrorResponse error={errors.name} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Số tín chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="VD: 3"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("credits", { required: "Không được bỏ trống" })}
                    />
                    <ErrorResponse error={errors.credits} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Số tiết lý thuyết <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="VD: 30"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("theoryPeriods", { required: "Không được bỏ trống" })}
                    />
                    <ErrorResponse error={errors.theoryPeriods} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Số tiết thực hành <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="VD: 15"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("practicePeriods", { required: "Không được bỏ trống" })}
                    />
                    <ErrorResponse error={errors.practicePeriods} />
                </div>
            </div>
            <label className="flex items-center gap-3 w-fit cursor-pointer group">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="countToGpa"
                        className="sr-only peer"
                        {...register("countToGpa")}
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-orange-400 transition-colors duration-300" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5" />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                    Tính vào GPA
                </span>
            </label>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => { onClose(); reset(); }}
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
                        : "Cập nhật môn học"
                    }
                </button>
            </div>
        </form>
    )
}