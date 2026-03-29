"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { ChevronsUpDown, Settings, LogOut } from "lucide-react"
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
import { logoutUserAction } from "@/app/actions/auth.action"
import toast from "react-hot-toast"
export function NavUser() {
    const user = useAppSelector((state) => state.user.userInfo)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [openAlert, setOpenAlert] = useState(false)

    const handleLogout = async () => {
        await logoutUserAction()
        localStorage.removeItem("user_info")
        dispatch(removeUser())
        router.push("/login")
        toast.success("Đăng xuất thành công")
    }

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton size="lg" className="hover:bg-orange-50">
                                <Avatar className="w-8 h-8 rounded-lg">
                                    <AvatarImage src={user?.avatar} />
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
                                    <AvatarImage src={user?.avatar ?? ""} />
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
                            <DropdownMenuItem className="cursor-pointer gap-2">
                                <Settings className="size-4" />
                                Cài đặt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer gap-2 text-red-500 focus:text-red-500 focus:bg-red-50"
                                onSelect={(e) => {
                                    e.preventDefault()
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
        </>
    )
}