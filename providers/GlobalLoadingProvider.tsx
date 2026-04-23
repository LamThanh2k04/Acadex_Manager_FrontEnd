"use client";
import { useAppSelector } from "@/lib/hook";
import GlobalLoading from "../components/loading/global";

export default function GlobalLoadingProvider() {
    const isGlobalLoading = useAppSelector((state) => state.loading.isGlobalLoading);

    if (!isGlobalLoading) return null;
    return <GlobalLoading />;
}