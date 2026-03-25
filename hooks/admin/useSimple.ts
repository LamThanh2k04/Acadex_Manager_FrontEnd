import { adminService } from "@/app/api/adminService"
import { useQuery } from "@tanstack/react-query"
import { IProgramSimple, IClassSimple } from '@/app/types/admin/student.type';
import { ICertificateSimple, ILecturerSimple, IPeriodSimple, IRoomSimple, ISemesterSimple, ISubjectSimple } from "@/app/types/admin/simpleOrOther.type";

export const useGetAllLecturerSimple = () => {
    return useQuery<ILecturerSimple[]>({
        queryKey: ['get-all-lecturer-simple'],
        queryFn: () => adminService.getAllLecturerSimple()
    })
};
export const useGetAllSemesterSimple = () => {
    return useQuery<ISemesterSimple[]>({
        queryKey: ['get-all-semester-simple'],
        queryFn: () => adminService.getAllSemesterSimple()
    })
};
export const useGetAllProgramSimple = () => {
    return useQuery<IProgramSimple[]>({
        queryKey: ['program-simple'],
        queryFn: () => adminService.getAllProgramSimple(),
        staleTime: 6 * 50 * 1000,
    })
};
export const useGetAllClassSimple = () => {
    return useQuery<IClassSimple[]>({
        queryKey: ['class-simple'],
        queryFn: () => adminService.getAllClassSimple(),
        staleTime: 6 * 50 * 1000,
    })
};
export const useGetAllRoomSimple = () => {
    return useQuery<IRoomSimple[]>({
        queryKey: ['room-simple'],
        queryFn: () => adminService.getAllRoomSimple(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetAllPeriodSimple = () => {
    return useQuery<IPeriodSimple[]>({
        queryKey: ['period-simple'],
        queryFn: () => adminService.getAllPeriodSimple(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetAllSubjectSimple = () => {
    return useQuery<ISubjectSimple[]>({
        queryKey: ['subject-simple'],
        queryFn: () => adminService.getAllSubjectsSimple(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetCertificateSimple = () => {
    return useQuery<ICertificateSimple>({
        queryKey: ['certificate-simple'],
        queryFn: () => adminService.getAllCertificatesSimple(),
        staleTime: 5 * 60 * 1000,
    })
};