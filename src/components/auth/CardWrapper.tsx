'use client'

import { FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Header from './Header'
import Social from './Social'
import BackButton from './BackButton'

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

const CardWrapper: FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel} 
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper