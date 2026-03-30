import Header from "../Header/Header";

export default function StudentInfoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>{children}</main>
        </div>
    )
}