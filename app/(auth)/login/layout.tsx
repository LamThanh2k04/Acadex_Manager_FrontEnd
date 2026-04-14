import { ThemeProvider } from "@/components/theme-provider";

export default function LoginFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            forcedTheme="light"
            enableSystem={false}
            storageKey="portal-theme"
        >
            {children}
        </ThemeProvider>
    )
}