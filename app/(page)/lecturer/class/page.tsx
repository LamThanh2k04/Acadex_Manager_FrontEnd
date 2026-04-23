"use client"
import { useGetHomeroomClass } from '@/hooks/lecturer/homeroomClass/useGetHomeroomClass';
import { useSearchParams } from 'next/navigation';
import HomeroomClass from './HomeroomClass/HomeroomClass';
import ClassLoading from './loading';
export default function Class() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const { data: homeroomClassData, isLoading: isLoadingHomeroomClass } = useGetHomeroomClass(search, page)
    if (isLoadingHomeroomClass) {
        return (
            <ClassLoading />
        )
    }
    return (
        <div>
            {homeroomClassData && <HomeroomClass data={homeroomClassData} />}
        </div>
    )
}