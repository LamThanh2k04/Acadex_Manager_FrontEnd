import { IRoomData, IRoomDataResponseProps } from "@/app/types/admin/room.type";
import { Pencil, GitPullRequestCreateArrow } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RoomSearchBar from "../RoomSearchBar/RoomSearchBar";
import { useState } from "react";
import RoomCreateModal from "../RoomModal/RoomCreateModal";
import RoomUpdateModal from "../RoomModal/RoomUpdateModal";
import AlertDialogUnBlockRoom from "../AlertDialogRoom/AlertDialogUnBlockRoom";
import AlertDialogBlockRoom from "../AlertDialogRoom/AlertDialogBlockRoom";

export default function RoomTable({ data }: IRoomDataResponseProps) {
    console.log(data);
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<IRoomData | null>(null);
    return (
        <div className="mt-5 p-5 border rounded-2xl bg-white ml-3 w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-500">Danh sách phòng học</h1>
                <div className="flex items-center justify-center gap-3">
                    <RoomSearchBar />
                    <button onClick={() => setIsModalCreate(true)} className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><GitPullRequestCreateArrow /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Tên phòng học</th>
                        <th>Phòng thuộc cơ sở</th>
                        <th>Địa chỉ phòng học thuộc cơ sở</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.rooms.map((r) => (
                        <tr key={r.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td>{r.name}</td>
                            <td>{r.building.name}</td>
                            <td>{r.building.location}</td>
                            <td>{r.isActive === true ? <span className='bg-green-400 p-2 rounded-2xl text-green-50'>Hoạt động</span> : <span className='bg-red-400 p-2 rounded-2xl text-red-50'>Tạm dừng</span>}</td>
                            <td className="text-center">
                                <span className='mr-2'>{r.isActive === true ? <AlertDialogBlockRoom roomId={r.id} /> : <AlertDialogUnBlockRoom roomId={r.id} />}</span>
                                <button onClick={() => {
                                    setIsModalUpdate(true);
                                    setSelectedRoom(r);
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
                    <RoomCreateModal onClose={() => setIsModalCreate(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isModalUpdate} onOpenChange={setIsModalUpdate}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin phòng học</DialogTitle>
                    </DialogHeader>
                    {isModalUpdate && selectedRoom && (
                        <RoomUpdateModal
                            key={selectedRoom.id}
                            selectedRoom={selectedRoom}
                            onClose={() => {
                                setIsModalUpdate(false)
                                setSelectedRoom(null)
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}