import NavBottom from "@/components/nav-bottom";
import { cookies } from 'next/headers'
import Header from "./components/Header/Header";
import { AppSidebarLecturer } from "./app-sidebar-lecturer";
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from "@/components/theme-provider";
export default async function LayoutLecturer({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookieStore = await cookies();
    const sidebarOpen = cookieStore.get("sidebar:state")?.value === "true";
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
        >
            <SidebarProvider defaultOpen={sidebarOpen}>
                <AppSidebarLecturer />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="min-h-screen pt-15 md:p-3 md:pt-0 pb-16 md:pb-0 bg-gray-100">
                        {children}
                    </main>
                </div>
                <NavBottom />
            </SidebarProvider>
        </ThemeProvider>
    )
}
