import { IPagination } from "../pagination";

export interface IBuildingDataResponseProps {
    data: IBuildingDataResponse;
};
export interface IBuildingDataResponse {
    buildings: IBuildingData[];
    pagination: IPagination
};
export interface IBuildingData {
    id: number;
    code: string;
    name: string;
    symbol: string;
    location: string;
    isActive: boolean;
};
export interface ICreateBuilding {
    code: string;
    name: string;
    symbol: string;
    location: string;
};
export type TUpdateBuilding = Omit<ICreateBuilding, "code">;