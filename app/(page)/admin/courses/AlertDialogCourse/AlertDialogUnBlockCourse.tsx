import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useUpdateCourseStatus } from '@/hooks/admin/useCourse';
import { LockKeyholeOpen } from 'lucide-react';
export default function AlertDialogUnBlockCourse({ courseSectionId }: { courseSectionId: number }) {
    const mutation = useUpdateCourseStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-gray-300 cursor-pointer hover:text-red-400 duration-300 transition-all"><LockKeyholeOpen /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn mở lại để học phần hoạt động trở lại không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ giúp cho học phần được hoạt động trở lại
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(courseSectionId)}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}