import NavBottom from "@/components/nav-bottom";
import Header from "./components/Header/Header";
export default function LayoutLecturer({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main className="min-h-screen pt-15 bg-gray-100">
                {children}
            </main>
            <NavBottom />
        </div>
    )
}