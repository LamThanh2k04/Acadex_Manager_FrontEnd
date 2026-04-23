"use client";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
                <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-32 h-32"
                />
                <p className="text-sm text-gray-500 dark:text-white">Đang xử lý...</p>
            </div>
        </div>
    );
}