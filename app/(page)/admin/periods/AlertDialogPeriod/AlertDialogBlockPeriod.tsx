import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdatePeriodStatus } from '@/hooks/admin/usePeriod';
import { LockKeyhole } from 'lucide-react';
export default function AlertDialogBlockPeriod({ periodId }: { periodId: number }) {
    const mutation = useUpdatePeriodStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 hover:text-red-400 cursor-pointer duration-300 transition-all"><LockKeyhole /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn tạm dừng tiết học này không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ tạm dừng tiết học tạm thời cho đến khi được mở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(periodId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}