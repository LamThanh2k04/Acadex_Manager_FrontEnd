import { IPagination } from "../pagination";
export interface IRoomDataResponseProps {
    data: IRoomDataResponse;
};
export interface IRoomDataResponse {
    rooms: IRoomData[];
    pagination: IPagination;
};
export interface IRoomData {
    id: number;
    name: string;
    isActive: true;
    building: IBuildingOfRoom;
};
export interface IBuildingOfRoom {
    id: number;
    code: string;
    name: string;
    symbol: string;
    location: string;
    isActive: boolean;
};
export interface ICreateRoom {
    name: string;
    buildingId: number;
};
export interface IBuildingOfRoomSimple {
    id: number;
    name: string;
    symbol: string;
    location: string
};
export type TUpdateRoom = ICreateRoom;