import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LockKeyholeOpen } from 'lucide-react';
import { useUpdateClassesStatus } from '@/hooks/admin/useClasses';
export default function AlertDialogUnBlockClasses({ classesId }: { classesId: number }) {
    const mutation = useUpdateClassesStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 hover:text-red-400 cursor-pointer duration-300 transition-all"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn tạm dừng hoạt động của lớp học này không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ tạm dừng hoạt động của lớp học tạm thời cho đến khi được mở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(classesId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}