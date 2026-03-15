import { IStudentManagerProps } from '@/app/types/admin/student.type';
import { Pencil, LockKeyhole, UserRoundPlus, Settings } from 'lucide-react';
import StudentSearchBar from './StudentSearchBar';
export default function StudentTable({ data }: IStudentManagerProps) {
    console.log(data);
    const statusRender = {
        "STUDYING": <span className="bg-green-400 p-2 rounded-2xl text-green-50">Đang học</span>,
        "GRADUATE": <span className="bg-yellow-400 p-2 rounded-2xl text-orange-50">Đã tốt nghiệp</span>,
        "TRUANT": <span className="bg-red-500 p-2 rounded-2xl text-red-50">Đã bảo lưu</span>
    }
    return (
        <div className="mt-5 p-5 border rounded-2xl w-[98%]">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold">Danh sách sinh viên</h1>
                <div className="flex items-center justify-center gap-3">
                    <StudentSearchBar />
                    <button className="border-none hover:bg-orange-400 cursor-pointer hover:text-white transition duration-500 p-2 rounded-full bg-orange-100 text-gray-400 text-sm"><UserRoundPlus /></button>
                </div>
            </div>
            <table className="w-full border-separate border border-gray-100 border-spacing-0 rounded-xl overflow-hidden ">
                <thead className="bg-orange-100 text-gray-500 uppercase text-sm tracking-wide">
                    <tr className="h-12.5 text-center font-medium rounded-tl-xl">
                        <th>Họ tên</th>
                        <th>Khoa</th>
                        <th>Ngành</th>
                        <th>Giảng viên đảm nhiệm</th>
                        <th>Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.students.map((st) => (
                        <tr key={st.student.id} className="h-12.5 text-center hover:bg-orange-50 transition-all duration-500">
                            <td className="flex flex-col justify-center mt-3">{st.fullName} <span className="text-sm text-gray-400">{st.student.studentCode}</span></td>
                            <td>{st.student.faculty.name}</td>
                            <td>{st.student.major.name}</td>
                            <td>{st.student.class.homeroomLecturer.user.fullName}</td>
                            <td>{statusRender[st.student.status] ?? <span className="bg-gray-500">{st.student.status}</span>}</td>
                            <td className="text-center">
                                <button className=""><LockKeyhole className="text-gray-300 hover:text-red-400 cursor-pointer duration-300 transition-all mr-2" /></button>
                                <button><Pencil className="text-gray-300 hover:text-blue-400 cursor-pointer duration-300 transition-all" /></button>
                                <button><Settings className="text-gray-300 hover:text-gray-500 ml-2 cursor-pointer duration-300 transition-all" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}