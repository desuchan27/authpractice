import UserInfo from '@/components/UserInfo'
import { currentUser } from '@/lib/auth'
import { FC } from 'react'

const page = async () => {

    const user = await currentUser()

    return (
        <div>
            <UserInfo
                user={user}
                label='Server component'
            />
        </div>
    )
}

export default page