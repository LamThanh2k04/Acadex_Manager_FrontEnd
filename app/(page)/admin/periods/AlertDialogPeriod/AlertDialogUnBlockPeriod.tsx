import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdatePeriodStatus } from '@/hooks/admin/usePeriod';
import { LockKeyholeOpen } from 'lucide-react';
export default function AlertDialogUnBlockPeriod({ periodId }: { periodId: number }) {
    const mutation = useUpdatePeriodStatus()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 cursor-pointer hover:text-red-400 duration-300 transition-all"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn mở lại để tiết học hoạt động trở lại không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ giúp cho tiết học được hoạt động trở lại
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