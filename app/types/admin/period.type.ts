import { IPagination } from "../pagination";

export interface IPeriodDataResponseProps {
    data: IPeriodDataResponse
};
export interface IPeriodDataResponse {
    periods: IPeriodData[];
    pagination: IPagination
};
export interface IPeriodData {
    id: number;
    period: number;
    startTime: number;
    endTime: number;
    isActive: boolean;
    startHour: string;
    endHour: string;
};
export interface ICreatePeriod {
    period: number;
    startTime: number;
    endTime: number;
}
export type TUpdatePeriod = ICreatePeriod;