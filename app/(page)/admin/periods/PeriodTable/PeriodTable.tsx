"use client"
import { IPeriodData, IPeriodDataResponseProps } from "@/app/types/admin/period.type";
import { Pencil, CalendarPlus } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PeriodSearchBar from "../PeriodSearchBar/PeriodSearchBar";
import { useState } from "react";
import PeriodCreateModal from "../PeriodModal/PeriodCreateModal";
import PeriodUpdateModal from "../PeriodModal/PeriodUpdateModal";
import AlertDialogBlockPeriod from "../AlertDialogPeriod/AlertDialogBlockPeriod";
import AlertDialogUnBlockPeriod from "../AlertDialogPeriod/AlertDialogUnBlockPeriod";

export default function PeriodTable({ data }: IPeriodDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<IPeriodData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách ngành đào tạo</h1>
                <div className="flex items-center justify-center gap-3">
                    <PeriodSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><CalendarPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Tiết học</th>
                        <th>Thời gian bắt đầu (phút)</th>
                        <th>Thời gian kết thúc (phút)</th>
                        <th>Bắt đầu lúc (giờ)</th>
                        <th>Kết thúc lúc (giờ)</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.periods.map((pe) => (
                        <tr key={pe.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{pe.period}</td>
                            <td>{pe.startTime}</td>
                            <td>{pe.endTime}</td>
                            <td>{pe.startHour}</td>
                            <td>{pe.endHour}</td>
                            <td>{pe.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{pe.isActive === true ? <AlertDialogBlockPeriod periodId={pe.id} /> : <AlertDialogUnBlockPeriod periodId={pe.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedPeriod(pe);
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
                    <PeriodCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin tiết học</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedPeriod && (
                        <PeriodUpdateModal
                            key={selectedPeriod.id}
                            selectedPeriod={selectedPeriod}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedPeriod(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}