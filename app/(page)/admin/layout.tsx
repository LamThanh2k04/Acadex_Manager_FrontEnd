export default function LayoutAdmin({ children }: Readonly<({ children: React.ReactNode })>) {
    return (
        <div>
            <aside></aside>
            <main>
                {children}
            </main>
        </div>
    )
}