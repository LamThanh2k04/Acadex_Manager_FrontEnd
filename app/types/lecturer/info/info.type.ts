export interface ILecturerInfoResponse {
    lecturer: ILecturerInfo;
};
export interface ILecturerInfo {
    fullName: string;
    avatar: string;
    email: string;
    gender: TGenderForLecturerInfo;
    dateOfBirth: string | null;
    phoneNumber: string | null;
    address: string | null;
    isActive: boolean;
    lecturer: ILecturerForLecturerInfo;
};
type TGenderForLecturerInfo = "MALE" | "FEMALE";
export interface ILecturerForLecturerInfo {
    lecturerCode: string;
    personalEmail: string;
    citizenId: string | null;
    placeOfBirth: string | null;
    ethnicity: string | null;
    degree: string | null;
    position: string;
    status: TStatusLectuer;
    faculty: IFalcutyOfLecturer;
    major: IMajorLecturer;
};
type TStatusLectuer = "WORKING" | "TRUANT";
export interface IFalcutyOfLecturer {
    code: string;
    name: string;
};
export interface IMajorLecturer {
    code: string;
    name: string
}