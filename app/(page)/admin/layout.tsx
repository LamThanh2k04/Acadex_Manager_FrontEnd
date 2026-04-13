import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import Header from './Header'
import { Suspense } from "react"
import { AppSidebarAdmin } from '@/app/(page)/admin/app-sidebar-admin';
export default async function LayoutAdmin({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookieStore = await cookies();
    const sidebarOpen = cookieStore.get("sidebar:state")?.value === "true";
    return (
        <SidebarProvider defaultOpen={sidebarOpen}>
            <Suspense fallback={
                <div className="hidden md:block w-50 bg-white rounded-xl mr-3" />
            }>
                <AppSidebarAdmin />
            </Suspense>
            <SidebarInset>
                <header>
                    <Header />
                </header>
                <main className='bg-gray-100 min-h-screen'>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider >
    )
}