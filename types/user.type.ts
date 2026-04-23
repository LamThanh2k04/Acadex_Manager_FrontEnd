export interface UserInfo {
    id: number;
    fullName: string;
    avatar?: string;
    email: string;
    gender?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    address?: string;
    role: TUSerRole;
    isActive: boolean;
    createdAt: string;
    updateAt: string;
};
export type TUSerRole = "ADMIN" | "LECTURER" | "STUDENT";