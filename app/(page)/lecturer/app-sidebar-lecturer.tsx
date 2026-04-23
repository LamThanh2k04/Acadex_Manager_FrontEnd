"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, School, ContactRound, Notebook, ClipboardClock, Minus, Plus, } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarFooter
} from "@/components/ui/sidebar"
import Image from 'next/image';
import Link from "next/link";
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation";
const data = {
    navMain: [
        {
            label: "Tổng quan hệ thống",
            items: [
                { label: "Hệ thống", href: "/lecturer/dashboard", icon: LayoutDashboard },
            ]
        },
        {
            label: "Thông tin cá nhân",
            items: [
                { label: "Thông tin", href: "/lecturer/info", icon: ContactRound },
            ]
        },
        {
            label: "Quản lý lớp học phần",
            items: [
                { label: "Lớp học", href: "/lecturer/class", icon: School },
                { label: "Học phần", href: "/lecturer/courseSection", icon: Notebook },
            ]
        },
        {
            label: "Quản lý lịch",
            items: [
                { label: "Lịch dạy", href: "/lecturer/schedule", icon: ClipboardClock },
            ]
        },
    ],
}
export function AppSidebarLecturer({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathName = usePathname();
    const NavUser = dynamic(
        () => import("../../../components/NavUser").then(m => m.NavUser),
        { ssr: false }
    )
    return (
        <Sidebar style={{ height: "100vh", position: "sticky", width: "200px", top: 0 }} className="rounded-xl bg-white mr-3 dark:bg-[#232946] transition-colors duration-300 hidden md:flex" collapsible="none" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image
                                        src="/images/acadex-logo.jpg"
                                        className="rounded-xl"
                                        alt="Acadex Logo"
                                        width={70}
                                        height={70}
                                        loading="eager"
                                    />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[#ec5d15] font-bold text-xl uppercase">Acadex</span>
                                    <span className="text-xs text-muted-foreground">Giảng viên</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item, index) => (
                            <Collapsible
                                key={item.label}
                                defaultOpen={index === 0}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            {item.label}
                                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {item.items?.length ? (
                                        <CollapsibleContent
                                            id={`sidebar-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                                        >
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.label}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link
                                                                href={subItem.href}
                                                                className={cn(
                                                                    "flex items-center gap-2",
                                                                    pathName === subItem.href && "bg-orange-300 hover:bg-orange-500"
                                                                )}
                                                            >
                                                                <subItem.icon className="size-4" />
                                                                <span>{subItem.label}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-orange-100 p-2">
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
