'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { useAppDispatch } from '@/lib/hook'
import { setUser } from '@/lib/features/user/userSlice'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }
    useEffect(() => {
        const savedUser = localStorage.getItem("user_info")
        if (savedUser && storeRef.current) {
            try {
                const userData = JSON.parse(savedUser)
                storeRef.current.dispatch(setUser(userData))
            } catch (error) {
                console.error("Lỗi đọc LocalStorage:", error)
            }
        }
    }, [])
    return <Provider store={storeRef.current}>{children}</Provider>
}