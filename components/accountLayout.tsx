
import Footer from '@/components/footer';
import type { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect, ReactNode } from 'react'

interface IPath {
    value: string,
    path: string,
    active: boolean,
    label: string,
    title: string,
}

export default function AccountLayout({ children }: {children: ReactNode}) {
    const router = useRouter()

    const [title, setTitle] = useState<string>('')
    const [pathData, setPathData] = useState<IPath[]>([
        {
            value: '0',
            path: '/account',
            active: false,
            label: 'Edit profile',
            title: 'Edit profile',
        },
        // {
        //     value: '1',
        //     path: '/account/history',
        //     active: false,
        //     label: 'Download history',
        //     title: 'Download history',
        // },
        {
            value: '2',
            path: '/account/password',
            active: false,
            label: 'Change password',
            title: 'Change password',
        },
        // {
        //     value: '3',
        //     path: '/account/close',
        //     active: false,
        //     label: 'Close account',
        //     title: 'Close account',
        // },
    ])


    useEffect(() => {
        const newPathData = [...pathData]
        newPathData.forEach(path => {
            if (router.pathname === path.path) {
                path.active = true
                setTitle(path.title)
            } else {
                path.active = false
            }

        })
        setPathData(newPathData)

    }, [router])

    return (
        <div className="account-layout">
            <div className="flex px-6 py-[45px] flex-col md:flex-row">
                <div className="menu w-1/3 md:w-1/4 pb-9 md:pb-0">
                    <h3 className="mb-[30px] font-bold text-lg">Account settings</h3>
                    <ul className="flex flex-col gap-4">
                        {
                            pathData.map(path => (
                                <li key={path.path}><Link className={`${path.active ? 'cursor-default' : 'text-gray-500 underline cursor-pointer'}`} href={path.path}>{path.label}</Link></li>
                            ))
                        }
                    </ul>

                </div>
                <div className="account-body px-3 flex-1">
                    <h1 className="font-bold text-lg mb-8">{title}</h1>
                    {children}
                </div>
            </div>


            <Footer></Footer>
        </div>
    )
}