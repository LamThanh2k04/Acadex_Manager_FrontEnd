"use client"
import { useGetAllRoom } from "@/hooks/admin/useRoom"
import { useSearchParams } from "next/navigation";
import RoomTableSkeleton from "./RoomTable/RoomTableSkeleton";
import RoomTable from "./RoomTable/RoomTable";

export default function Rooms() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: roomData, isLoading: isLoadingRoomData } = useGetAllRoom(search, page);
    return (
        <div>
            {isLoadingRoomData ? <RoomTableSkeleton /> : roomData && <RoomTable data={roomData} />}
        </div>
    )
}