import { adminService } from "@/app/api/adminService"
import { TFacultyOfMajorSimple } from "@/app/types/admin/major.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGetAllMajors = (search: string, page: number) => {
    return useQuery({
        queryKey: ['get-all-majors', search, page],
        queryFn: () => adminService.getAllMajors(search, page)
    })
};
export const useCreateMajor = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-major"],
        mutationFn: ({ facultyId, name }: { facultyId: number, name: string }) => adminService.createMajor(facultyId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-majors"] });
            toast.success("Thêm ngành đào tạo thành công");
            onClose();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message ?? "Thêm ngành đào tạo thất bại";
            toast.error(message);
        }
    });
};
export const useGetAllFacultiesSimple = () => {
    return useQuery<TFacultyOfMajorSimple[]>({
        queryKey: ['get-all-faculties-simple'],
        queryFn: () => adminService.getAllFacultiesSimple(),
        staleTime: 5 * 60 * 1000,
    });
};