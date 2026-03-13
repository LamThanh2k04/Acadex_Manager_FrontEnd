import Image from "next/image";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="bg-[url(/bg-login-mobile.png)] min-h-screen flex items-center justify-center">
            <div className="flex items-center md:border md:p-10 md:rounded-xl md:border-gray-200 md:shadow-2xl justify-center  flex-col">
                <div className="flex items-center gap-3 mt-5">
                    <Image
                        src="/acadex-logo.jpg"
                        className="rounded-xl"
                        alt="Acadex"
                        width={60}
                        height={60}
                    />
                    <span className="text-[#ec5d15] font-bold text-xl">Hệ thống giáo dục <span className="font-bold">ACADEX</span></span>
                </div>
                <div className="mt-5 text-center">
                    <p className="text-2xl font-extrabold">Chào mừng trở lại</p>
                    <p className="text-[#8c95a8]">Xin hãy điền thông tin đăng nhập của bạn</p>
                </div>
                <LoginForm />
                <div className="mt-7">
                    Bạn cần hỗ trợ? <span className="text-[#ec5d15] font-bold">Liên hệ đội ngũ <span className="font-bold  ">ACADEX</span></span>
                </div>
                <div className="mt-7 text-[#8c95a8]">
                    <button>RIÊNG TƯ</button>
                    <button className="ml-3 mr-3">ĐIỀU KHOẢN</button>
                    <button>HỖ TRỢ</button>
                </div>
            </div>
        </div>
    )
}