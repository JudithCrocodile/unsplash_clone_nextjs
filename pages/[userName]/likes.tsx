import UserLayout from '@/components/userLayout'
import type { ReactElement } from 'react'
import PhotoList from '@/components/photoList'
import MakeSomethingAwesome from '@/components/makeSomethingAwesome'
import { useSelector } from 'react-redux';
import Layout from '@/components/layout'

export default function Account() {
    const userInfo = useSelector((state: RootState) => state.user.userInfo)

    return (
        <div>
            {/* <PhotoList showCategoryBar={false} showTitle={false} authorId={userInfo._id} fullHeight={false}></PhotoList> */}


            <MakeSomethingAwesome></MakeSomethingAwesome>
        </div>

    )
}


Account.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>

    )
}