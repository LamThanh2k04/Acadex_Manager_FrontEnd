import Image from "next/image";
import LoginForm from "./LoginForm";
export default function Login() {
    return (
        <div className="bg-[url(/images/bg-login-mobile.png)] min-h-screen flex items-center justify-center w-full light">
            <div className="flex items-center md:border md:py-10 md:px-20 md:rounded-xl md:border-gray-200 md:shadow-2xl justify-center flex-col">
                <div className="flex items-center px-10 gap-3 mt-5">
                    <Image
                        src="/images/acadex-logo.jpg"
                        className="rounded-xl"
                        alt="Acadex"
                        width={80}
                        height={80}
                    />
                    <span className="text-[#ec5d15] font-bold text-2xl">Hệ thống giáo dục <span className="font-bold">ACADEX</span></span>
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