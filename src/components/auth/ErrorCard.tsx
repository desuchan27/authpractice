import { FC } from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import Header from './Header'
import BackButton from './BackButton'

interface ErrorCardProps {
  
}

const ErrorCard: FC<ErrorCardProps> = ({}) => {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label='Oops! Something Went Wrong!'/>
        </CardHeader>
        <CardFooter>
            <BackButton
                label='Go Back to Login' 
                href='/login'
            />
        </CardFooter>
    </Card>
    )
}

export default ErrorCard