import NavBottom from "@/components/nav-bottom";
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Title />
            <main>
                {children}
            </main>
        </>
    )
}