import { cn } from '@/lib/utils'
import { LockKeyhole, Weight } from 'lucide-react'
import { Poppins } from 'next/font/google'
import { FC } from 'react'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
})

interface HeaderProps {
    label: string
}

const Header: FC<HeaderProps> = ({
    label
}) => {
    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
            <div className="flex space-x-4 items-center ">
                <LockKeyhole/>
                <h1 className={cn("text-3xl font-semibold", font.className,)}>
                    Auth
                </h1>
            </div>
            <p className='text-muted-foreground text-sm'>
                {label}
            </p>
        </div>
    )
}

export default Header