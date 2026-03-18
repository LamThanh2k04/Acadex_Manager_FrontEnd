"use client"
import { ICreateRoom } from "@/app/types/admin/room.type";
import { useCreateRoom, useGetAllBuildingSimple } from "@/hooks/admin/useRoom";
import { useForm } from "react-hook-form"
import { Loader } from 'lucide-react';
import ErrorResponse from '@/app/(auth)/login/ErrorResponse';
export default function RoomCreateModal({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICreateRoom>({ mode: "onBlur" });
    const { data: buildingDataSimple, isLoading: isLoadingBuildingDataSimple } = useGetAllBuildingSimple();
    const mutation = useCreateRoom(onClose);
    const onSubmit = (data: ICreateRoom) => {
        mutation.mutate(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">
                    Tên phòng học <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Vui lòng nhập tên phòng..."
                        className="border w-60 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                        {...register("name", {
                            required: "Tên phòng học không được bở trống",
                        })}
                    />
                </div>
                <ErrorResponse error={errors.name} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-gray-600">Cơ sở tương ứng</label>
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-300"
                    {...register("buildingId", { required: "Cơ sở tương ứng không được bỏ trống" })}
                >
                    <option value="">-- Chọn cơ sở tương ứng --</option>
                    {isLoadingBuildingDataSimple
                        ? <option disabled>Đang tải...</option>
                        : buildingDataSimple?.map((buil) => (
                            <option key={buil.id} value={buil.id}>{buil.name}</option>
                        ))
                    }
                </select>
                <ErrorResponse error={errors.buildingId} />
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => { onClose(), reset() }}
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
                        : "Thêm phòng học"
                    }
                </button>
            </div>
        </form>
    )
}