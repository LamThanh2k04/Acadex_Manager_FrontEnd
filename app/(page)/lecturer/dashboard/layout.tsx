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