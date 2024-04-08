"use client"

import UserInfo from '@/components/UserInfo'
import { UseCurrentUser } from '@/hooks/useCurrentUser'

const page = () => {

    const user = UseCurrentUser()

    return (
        <div>
            <UserInfo
                label='Client component'
                user={user}
            />
        </div>
    )
}

export default page