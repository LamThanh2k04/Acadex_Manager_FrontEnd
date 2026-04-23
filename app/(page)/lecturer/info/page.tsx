"use client"
import LecturerInfo from "./LecturerInfo/LecturerInfo";
import { useGetInfoLecturer } from '@/hooks/lecturer/info/useGetInfoLecturer';
import InfoLoading from "./loading";

export default function Info() {
    const { data: infoLecturerData, isLoading: isLoadingInfoLecturer } = useGetInfoLecturer();
    if (isLoadingInfoLecturer) {
        return (
            <InfoLoading />
        )
    }
    return (
        <div className="mt-3">
            {infoLecturerData && <LecturerInfo data={infoLecturerData} />}
        </div>
    )
}