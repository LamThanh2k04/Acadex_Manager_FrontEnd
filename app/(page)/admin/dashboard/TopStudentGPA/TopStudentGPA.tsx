"use client"
import { ITopStudent } from "@/app/types/admin/overview.type";
import { useState } from "react";
export default function TopStudentGPA({ data }: { data: ITopStudent[] }) {
    const [showAll, setShowAll] = useState(false);
    const showItems = showAll ? data : data.slice(0, 2);
    return (
        <div className="bg-white border p-6 rounded-xl border-orange-100 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="text-sm">Top sinh viên GPA cao </h1>
                <button className="flex items-center justify-center text-sm" onClick={() => setShowAll(!showAll)}>{showAll ? "Rút gọn" : `Xem tất cả (${data.length})`}</button>
            </div>
            {showItems.map((data, index) => (
                <div key={data.id} className="text-sm flex items-center justify-between mt-3 shadow-sm border border-orange-100 p-3 rounded-xl">
                    <div>
                        <h1 className="font-bold">{data.user.fullName}</h1>
                        <p className="text-gray-400">{data.studentCode} - <span>{data.gpa} GPA</span></p>
                    </div>
                    <span className={`w-7 h-7 font-bold text-sm flex items-center justify-center rounded-full
                        ${index === 0 ? "bg-orange-300 text-orange-400" : ""}
                        ${index === 1 ? "bg-yellow-300 text-yellow-600" : ""}
                        ${index === 2 ? "bg-gray-400 text-gray-700" : ""}
                        ${index > 2 ? "bg-gray-100 text-black" : ""}
                        `}>
                        #{index + 1}
                    </span>
                </div>
            ))}
        </div>
    )
}