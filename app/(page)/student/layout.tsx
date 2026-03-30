export default function LayoutStudent({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <main className="bg-gray-100 min-h-screen pt-15">
                {children}
            </main>
        </>
    )
}