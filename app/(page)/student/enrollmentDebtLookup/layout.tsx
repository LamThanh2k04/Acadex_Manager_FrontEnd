import Header from "../Header/Header";

export default function EnrollmentDebtLookupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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