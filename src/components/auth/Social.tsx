import { FC } from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

interface SocialProps {

}

const Social: FC<SocialProps> = ({ }) => {

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                onClick={() =>  onClick("google")}
            >
                <FcGoogle className='h-5 w-5' />
            </Button>
            <Button
                size='lg'
                className='w-full'
                variant='outline'
                onClick={() => onClick("github")}
            >
                <BsGithub className='h-5 w-5' />
            </Button>
        </div>
    )
}

export default Social