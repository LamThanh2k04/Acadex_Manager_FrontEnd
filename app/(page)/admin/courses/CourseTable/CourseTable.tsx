"use client"
import { ICourseData, ICourseDataResponseProps } from "@/app/types/admin/course.type";
import { Pencil, CirclePlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CourseSearchBar from "../CourseSearchBar/CourseSearchBar";
import { useState } from "react";
import CourseCreateModal from "../CourseModal/CourseCreateModal";
import CourseUpdateModal from "../CourseModal/CourseUpdateModal";
import AlertDialogBlockCourse from "../AlertDialogCourse/AlertDialogBlockCourse";
import AlertDialogUnBlockCourse from "../AlertDialogCourse/AlertDialogUnBlockCourse";
export default function CourseTable({ data }: ICourseDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourseData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">
                        Danh sách học phần
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Quản lý học phần dành cho sinh viên.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <CourseSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CirclePlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã học phần</th>
                        <th>Giới hạn sinh viên</th>
                        <th>Môn học</th>
                        <th>Lớp học phần</th>
                        <th>Giảng viên đảm nhiệm</th>
                        <th>Học kỳ</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.courseSections.map((course) => (
                        <tr key={course.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{course.sectionCode}</td>
                            <td>{course.maxStudents}</td>
                            <td>{course.subject.name}</td>
                            <td>{course.plannedClass.name}</td>
                            <td>{course.lecturer?.user?.fullName}</td>
                            <td>{course.semester.name}</td>
                            <td>{course.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{course.isActive === true ? <AlertDialogBlockCourse courseSectionId={course.id} /> : <AlertDialogUnBlockCourse courseSectionId={course.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedCourse(course);
                                }}><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pagination={data.pagination} />
            <Dialog open={isModalCreate} onOpenChange={setIsModalCreate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Thông tin chung</DialogTitle>
                    </DialogHeader>
                    <CourseCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin chuyên ngành</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedCourse && (
                        <CourseUpdateModal
                            key={selectedCourse.id}
                            selectedCourse={selectedCourse}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedCourse(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}