import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUnpaidEnrollment, createPayment, getPaidEnrollment } from '@/app/api/studentService/payment';
import { ICreatePayment, IPaidEnrollmentData, IGetUnPaidEnrollmentData, IPaidEnrollmentDataResponse } from '@/app/types/student/payment.type';
import toast from "react-hot-toast";

export const useGetUnPaidEnrollment = () => {
    return useQuery<IGetUnPaidEnrollmentData>({
        queryKey: ['get-unpaid-enrollment'],
        queryFn: () => getUnpaidEnrollment(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useCreatePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICreatePayment) => createPayment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-unpaid-enrollment'] });
            queryClient.invalidateQueries({ queryKey: ['get-paid-enrollment'] });
            toast.success("Đã tạo phiên thanh toán");
        },
        onError: (err: any) => {
            const message = err.response?.data?.message ?? "Chưa tạo phiên thanh toán";
            toast.error(message);
        }
    })
};
export const useGetPaidEnrollment = () => {
    return useQuery<IPaidEnrollmentDataResponse>({
        queryKey: ['get-paid-enrollment'],
        queryFn: () => getPaidEnrollment(),
        staleTime: 5 * 60 * 1000,
    })
};