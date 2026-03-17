import { IPagination } from "../pagination";

export interface IMajorDataProps {
    data: IMajorDataResponse
}
export interface IMajorDataResponse {
    majors: IMajorData[];
    pagination: IPagination;
}
export interface IMajorData {
    id: number;
    code: string;
    faculty: IFacultyOfMajor;
    isActive: boolean;
    name: string;
}
export interface IFacultyOfMajor {
    id: number;
    code: string;
    isActive: boolean;
    name: string
};
export interface ICreateMajor {
    name: string;
    facultyId: number;
}
export type TFacultyOfMajorSimple = Pick<IFacultyOfMajor, "id" | "name">