"use client"
import { useGetAllBuilding } from "@/hooks/admin/useBuilding"
import { useSearchParams } from "next/navigation";
import BuildingTableSkeleton from "./BuildingTable/BuildingTableSkeleton";
import BuildingTable from "./BuildingTable/BuildingTable";

export default function Buildings() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: buildingData, isLoading: isLoadingBuildingData } = useGetAllBuilding(search, page);
    return (
        <div>
            {isLoadingBuildingData ? <BuildingTableSkeleton /> : buildingData && <BuildingTable data={buildingData} />}
        </div>
    )
}