"use client"
import LecturerInfo from "./LecturerInfo/LecturerInfo";
import { useGetInfoLecturer } from '@/hooks/lecturer/info/useGetInfoLecturer';

export default function Info() {
    const { data: infoLecturerData } = useGetInfoLecturer();
    return (
        <div>
            {infoLecturerData && <LecturerInfo data={infoLecturerData} />}
        </div>
    )
}