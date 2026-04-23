import { IPagination } from "../pagination";
import { IMajorData } from "./major.type";

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
export interface IProgramInfoResponse {
    program: IProgramInfo;
};
export interface IProgramInfo {
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
    majorId: number;
    major: TMajorOfProgram;
    programSubjects: IProgramSubject[];
    programCertificates: ICertificateProgram[];
};
export interface IProgramSubject {
    id: number;
    semesterOrder: number;
    feePerCredit: number;
    isActive: boolean;
    type: TTypeOfMajor;
    subject: ISubjectOfProgramSubject;
};
export interface ISubjectOfProgramSubject {
    name: string;
    code: string;
    credits: number;
}
export interface ICertificateProgram {
    id: number;
    template: ITemplateOfCertificateProgram;
};
export interface ITemplateOfCertificateProgram {
    code: string;
    name: string;
    description: string;
    isActive: boolean
}
export type TMajorOfProgram = Pick<IMajorData, "name">;
export interface ICreateSubjectOfProgram {
    subjectIds?: number[];
    semesterOrder: number;
    type: TTypeOfMajor;
    feePerCredit: number;
};
export interface IUpdateSubjectOfProgram {
    semesterOrder: number;
    type: TTypeOfMajor;
    feePerCredit: number;
    isActive: boolean
};
export type TTypeOfMajor = "MANDATORY" | "ELECTIVE";
export interface ICreateCertificateOfProgram {
    certificateIds?: number[];
}
export interface IUpdateCertificateOfProgram {
    isActive: boolean;
};
export interface ISubjectToProgram {
    id: number;
    name: string;
    code: string;
};
export interface ICertificateToProgram {
    id: number;
    name: string;
    description: string;
};