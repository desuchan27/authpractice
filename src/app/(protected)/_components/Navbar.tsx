"use client"

import { UserButton } from '@/components/auth/UserButton'
import { Button } from '@/components/ui/button'
import { UseCurrentUser } from '@/hooks/useCurrentUser'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface NavbarProps {

}

export const Navbar: FC<NavbarProps> = ({ }) => {

    const pathName = usePathname()
    const session = useSession()

    return (
        <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-full mx-2 shadow-sm md:w-[600px]'>
            <div className="flex gap-x-2">
                {/*server*/}
                <Button
                    asChild
                    variant={pathName === "/server" ? "default" : "outline"}
                >
                    <Link href='/server'>
                        Server
                    </Link>
                </Button>

                {/*client*/}
                <Button
                    asChild
                    variant={pathName === "/client" ? "default" : "outline"}
                >
                    <Link href='/client'>
                        Client
                    </Link>
                </Button>

                {/*admin*/}
                <Button
                    asChild
                    variant={pathName === "/admin" ? "default" : "outline"}
                >
                    <Link href='/admin'>
                        Admin
                    </Link>
                </Button>

                {/*settings*/}
                <Button
                    asChild
                    variant={pathName === "/settings" ? "default" : "outline"}
                >
                    <Link href='/settings'>
                        Settings
                    </Link>
                </Button>
            </div>

            <UserButton />

        </nav>
    )
}