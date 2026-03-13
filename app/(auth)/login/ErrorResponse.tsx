import type { FieldError } from 'react-hook-form'

interface IErrorMsgProps {
    error?: FieldError; // Kiểu dữ liệu lỗi lấy từ RHF
}
const ErrorResponse = ({ error }: IErrorMsgProps) => {
    if (!error) return
    return (
        <div className='text-red-400 mt-4'>{error.message}</div>
    )
}

export default ErrorResponse