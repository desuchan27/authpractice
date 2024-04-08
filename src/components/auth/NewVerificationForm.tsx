"use client"

import { FC, useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import CardWrapper from './CardWrapper'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/newVerificaiton'
import FormSuccess from '../FormSuccess'
import FormError from '../FormError'

interface NewVerificationFormProps {

}

const NewVerificationForm: FC<NewVerificationFormProps> = ({ }) => {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const onsubmit = useCallback(() => {

        if (!token) {
            setError('Invalid/Missing token')
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError('Something went wrong')
            })



    }, [token])

    useEffect(() => {
        onsubmit()
    }, [onsubmit])

    return (
        <CardWrapper
            headerLabel='Confirming your verification'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login'
        >
            <div className="flex tiems-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm