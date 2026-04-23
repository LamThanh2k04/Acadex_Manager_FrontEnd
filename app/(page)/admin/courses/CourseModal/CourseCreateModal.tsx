"use client"
import { ICourseForm } from '@/types/admin/course.type';
import { useCreateCourse } from "@/hooks/admin/useCourse";
import { useGetSemesterByProgram } from "@/hooks/admin/useProgram";
import { useGetSubjectBySemesterOrder } from "@/hooks/admin/useSubject";
import { useGetAllClassSimple, useGetAllLecturerSimple, useGetAllProgramSimple, useGetAllSemesterSimple } from "@/hooks/admin/useSimple";
import { useForm } from "react-hook-form"
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';

export default function CourseCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ICourseForm>({ mode: "onBlur" });
    const selectedProgramId = watch("programId");
    const selectedSemesterOrderId = watch("semesterOrderId");
    const { data: programSimpleData, isLoading: isLoadingProgram } = useGetAllProgramSimple();
    const { data: lecturerSimpleData, isLoading: isLoadingLecturer } = useGetAllLecturerSimple();
    const { data: semesterSimpleData, isLoading: isLoadingSemester } = useGetAllSemesterSimple();
    const { data: classSimpleData, isLoading: isLoadingClass } = useGetAllClassSimple();
    const { data: semesterByProgramData, isLoading: isLoadingSemesterByProgram } = useGetSemesterByProgram(selectedProgramId);
    const { data: subjectBySemesterOrderData, isLoading: isLoadingSubject } = useGetSubjectBySemesterOrder(selectedProgramId, selectedSemesterOrderId);
    const mutation = useCreateCourse(onClose);
    const onSubmit = (data: ICourseForm) => {
        const { programId, semesterOrderId, ...payload } = data;
        mutation.mutate(payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Chương trình <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("programId", { required: "Vui lòng chọn chương trình" })}
                    >
                        <option value="">-- Chọn chương trình --</option>
                        {isLoadingProgram
                            ? <option disabled>Đang tải...</option>
                            : programSimpleData?.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.programId} />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Kỳ trong chương trình <span className="text-red-500">*</span>
                    </label>
                    <select
                        disabled={!selectedProgramId}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        {...register("semesterOrderId", { required: "Vui lòng chọn kỳ" })}
                    >
                        <option value="">-- Chọn kỳ --</option>
                        {isLoadingSemesterByProgram
                            ? <option disabled>Đang tải...</option>
                            : semesterByProgramData?.map(s => (
                                <option key={s.semesterOrder} value={s.semesterOrder}>{s.semesterOrder}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.semesterOrderId} />
                </div>
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Môn học <span className="text-red-500">*</span>
                </label>
                <select
                    disabled={!selectedSemesterOrderId}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    {...register("subjectId", { required: "Vui lòng chọn môn học" })}
                >
                    <option value="">-- Chọn môn học --</option>
                    {isLoadingSubject
                        ? <option disabled>Đang tải...</option>
                        : subjectBySemesterOrderData?.map(s => (
                            <option key={s.subject.id} value={s.subject.id}>{s.subject.name}</option>
                        ))
                    }
                </select>
                <ErrorResponse error={errors.subjectId} />
            </div>
            <div className="flex gap-3 mb-5">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Giảng viên <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("lecturerId", { required: "Vui lòng chọn giảng viên" })}
                    >
                        <option value="">-- Chọn giảng viên --</option>
                        {isLoadingLecturer
                            ? <option disabled>Đang tải...</option>
                            : lecturerSimpleData?.map(l => (
                                <option key={l.lecturer.id} value={l.lecturer.id}>{l.fullName}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.lecturerId} />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-600">
                        Kỳ thực tế <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("semesterId", { required: "Vui lòng chọn kỳ thực tế" })}
                    >
                        <option value="">-- Chọn kỳ thực tế --</option>
                        {isLoadingSemester
                            ? <option disabled>Đang tải...</option>
                            : semesterSimpleData?.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.semesterId} />
                </div>
            </div>
            <div className="flex gap-3 mb-5">
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
                            : classSimpleData?.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))
                        }
                    </select>
                    <ErrorResponse error={errors.plannedClassId} />
                </div>

                <div className="flex flex-col gap-1 flex-1">
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
                        ? <><Loader className="size-4 animate-spin" /> Đang thêm...</>
                        : "Thêm học phần"
                    }
                </button>
            </div>
        </form>
    )
}