"use client"
import { IBuildingData, IBuildingDataResponseProps } from "@/app/types/admin/building.type";
import { Pencil, GitPullRequestCreateArrow } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BuildingSearchBar from "../BuildingSearchBar/BuildingSearchBar";
import { useState } from "react";
import BuildingCreateModal from "../BuildingModal/BuildingCreateModal";
import BuildingUpdateModal from "../BuildingModal/BuidlingUpdateModal";
import AlertDialogBlockBuilding from "../AlertDialogBuilding/AlertDialogBlockBuilding";
import AlertDialogUnBlockBuilding from "../AlertDialogBuilding/AlertDialogUnBlockBuilding";

export default function BuildingTable({ data }: IBuildingDataResponseProps) {
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState<IBuildingData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách cơ sở</h1>
                <div className="flex items-center justify-center gap-3">
                    <BuildingSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><GitPullRequestCreateArrow /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Mã cơ sở</th>
                        <th>Cơ sở</th>
                        <th>Ký hiệu cơ sở</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.buildings.map((buil) => (
                        <tr key={buil.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{buil.code}</td>
                            <td>{buil.name}</td>
                            <td>{buil.symbol}</td>
                            <td>{buil.location}</td>
                            <td>{buil.isActive === true ? <span className='bg-green-100 p-2 rounded-2xl text-green-400'>Hoạt động</span> : <span className='bg-red-100 p-2 rounded-2xl text-red-400'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{buil.isActive === true ? <AlertDialogBlockBuilding buildingId={buil.id} /> : <AlertDialogUnBlockBuilding buildingId={buil.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedBuilding(buil);
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
                    <BuildingCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin cơ sở</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedBuilding && (
                        <BuildingUpdateModal
                            key={selectedBuilding.id}
                            selectedBuilding={selectedBuilding}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedBuilding(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}