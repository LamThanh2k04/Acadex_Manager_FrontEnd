import { IPagination } from "../pagination";

export interface IFaculty {
    id: number;
    code: string;
    isActive: true;
    name: string
};
export interface IFacultyResponse {
    faculties: IFaculty[];
    pagination: IPagination;
};

export interface IFacultyProps {
    data: IFacultyResponse;
};
export interface ICreateFalcuty {
    name: string
};
export interface IUpdateFalcuty {
    name: string
}