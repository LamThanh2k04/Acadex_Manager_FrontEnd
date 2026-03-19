import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LockKeyholeOpen } from 'lucide-react';
import { useUpdateCertificationStatus } from "@/hooks/admin/useCertification";

export default function AlertDialogUnBlockCertification({ certificateId }: { certificateId: number }) {
    const mutation = useUpdateCertificationStatus()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 cursor-pointer hover:text-red-400 duration-300 transition-all"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn mở lại để chứng chỉ hoạt động trở lại không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ giúp cho chứng chỉ được hoạt động trở lại
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