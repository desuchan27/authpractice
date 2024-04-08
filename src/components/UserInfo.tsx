import { ExtendedUser } from '@/next-auth'
import { FC } from 'react'
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

const UserInfo: FC<UserInfoProps> = ({
    user,
    label,
}) => {
    return (
        <Card className='w-full bg-secondary mx-2 shadow-sm md:w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    {label}
                </p>
            </CardHeader>
            <CardContent className='space-y-4'>

                <div
                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p className='font-medium text-sm'>
                        ID
                    </p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md'>
                        {user?.id}
                    </p>
                </div>

                <div
                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p className='font-medium text-sm'>
                        Name
                    </p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md'>
                        {user?.name}
                    </p>
                </div>

                <div
                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p className='font-medium text-sm'>
                        Email
                    </p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md'>
                        {user?.email}
                    </p>
                </div>

                <div
                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p className='font-medium text-sm'>
                        Username
                    </p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md'>
                        {user?.username || 'undefined'}
                    </p>
                </div>

                <div
                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p className='font-medium text-sm'>
                        Two factor enabled
                    </p>
                    <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
                        {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
                    </Badge>
                </div>

                <div
                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <p className='font-medium text-sm'>
                        Role
                    </p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-200 rounded-md'>
                        {user?.role}
                    </p>
                </div>

            </CardContent>
        </Card>
    )
}

export default UserInfo