// app/(page)/admin/layout.tsx
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import Header from './Header'

export default async function LayoutAdmin({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookieStore = await cookies()
    const sidebarOpen = cookieStore.get("sidebar:state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={sidebarOpen}>
            <AppSidebar />
            <SidebarInset>
                <header>
                    <Header />
                </header>
                <main className='md:bg-gray-50'>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider >
    )
}