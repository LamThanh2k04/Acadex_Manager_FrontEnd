import AdminBottomNav from "./AdminBottomNav";
export default function LayoutAdmin({ children }: Readonly<({ children: React.ReactNode })>) {
    return (
        <div>
            <aside>

            </aside>
            <main>
                {children}
            </main>
            <nav>
                <AdminBottomNav />
            </nav>
        </div>
    )
}