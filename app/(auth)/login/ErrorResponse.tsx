import type { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'

interface IErrorMsgProps {
    error?: FieldError;
}
const ErrorResponse = ({ error }: IErrorMsgProps) => {
    if (!error) return null;
    return (
        <div className='flex items-center gap-1.5 text-red-500 text-xs mt-1'>
            <AlertCircle className='size-3.5 shrink-0' />
            <span>{error.message}</span>
        </div>
    )
}
export default ErrorResponse