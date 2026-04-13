import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <div className="bg-white rounded-xl mt-5">
            <div className="p-4 md:grid md:grid-cols-3 md:gap-8 md:items-start">
                <div>
                    <p className="text-[16px] font-bold mb-2">Kết nối với chúng tôi</p>
                    <div className="space-y-1">
                        <Link href="https://www.facebook.com/acadex.edu.vn"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaFacebook size={28} className="text-blue-600" />
                            <div>
                                <p className="font-bold text-sm">Fanpage</p>
                                <p className="text-gray-400 text-[11px]">Theo dõi thông tin mới nhất</p>
                            </div>
                        </Link>
                        <Link href="https://zalo.me"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <SiZalo size={28} className="text-blue-500" />
                            <div>
                                <p className="font-bold text-sm">Zalo</p>
                                <p className="text-gray-400 text-[11px]">Liên hệ qua Zalo</p>
                            </div>
                        </Link>
                        <Link href="https://linkedin.com"
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaLinkedin size={28} className="text-blue-700" />
                            <div>
                                <p className="font-bold text-sm">LinkedIn</p>
                                <p className="text-gray-400 text-[11px]">Kết nối trên LinkedIn</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    <p className="text-[16px] font-bold mb-2">Liên hệ</p>
                    <div className="space-y-3 text-sm text-gray-500">
                        <div className="flex items-start gap-2">
                            <MapPin size={16} className="text-[#ec5d15] mt-0.5 shrink-0" />
                            <p>300A Nguyễn Tất Thành, Phường 13, Quận 12, TP. Hồ Chí Minh</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-[#ec5d15] shrink-0" />
                            <p>Hotline: <span className="text-[#ec5d15] font-bold">1900 363 618</span></p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/acadex-logo.jpg"
                            width={36}
                            height={36}
                            alt="Acadex Logo"
                            className="rounded-xl"
                        />
                        <span className="text-[#ec5d15] font-bold text-xl uppercase">Acadex</span>
                    </div>
                    <p className="text-xs text-gray-400 md:text-right">
                        Hệ thống quản lý giáo dục.<br />
                        Nơi chia sẻ tri thức và phát triển kỹ năng.
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t text-[10px] text-gray-400 p-3 text-center">
                <p>© 2026 Acadex - Hệ thống quản lý giáo dục. Nơi chia sẻ tri thức và phát triển kỹ năng.</p>
            </div>
        </div>
    )
}