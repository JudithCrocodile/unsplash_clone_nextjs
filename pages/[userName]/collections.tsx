import Layout from '@/components/layout'
import UserLayout from '@/components/userLayout'
import type { ReactElement } from 'react'
import Head from 'next/head';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'

export default function Collection() {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    return (
        <>
            <Head>
                <title>{userInfo.firstName} {userInfo.lastName}&apos;s Collections (@{userInfo.userName}) | Unsplash Photo Community</title>
            </Head>
            <div>
            </div>

        </>


    )
}


Collection.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>

    )
}