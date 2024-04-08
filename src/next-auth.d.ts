import { User, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
    username: string
    isTwoFactorEnabled: boolean
    isOAuth: boolean
}

declare module "next-auth" {
    interface Session {
        user: {
            username: string
            role: UserRole
            isTwoFactorEnabled: boolean
            isOAuth: boolean
        } & DefaultSession["user"]
    }
}