
import Footer from '@/components/footer';
import type { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

export default function AccountLayout({ children }) {
    const router = useRouter()

    const [pathData, setPathData] = useState<object[]>([
        {
            value: '0',
            path: '/account',
            active: false,
            label: 'Edit profile'
        },
        {
            value: '1',
            path: '/account/history',
            active: false,
            label: 'Download history'
        },
        {
            value: '2',
            path: '/account/password',
            active: false,
            label: 'Change password'
        },
        {
            value: '3',
            path: '/account/close',
            active: false,
            label: 'Close account'
        },
    ])


    useEffect(() => {
        const newPathData = [...pathData]
        newPathData.forEach(path => {
            if (router.pathname === path.path) {
                path.active = true
            } else {
                path.active = false
            }

        })
        setPathData(newPathData)

    }, [router])

    return (
        <div className="account-layout">
            <div className="flex px-3 py-[45px]">
                <div className="menu w-1/3 md:w-1/4">
                    <h3 className="mb-[30px] font-bold text-lg">Account settings</h3>
                    <ul className="flex flex-col gap-4">
                        {
                            pathData.map(path => (
                                <li key={path.path}><Link className={`${path.active ? 'cursor-default' : 'text-slate-500 underline cursor-pointer'}`} href={path.path}>{path.label}</Link></li>
                            ))
                        }
                    </ul>

                </div>
                <div className="account-body">
                    {children}
                </div>
            </div>


            <Footer></Footer>
        </div>
    )
}