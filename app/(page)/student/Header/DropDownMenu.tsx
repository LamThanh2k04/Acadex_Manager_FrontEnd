"use client"
import Image from 'next/image';
import { User, Lock, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import Link from 'next/link';
import { removeUser } from '@/lib/features/user/userSlice';
import { logoutUserAction } from '@/app/actions/auth.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ResetPasswordModal from './ResetPasswordModal';
export default function DropDownMenu() {
    const user = useAppSelector((state) => state.user.userInfo);
    const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [openAlert, setOpenAlert] = useState(false)
    const handleLogout = async () => {
        await logoutUserAction()
        localStorage.removeItem("user_info")
        dispatch(removeUser())
        router.push("/login")
        toast.success("Đăng xuất thành công")
    }
    const initials = user?.fullName
        .split(" ")
        .slice(-2)
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="group relative p-2 h-10 w-10 rounded-full border-2 border-transparent bg-orange-50 hover:border-orange-500 hover:bg-orange-100 transition-all duration-300 focus-visible:ring-0 focus:outline-none overflow-hidden"
                        variant="outline"
                    >
                        {user?.avatar ? (
                            <Image
                                src={user?.avatar}
                                fill
                                alt="User Avatar"
                                className="object-cover rounded-full p-0.5"
                            />
                        ) : (
                            <span className="text-orange-400 text-xl">{initials}</span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2 mt-2 shadow-2xl rounded-2xl border-orange-100 dark:bg-slate-900" align="end">
                    <DropdownMenuLabel className="font-bold border-b pb-3 mb-2">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">
                                {user?.fullName || "Khách"}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground italic">
                                {user?.email || "Chưa cập nhật email"}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuGroup className="space-y-1">
                        <DropdownMenuItem>
                            <Link href="/student/studentInfo" className='flex items-center gap-3 rounded-xl cursor-pointer focus:bg-orange-50 focus:text-orange-600 transition-colors w-full'>
                                <User className="h-4 w-4 opacity-70" />
                                <span className="flex-1 font-medium">Thông tin cá nhân</span>
                                <ChevronRight className="h-3 w-3 opacity-30" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button
                                onClick={() => setIsOpenResetPassword(true)}
                                className='flex items-center gap-3 rounded-xl cursor-pointer focus:bg-orange-50 focus:text-orange-600 transition-colors'>
                                <Lock className="h-4 w-4 opacity-70" />
                                <span className="flex-1 w-21 font-medium">Đổi mật khẩu</span>
                                <ChevronRight className="h-3 w-3 ml-21 opacity-30" />
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-2 bg-orange-50" />
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault()
                            setOpenAlert(true)
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600 transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span className="font-bold">Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn đăng xuất không?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Đăng xuất
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Dialog open={isOpenResetPassword} onOpenChange={setIsOpenResetPassword}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Cài đặt lại mật khẩu</DialogTitle>
                    </DialogHeader>
                    <ResetPasswordModal onClose={() => setIsOpenResetPassword(false)} />
                </DialogContent>
            </Dialog>
        </>
    )
}