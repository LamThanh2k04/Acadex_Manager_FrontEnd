import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdateBuildingStatus } from '@/hooks/admin/useBuilding';
import { LockKeyholeOpen } from 'lucide-react';
export default function AlertDialogUnBlockBuilding({ buildingId }: { buildingId: number }) {
    const mutation = useUpdateBuildingStatus()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 cursor-pointer hover:text-red-400 duration-300 transition-all"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn mở lại để cơ sở hoạt động trở lại không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ giúp cho cơ sở được hoạt động trở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(buildingId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}