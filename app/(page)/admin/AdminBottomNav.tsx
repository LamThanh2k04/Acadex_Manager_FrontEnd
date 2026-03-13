"use client"
import { useAppSelector } from "@/lib/hook"
export default function AdminBottomNav() {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <div >

        </div>
    )
}