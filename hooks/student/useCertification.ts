import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCertificateProgram, submitCertificate, getAllCertificateStudent, getAllCertificationProgram } from '@/app/api/studentService/certification';
import { ICertificateProgram, ICertificicateStudentData, ICertificationProgramAll } from '@/app/types/student/certification.type';
import toast from "react-hot-toast";

export const useGetCertificationProgram = () => {
    return useQuery<ICertificateProgram>({
        queryKey: ['get-certification-program'],
        queryFn: () => getCertificateProgram(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useSubmitCertification = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => submitCertificate(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-certification-program'] });
            queryClient.invalidateQueries({ queryKey: ['get-certification-student'] });
            toast.success("Nộp chứng chỉ thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Nộp chứng chỉ thất bại";
            toast.error(message);
        }
    })
};
export const useGetCertificationStudent = () => {
    return useQuery<ICertificicateStudentData>({
        queryKey: ['get-certification-student'],
        queryFn: () => getAllCertificateStudent(),
        staleTime: 5 * 60 * 1000,
    })
};
export const useGetAllCertificationProgram = () => {
    return useQuery<ICertificationProgramAll[]>({
        queryKey: ['get-all-certification-program'],
        queryFn: () => getAllCertificationProgram(),
        staleTime: 5 * 60 * 1000,
    })
};