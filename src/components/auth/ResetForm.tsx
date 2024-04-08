'use client'

import * as z from 'zod'
import { FC, useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { useForm } from 'react-hook-form'
import { ResetSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'
import { reset } from '@/actions/reset'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface ResetFormProps {

}

const ResetForm: FC<ResetFormProps> = ({ }) => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        },
    })



    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        console.log(values)

        setError('')
        setSuccess('')

        startTransition(() => {

            reset(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel='Reset your password'
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
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='johndoe@example.com'
                                            type='email'
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
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetForm