"use client"
import { ICourseData, TUpdateCourse } from "@/app/types/admin/course.type";
import { useUpdateCourseInfo } from "@/hooks/admin/useCourse";
import { useForm } from "react-hook-form";
import { useGetAllLecturerSimple, useGetAllClassSimple } from '@/hooks/admin/useSimple';
import ErrorResponse from "@/app/(auth)/login/ErrorResponse";
import { Loader } from "lucide-react";
export default function CourseUpdateModal({ onClose, selectedCourse }: { onClose: () => void, selectedCourse: ICourseData }) {
    const { register, reset, formState: { errors }, handleSubmit } = useForm<TUpdateCourse>({
        defaultValues: {
            maxStudents: selectedCourse.maxStudents,
            lecturerId: selectedCourse.lecturer.id,
            plannedClassId: selectedCourse.plannedClass.id
        },
        mode: "onBlur"
    });
    const mutation = useUpdateCourseInfo(onClose);
    const { data: lecturerSimpleData, isLoading: isLoadingLecturer } = useGetAllLecturerSimple();
    const { data: classSimpleData, isLoading: isLoadingClass } = useGetAllClassSimple();
    const onSubmit = (data: TUpdateCourse) => {
        mutation.mutate({
            courseSectionId: selectedCourse.id, data: {
                maxStudents: data.maxStudents,
                lecturerId: data.lecturerId,
                plannedClassId: data.plannedClassId
            }
        })
    };
    if (isLoadingLecturer || isLoadingClass) {
        return (
            <div className="flex items-center justify-center py-10">
                <Loader className="size-5 animate-spin text-orange-400" />
            </div>
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Giảng viên đảm nhận <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("lecturerId", { required: "Vui lòng chọn giảng viên đảm nhận" })}
                    >
                        <option value="">-- Chọn giảng viên --</option>
                        {isLoadingLecturer
                            ? <option disabled>Đang tải...</option>
                            : lecturerSimpleData?.map((lec) => (
                                <option value={lec.lecturer.id} key={lec.lecturer.id}>{lec.fullName}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.lecturerId} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Lớp <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("plannedClassId", { required: "Vui lòng chọn lớp" })}
                    >
                        <option value="">-- Chọn lớp --</option>
                        {isLoadingClass
                            ? <option disabled>Đang tải...</option>
                            : classSimpleData?.map((cl) => (
                                <option value={cl.id} key={cl.id}>{cl.name}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.plannedClassId} />
                </div>
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Số sinh viên tối đa <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    placeholder="Nhập số sinh viên tối đa..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("maxStudents", { required: "Vui lòng nhập số sinh viên tối đa" })}
                />
                <ErrorResponse error={errors.maxStudents} />
            </div>
            <div className="flex justify-end gap-3">
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
                        : "Lưu thay đổi"
                    }
                </button>
            </div>
        </form>
    )
}