import Image from "next/image";
import DropDownMenu from "./DropDownMenu";
import SwitchMode from "./SwitchMode";
export default function Header() {
    return (
        <div className="flex items-center justify-between fixed top-0 w-full bg-white z-50 shadow-sm p-2">
            <div className="flex items-start gap-1 p-2">
                <Image
                    src="/images/acadex-logo.jpg"
                    width={50}
                    height={50}
                    alt="Acadex Logo"
                    className="rounded-xl"
                />
                <div className="text-[#ec5d15]">
                    <h1 className="text-xl font-bold flex flex-col">Acadex <span className="text-[10px] border p-1 rounded-xl border-orange-100 text-orange-300">Học tập và không ngừng phát triển</span> </h1>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <DropDownMenu />
                <SwitchMode />
            </div>
        </div>
    )
}