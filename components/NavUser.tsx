"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { ChevronsUpDown, LogOut, ChevronRight, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { removeUser } from "@/lib/features/user/userSlice"
import { logoutUserAction } from "@/actions/auth.action"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ResetPasswordModal from '@/app/(page)/lecturer/components/Header/ResetPasswordModal';
import { useQueryClient } from "@tanstack/react-query";
import { setGlobalLoading } from "@/lib/features/loading/loadingSlice";
export function NavUser() {
    const user = useAppSelector((state) => state.user.userInfo);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const queryClient = useQueryClient();
    const handleLogout = async () => {
        dispatch(setGlobalLoading(true));
        try {
            await logoutUserAction()
            queryClient.clear();
            localStorage.removeItem("user_info")
            dispatch(removeUser())
            router.push("/login")
            toast.success("Đăng xuất thành công")
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setGlobalLoading(false));
        };
    };
    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton size="lg" className="hover:bg-orange-50 dark:hover:bg-gray-900 duration-300 transition-colors cursor-pointer">
                                <Avatar className="w-8 h-8 rounded-lg">
                                    <AvatarImage src={user?.avatar || undefined} />
                                    <AvatarFallback className="rounded-lg bg-orange-100 text-[#ec5d15] font-semibold">
                                        {user?.fullName?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1 text-left">
                                    <span className="text-sm font-medium truncate">{user?.fullName}</span>
                                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                                </div>
                                <ChevronsUpDown className="size-4 text-muted-foreground" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start" className="w-56">
                            <div className="flex items-center gap-2 p-2">
                                <Avatar className="w-8 h-8 rounded-lg">
                                    <AvatarImage src={user?.avatar || undefined} />
                                    <AvatarFallback className="rounded-lg bg-orange-100 text-[#ec5d15]">
                                        {user?.fullName?.charAt(0) ?? "A"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user?.fullName}</span>
                                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            {user?.role === "LECTURER" ? (
                                <>
                                    <DropdownMenuItem>
                                        <button
                                            onClick={() => setIsOpenResetPassword(true)}
                                            className='flex items-center gap-3 rounded-xl cursor-pointer focus:bg-orange-50 focus:text-orange-600 transition-colors'>
                                            <Lock className="h-4 w-4 opacity-70" />
                                            <span className="flex-1 w-21 font-medium">Đổi mật khẩu</span>
                                            <ChevronRight className="h-3 w-3 ml-21 opacity-30" />
                                        </button>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </>
                            ) : null}

                            <DropdownMenuItem
                                className="cursor-pointer gap-2 text-red-500 focus:text-red-500 focus:bg-red-50"
                                onSelect={(e) => {
                                    e.preventDefault()
                                    setOpenDropdown(false);
                                    setOpenAlert(true)
                                }}
                            >
                                <LogOut className="size-4" />
                                Đăng xuất
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
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
                    <ResetPasswordModal onClose={() => {
                        setOpenDropdown(false);
                        setIsOpenResetPassword(false)
                    }} />
                </DialogContent>
            </Dialog>
        </>
    )
}