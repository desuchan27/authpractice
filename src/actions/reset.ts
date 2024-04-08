"use server"

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            error: "Invalid email address!"
        }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {
            error: "Email not found!"
        }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    console.log(passwordResetToken)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return {
        success: "Email sent! Please check your inbox."
    }
}