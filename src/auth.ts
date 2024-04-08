import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { User, UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation"
import { getAccountByUserId } from "./data/account"


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {

            console.log({
                user,
                account,
            })

            //Allow OAuth without email verification
            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id as string)

            //Prevent login if email is not verified
            if (!existingUser?.emailVerified) return false

            //TODO: add 2fa check
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false

                //delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }

            return true
        },
        async session({ session, token }) {
            console.log({ token })
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email as string
                session.user.isOAuth = token.isOAuth as boolean
            }

            if (token.username && session.user) {
                session.user.username = token.username as string
            }

            if (token.isTwoFactorEnabled && session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            const existingAccount = await getAccountByUserId(
                existingUser.id
            )

            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.email = existingUser.email
            //get the role
            token.role = existingUser.role
            //get the username
            token.username = existingUser.username
            //get the 2fa status
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
    debug: true
})