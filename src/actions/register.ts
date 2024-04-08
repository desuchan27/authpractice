'use server'

import bcrypt from 'bcryptjs'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import { db } from '@/lib/db'
import { getUserByEmail, getUserByUsername } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' }
    }

    const { email, username, name, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)


    const existingEmail = await getUserByEmail(email)
    const existingUsername = await getUserByUsername(username)

    if (existingEmail) {
        return { error: 'Email is already in use!' }
    }

    if (existingUsername) {
        return { error: 'Username is already in use!' }
    }


    await db.user.create({
        data: {
            email,
            username,
            name,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email)

    //Send email confirmation
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )
    return { success: 'Confirmation email sent!' }

}