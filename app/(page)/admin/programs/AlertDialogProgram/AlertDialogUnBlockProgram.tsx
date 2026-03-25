import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdateProgramStatus } from '@/hooks/admin/useProgram';
import { LockKeyholeOpen } from 'lucide-react';
export default function AlertDialogUnBlockProgram({ programId }: { programId: number }) {
    const mutation = useUpdateProgramStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 cursor-pointer hover:text-red-400 duration-300 transition-all mt-2"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn mở lại để chương trình hoạt động trở lại không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ giúp cho chương trình được hoạt động trở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(programId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}