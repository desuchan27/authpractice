"use client"

import { FaUser } from "react-icons/fa"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"

import { useSession } from "next-auth/react"
import { UseCurrentUser } from "@/hooks/useCurrentUser"
import { DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Separator } from "../ui/separator"
import { LogOutIcon } from "lucide-react"
import { LogoutButton } from "./LogoutButton"

export const UserButton = () => {
    const user = UseCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 px-2" align="end">
                <DropdownMenuLabel className="font-semibold">{user?.name}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-light text-slate-500 text-xs">{user?.email}</DropdownMenuLabel>
                <div className="py-2">
                    <Separator />
                </div>
                <LogoutButton>
                    <DropdownMenuItem>
                        <div className="flex items-center">
                            <LogOutIcon className="h-4 w-4 mr-2" />
                            Logout
                        </div>
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}