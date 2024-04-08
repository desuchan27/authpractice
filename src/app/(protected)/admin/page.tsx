import { AdminPage } from '@/components/protected/admin/AdminPage'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <div className="w-full px-2 flex justify-center items-center">
            <AdminPage />
        </div>
    )
}

export default page