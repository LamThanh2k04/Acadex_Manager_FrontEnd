import { useUpdateCertificationStatus } from "@/hooks/admin/useCertification"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LockKeyhole } from 'lucide-react';

export default function AlertDialogBlockCertification({ certificateId }: { certificateId: number }) {
    const mutation = useUpdateCertificationStatus()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 hover:text-red-400 cursor-pointer duration-300 transition-all"><LockKeyhole /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn tạm đóng chứng chỉ này không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ đóng chứng chỉ tạm thời cho đến khi được mở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(certificateId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}