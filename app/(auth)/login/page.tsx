import Image from "next/image";
import LoginForm from "./LoginForm";
import LoginLottie from "./LoginLottie";
export default function Login() {
    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:flex flex-1 bg-[#ec5d15] items-center justify-center">
                <LoginLottie />
            </div>
            <div className="flex-1 bg-[url(/images/background_acadex.jpg)] bg-cover min-h-screen flex items-center justify-center">
                <div className="flex items-center md:border md:py-10 md:px-20 md:rounded-xl md:bg-white/20 md:backdrop-blur-md md:border-white/30 md:shadow-xl justify-center flex-col">
                    <div className="flex items-center px-10 gap-3 mt-5">
                        <Image
                            src="/images/acadex-logo.jpg"
                            className="rounded-xl"
                            alt="Acadex"
                            width={80}
                            height={80}
                        />
                        <span className="text-[#ec5d15] font-bold text-2xl">
                            Hệ thống giáo dục <span className="font-bold">ACADEX</span>
                        </span>
                    </div>
                    <div className="mt-5 text-center">
                        <p className="text-2xl font-extrabold text-white">Chào mừng trở lại</p>
                        <p className="text-gray-200">Xin hãy điền thông tin đăng nhập của bạn</p>
                    </div>
                    <LoginForm />
                    <div className="mt-7 text-white">
                        Bạn cần hỗ trợ?{" "}
                        <span className="text-[#ec5d15] font-bold">
                            Liên hệ đội ngũ <span className="font-bold">ACADEX</span>
                        </span>
                    </div>
                    <div className="mt-7 text-white">
                        <button>RIÊNG TƯ</button>
                        <button className="ml-3 mr-3">ĐIỀU KHOẢN</button>
                        <button>HỖ TRỢ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}