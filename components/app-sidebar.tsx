import * as React from "react"
import { Minus, Plus, LayoutDashboard, Users, GraduationCap, Building2, BookOpen, BookCopy, School, Award, MapPin, DoorOpen, Clock, CalendarDays, ClipboardCheck, ClipboardList, Bell, LibraryBig, ClipboardClock } from 'lucide-react';
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
import { NavUser } from "./nav-user";
const data = {
  navMain: [
    {
      label: "Tổng quan hệ thống",
      items: [
        { label: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard },
      ]
    },
    {
      label: "Con người",
      items: [
        { label: "Sinh viên", href: "/admin/students", icon: GraduationCap },
        { label: "Giảng viên", href: "/admin/lecturers", icon: Users },
      ]
    },
    {
      label: "Học thuật",
      items: [
        { label: "Khoa", href: "/admin/faculties", icon: Building2 },
        { label: "Ngành", href: "/admin/majors", icon: BookOpen },
        { label: "Lớp", href: "/admin/classes", icon: School },
        { label: "Môn học", href: "/admin/subjects", icon: BookCopy },
        { label: "Học phần", href: "/admin/courses", icon: LibraryBig },
        { label: "Chương trình học", href: "/admin/programs", icon: GraduationCap },
        { label: "Chứng chỉ", href: "/admin/certifications", icon: Award },
        { label: "Học kỳ", href: "/admin/semesters", icon: CalendarDays },
      ]
    },
    {
      label: "Cơ sở vật chất",
      items: [
        { label: "Cơ sở", href: "/admin/buildings", icon: MapPin },
        { label: "Phòng", href: "/admin/rooms", icon: DoorOpen },
      ]
    },
    {
      label: "Thời khóa biểu",
      items: [
        { label: "Tiết học", href: "/admin/periods", icon: Clock },
        { label: "Lịch thi", href: "/admin/exams", icon: ClipboardList },
        { label: "Lịch học", href: "/admin/schedules", icon: ClipboardClock },
      ]
    },
    {
      label: "Quản lý khác",
      items: [
        { label: "Điểm danh", href: "/admin/attendances", icon: ClipboardCheck },
        { label: "Thông báo", href: "/admin/notifications", icon: Bell },
      ]
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar style={{ height: "100vh", position: "sticky", width: "200px", top: 0 }} className="rounded-xl bg-white hidden md:flex" collapsible="none" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src="/images/acadex-logo.jpg"
                    className="rounded-xl"
                    alt="Acadex Logo"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-[#ec5d15] font-bold text-sm uppercase">Acadex</span>
                  <span className="">Admin</span>
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
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.label}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.label}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.href} className="flex items-center gap-2">
                                <item.icon className="size-4" />
                                <span>{item.label}</span>
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
