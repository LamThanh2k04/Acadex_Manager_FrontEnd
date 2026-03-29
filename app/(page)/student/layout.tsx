import Footer from "./Footer";
import Header from "./Header/Header";
export default function LayoutStudent({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <header>
                <Header />
            </header>
            <main className="bg-gray-100 mt-5 min-h-screen p-5 pt-24">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}