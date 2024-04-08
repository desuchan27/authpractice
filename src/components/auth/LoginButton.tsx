'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton: FC<LoginButtonProps> = ({
    children,
    mode = 'redirect',
    asChild
}) => {

    const router = useRouter()

    const onClick = () => {
        router.push('/login')
    }

    if (mode === 'modal') {
        return (
            <span>
                Modal Work in Progress
            </span>
        )
    }

  return (
    <span onClick={onClick} className='cursor-pointer'>
        {children}
    </span>
    )
}

export default LoginButton