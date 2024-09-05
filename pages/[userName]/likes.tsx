import Layout from '@/components/layout'
import UserLayout from '@/components/userLayout'
import type { ReactElement } from 'react'
import PhotoList from '@/components/photoList'
import MakeSomethingAwesome from '@/components/makeSomethingAwesome'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import type { RootState } from '@/store'
import Head from 'next/head';

export default function Likes() {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)
    const router = useRouter()
    const userName: string | string[] | undefined = router.query.userName

    return (
        <>
            <Head>
                <title>{userInfo.firstName} {userInfo.lastName}&apos;s Likes (@{userInfo.userName}) | Unsplash Photo Community</title>
            </Head>
            <div>
                <PhotoList onlyShowLiked showCategoryBar={false} showTitle={false} userName={userName} fullHeight={false}></PhotoList>


                <MakeSomethingAwesome></MakeSomethingAwesome>
            </div>
        </>


    )
}


Likes.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>

    )
}