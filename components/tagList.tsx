import {ReactNode} from 'react'

export default function TagList({ children }: {children: ReactNode}) {
    return (
        <div className="detail__tabs gap-2 flex flex-wrap">
            {children}
        </div>        
    )

}