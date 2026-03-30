import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
export default function Footer() {
    return (
        <div className="bg-white rounded-xl mt-5">
            <div className="p-2 text-sm">
                <p className="text-[16px] font-bold">Kết nối với chúng tôi</p>
                <div>
                    <Link href="https://www.facebook.com/acadex.edu.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <FaFacebook size={35} className="text-blue-600" />
                        <div>
                            <p className="font-bold">Fanpage</p>
                            <p className="text-gray-400 text-[11px]">Theo dõi thông tin mới nhất từ chúng tôi</p>
                        </div>
                    </Link>
                    <Link href="https://www.facebook.com/acadex.edu.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <SiZalo size={35} className="text-blue-500" />
                        <div>
                            <p className="font-bold">Zalo</p>
                            <p className="text-gray-400 text-[11px]">Liên hệ với chúng tôi qua Zalo</p>
                        </div>
                    </Link>
                    <Link href="https://www.facebook.com/acadex.edu.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <FaLinkedin size={35} className="text-blue-700" />
                        <div>
                            <p className="font-bold">LinkedIn </p>
                            <p className="text-gray-400 text-[11px]">Kết nối với chúng tôi trên LinkedIn</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="p-2 text-gray-500 text-sm">
                <p>300A Nguyễn Tất Thành, Phường 13, Quận 12, TP. Hồ Chí Minh</p>
                <p>Hotline: <span className="text-[#ec5d15] font-bold">1900 363 618</span></p>
            </div>
            <div className="border-t text-[10px] text-gray-400 p-2 text-center">
                <p>© 2026 Acadex - Hệ thống quản lý giáo dục. Nơi chia sẻ tri thức và phát triển kỹ năng.</p>
            </div>
        </div>
    )
}