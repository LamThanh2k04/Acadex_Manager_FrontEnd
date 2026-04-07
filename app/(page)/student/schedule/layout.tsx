import Header from "../../../../components/Header/Header";

export default function ScheduleEnrollmentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}