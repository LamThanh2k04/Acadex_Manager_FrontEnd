import { IPagination } from "../pagination";

export interface IProgramDataResponseProps {
    data: IProgramDataResponse;
};
export interface IProgramDataResponse {
    programs: IProgramData[];
    pagination: IPagination
}
export interface IProgramData {
    id: number;
    code: string;
    name: string;
    trainingLevel: TTrainingLevel;
    educationType: TEducationType;
    plannedEducationYear: number;
    totalCredits: number;
    feePerCredit: number;
    version: number;
    isActive: boolean;
    major: {
        id: number;
        name: string;
    }
};
export interface ICreateProgram {
    name: string;
    trainingLevel: TTrainingLevel;
    educationType: TEducationType;
    plannedEducationYear: number;
    feePerCredit: number;
    version: number;
    majorId: number;
};
export type TTrainingLevel = "COLLEGE" | "BACHELOR" | "MASTER";
export type TEducationType = "FULL_TIME" | "PART_TIME" | "DISTANCE_LEARNING";
export type TUpdateProgramInfo = ICreateProgram;