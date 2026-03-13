import { LogIn, Loader } from 'lucide-react';
import { IPending } from "@/app/types/pending.type";

export default function ButtonLoginForm({ isPending }: IPending) {
    return (
        <button
            type="submit"
            disabled={isPending}
            className='border-2 w-80 p-3 text-white bg-[#ec5d15] hover:bg-orange-500 cursor-pointer duration-300 transition mt-5 rounded-xl flex font-bold text-xl items-center justify-center gap-2'
        >
            {isPending ? (
                <>
                    <Loader className="animate-spin mr-3 size-5" />
                    Đang đăng nhập
                </>
            ) : (
                <>
                    Đăng nhập <span><LogIn /></span>
                </>
            )}
        </button>
    )
}