"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdateMajorStatus } from '@/hooks/admin/useMajor';
import { LockKeyholeOpen } from 'lucide-react';
export default function AlertDialogUnBlockMajor({ majorId }: { majorId: number }) {
    const mutation = useUpdateMajorStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 hover:text-red-400 cursor-pointer duration-300 transition-all"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn tạm dừng hoạt động của khoa này không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ tạm dừng hoạt động của khoa tạm thời cho đến khi được mở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(majorId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}