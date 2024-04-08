'use client'

import { CheckCircle } from 'lucide-react'
import { FC } from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'

interface FormSuccessProps {
    message?: string
}

const FormSuccess: FC<FormSuccessProps> = ({
    message
}) => {

    if (!message) return null


    return (
        <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerad-500'>
            <CheckCircle />
            <p>{message}</p>
        </div>
    )
}

export default FormSuccess