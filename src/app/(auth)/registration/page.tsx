import LoginForm from '@/components/auth/LoginForm'
import RegistrationForm from '@/components/auth/RegistrationForm'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return ( 
    <div>
        <RegistrationForm/>
    </div>
    )
}

export default page