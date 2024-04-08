'use client'

import * as z from 'zod'
import { FC, useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { useForm } from 'react-hook-form'
import { NewPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'
import { newPassword } from '@/actions/newPassword'
import { useSearchParams } from 'next/navigation'

interface NewPasswordFormProps {

}

const NewPasswordForm: FC<NewPasswordFormProps> = ({ }) => {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    })



    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        console.log(values, token)

        setError('')
        setSuccess('')

        startTransition(() => {

            newPassword(values, token).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Enter a new password'
            backButtonLabel='Back to login'
            backButtonHref='/login'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='*********'
                                            type='password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm