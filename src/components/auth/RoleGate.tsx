"use client"

import { useCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import FormError from "../FormError"

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

export const RoleGate = ({
    children,
    allowedRole
}: RoleGateProps) => {
    const role = useCurrentRole()

    if (role !== allowedRole) {
        return (
            <FormError
                message="You do not have permission to access this page."
            />
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}