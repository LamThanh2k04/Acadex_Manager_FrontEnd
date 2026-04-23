"use client";
import Lottie from "lottie-react";
import animationData from "@/public/animations/acadex_intro.json";

export default function LoginLottie() {
    return (
        <div className="hidden lg:flex flex-col items-center justify-center w-full h-full px-10">
            <Lottie
                animationData={animationData}
                loop={true}
                className="w-full max-w-[480px]"
            />
            <p className="text-white text-2xl font-bold mt-4 text-center">
                Nền tảng giáo dục thông minh
            </p>
            <p className="text-white/70 text-sm mt-2 text-center">
                Quản lý học tập hiệu quả, mọi lúc mọi nơi
            </p>
        </div>
    );
}