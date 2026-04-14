"use client"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
export default function SwitchMode() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    const isDark = theme === "dark"
    return (
        <div className="flex items-center space-x-2">
            <SwitchPrimitives.Root
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                className={cn(
                    "peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                    isDark ? "bg-black" : "bg-orange-100"
                )}
            >
                <SwitchPrimitives.Thumb asChild>
                    <motion.div
                        animate={{ x: isDark ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg ring-0"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isDark ? (
                                <motion.div
                                    key="moon"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Moon className="h-4 w-4 text-slate-900 fill-slate-900" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="sun"
                                    initial={{ scale: 0, rotate: 90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Sun className="h-4 w-4 text-orange-500 fill-orange-500" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </SwitchPrimitives.Thumb>
            </SwitchPrimitives.Root>
        </div>
    )
}