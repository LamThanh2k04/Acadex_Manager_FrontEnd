export interface UserInfo {
    id: number;
    fullName: string;
    avatar?: string;
    email: string;
    gender?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    address?: string;
    role: "ADMIN" | "LECTURER" | "STUDENT";
    isActive: boolean;
    createdAt: string;
    updateAt: string;
}