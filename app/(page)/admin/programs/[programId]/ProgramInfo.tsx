"use client"
import { useGetProgramInfo } from "@/hooks/admin/useProgram";
import { ArrowLeft, CirclePlus, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubjectToProgramCreateModal from "./SubjectToProgram/SubjectToProgramCreateModal";
export default function ProgramInfo({ programId }: { programId: number }) {
    const { data, isLoading } = useGetProgramInfo(programId);
    const [isModalCreateSubject, setIsModalCreateSubject] = useState(false);
    const program = data?.program;
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="size-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }
    const trainingLevelRender = {
        "BACHELOR": <span className="bg-blue-100 py-2 px-3 rounded-2xl text-blue-300">Cử nhân</span>,
        "COLLEGE": <span className="bg-orange-100 p-2 rounded-2xl text-orange-300">Cao đẳng</span>,
        "MASTER": <span className="bg-green-100 py-2 px-5 rounded-2xl text-green-300">Thạc sĩ</span>
    };
    const educationTypeRender = {
        "FULL_TIME": <span className="bg-purple-100 py-2 px-5 rounded-2xl text-purple-300">Chính quy</span>,
        "PART_TIME": <span className="bg-red-100 p-2 rounded-2xl text-red-300">Bán thời gian</span>,
        "DISTANCE_LEARNING": <span className="bg-pink-100 py-2 px-5 rounded-2xl text-pink-300">Học từ xa</span>
    };
    if (!program) return null;
    return (
        <div className="p-6">
            <div className="mb-6">
                <Link
                    href="/admin/programs"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition mb-3 w-fit"
                >
                    <ArrowLeft className="size-4" /> Quay lại
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-700">{program.name}</h1>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${program.isActive
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-500"
                                }`}>
                                {program.isActive ? "Đang hoạt động" : "Tạm dừng"}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                            {program.code} - {program.major.name} - {program.major.name}
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-1">
                    <div className="border sticky top-10 border-gray-100 rounded-2xl bg-white p-5">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            Thông tin chung
                        </h2>
                        <div className="space-y-3">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Mã chương trình</span>
                                <span className="text-sm font-medium text-gray-700">{program.code}</span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Bậc đào tạo</span>
                                <span className="text-sm font-medium mt-3 text-gray-700">
                                    {trainingLevelRender[program.trainingLevel] ?? <span className="bg-gray-500">{program.trainingLevel}</span>}
                                </span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Hình thức đào tạo</span>
                                <span className="text-sm font-medium mt-3 text-gray-700">
                                    {educationTypeRender[program.educationType] ?? <span className="bg-gray-500">{program.educationType}</span>}
                                </span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Số năm đào tạo</span>
                                <span className="text-sm font-medium text-gray-700">{program.plannedEducationYear} năm</span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Tổng tín chỉ</span>
                                <span className="text-sm font-medium text-gray-700">
                                    {program.totalCredits ?? "Chưa cập nhật"}
                                </span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Học phí / tín chỉ</span>
                                <span className="text-sm font-medium text-gray-700">
                                    {program.feePerCredit.toLocaleString("vi-VN")}đ
                                </span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Phiên bản</span>
                                <span className="text-sm font-medium text-gray-700">{program.version}</span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Khoa</span>
                                <span className="text-sm font-medium text-gray-700">{program.major.name}</span>
                            </div>
                            <div className="h-px bg-gray-50" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Ngành</span>
                                <span className="text-sm font-medium text-gray-700">{program.major.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-5">
                    <div className="border border-gray-100 rounded-2xl bg-white p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                Môn học trong chương trình
                            </h2>
                            <button
                                onClick={() => setIsModalCreateSubject(true)}
                                className="flex items-center gap-1.5 text-sm bg-orange-100 text-orange-500 hover:bg-orange-200 transition px-3 py-1.5 rounded-lg cursor-pointer">
                                <CirclePlus className="size-4" /> Thêm môn
                            </button>
                        </div>
                        {program.programSubjects.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                                <p className="text-sm">Chưa có môn học nào</p>
                            </div>
                        ) : (
                            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden text-sm">
                                <thead className="bg-orange-100 text-gray-500 uppercase text-xs tracking-wide">
                                    <tr className="h-10 text-center">
                                        <th>Môn học</th>
                                        <th>Số tín chỉ</th>
                                        <th>Kỳ học</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {program.programSubjects.map((s: any) => (
                                        <tr key={s.id} className="h-10 text-center hover:bg-orange-50 transition">
                                            <td>{s.subject.name} - {s.subject.code}</td>
                                            <td>{s.subject.credits}</td>
                                            <td>{s.semesterOrder}</td>
                                            <td>{s.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Tạm ngưng</span>}</td>
                                            <td>
                                                <button><Pencil className="size-4 text-gray-300 cursor-pointer hover:text-blue-400 transition" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="border border-gray-100 rounded-2xl bg-white p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                Chứng chỉ yêu cầu
                            </h2>
                            <button className="flex items-center gap-1.5 text-sm bg-orange-100 text-orange-500 hover:bg-orange-200 transition px-3 py-1.5 rounded-lg cursor-pointer">
                                <CirclePlus className="size-4" /> Thêm chứng chỉ
                            </button>
                        </div>
                        {program.programCertificates.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-gray-300">
                                <p className="text-sm">Chưa có chứng chỉ nào</p>
                            </div>
                        ) : (
                            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden text-sm">
                                <thead className="bg-orange-100 text-gray-500 uppercase text-xs tracking-wide">
                                    <tr className="h-10 text-center">
                                        <th>Chứng chỉ</th>
                                        <th>Mô tả</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {program.programCertificates.map((c: any) => (
                                        <tr key={c.id} className="h-10 text-center hover:bg-orange-50 transition">
                                            <td>{c.template.code} - {c.template.name}</td>
                                            <td>{c.template.description}</td>
                                            <td>{c.template.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Tạm ngưng</span>}</td>
                                            <td>
                                                <button><Pencil className="size-4 text-gray-300 cursor-pointer hover:text-blue-400 transition" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Dialog open={isModalCreateSubject} onOpenChange={setIsModalCreateSubject}>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Thông tin chung</DialogTitle>
                            </DialogHeader>
                            <SubjectToProgramCreateModal programId={programId} onClose={() => setIsModalCreateSubject(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}