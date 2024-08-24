
import AccountLayout from '@/components/accountLayout';
// import { useSelector } from 'react-redux';
import type { ReactElement } from 'react'
import Layout from '@/components/layout'

export default function Account({ }) {


    return (
        <div className="account">
            account
        </div>
    )
}

Account.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout inAccountPage={true}>
            <AccountLayout>{page}</AccountLayout>
        </Layout>
        
    )
  }