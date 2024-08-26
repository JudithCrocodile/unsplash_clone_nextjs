import React, { ReactNode } from 'react'

export default function EmptyLayout({ children }: {children: ReactNode}) {



    return (
        <div>
            <main>{children}</main>
        </div>
    )
}