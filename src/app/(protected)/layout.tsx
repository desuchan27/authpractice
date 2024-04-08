import { FC } from 'react'
import { Navbar } from './_components/Navbar';

interface layoutProps {
    children: React.ReactNode;
}

const layout: FC<layoutProps> = ({
    children
}) => {
    return (
        <div className='h-full w-full flex flex-col gap-y-4 justify-center items-center bg-sky-500'>
            <div className='w-full mx-4 lg:mx-0 flex items-center justify-center'>
                <Navbar />
            </div>
            {children}
        </div>
    )
}

export default layout