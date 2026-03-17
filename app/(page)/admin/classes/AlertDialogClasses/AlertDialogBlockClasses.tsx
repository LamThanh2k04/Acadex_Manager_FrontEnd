import { useUpdateClassesStatus } from "@/hooks/admin/useClasses"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LockKeyhole } from 'lucide-react';

export default function AlertDialogBlockClasses({ classesId }: { classesId: number }) {
    const mutation = useUpdateClassesStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 hover:text-red-400 cursor-pointer duration-300 transition-all"><LockKeyhole /></button>
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