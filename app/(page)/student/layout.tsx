import { ThemeProvider } from "@/components/theme-provider";
import ChatBox from "./components/ChatBox/ChatBox";

export default function LayoutStudent({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
        >
            <main className="bg-gray-100 min-h-screen pt-15 relative">
                {children}
                <ChatBox />
            </main>
        </ThemeProvider>
    )
}
