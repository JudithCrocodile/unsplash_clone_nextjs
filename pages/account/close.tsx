
import AccountLayout from '@/components/accountLayout';
import type { ReactElement, ChangeEvent } from 'react'
import Layout from '@/components/layout'
import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import React, { useState, } from 'react';
import SubmitBtn from '@/components/submitBtn';

export default function Close({ }) {

    const [userInfoForm, setUserInfoForm] = useState({
        currentPassword: '',
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfoForm((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    };

    return (
        <div className="account">
            <div className="info flex gap-8">
                <div className="info__info flex-1 w-full">

                    <div>
                        <FormControl fullWidth className="m-0" sx={{
                            '&.MuiFormControl-root': {
                                margin: '0',
                                marginBottom: '24px'
                            }
                        }} >

                            <label htmlFor="Current password" className="mb-2">Current password</label>
                            <OutlinedInput
                                value={userInfoForm.currentPassword}
                                name="currentPassword"
                                onChange={handleChange}
                                sx={{
                                    height: '40px',
                                    '&.Mui-focused': {
                                        border: '1px solid #111'
                                    }
                                }}
                                id="currentPassword" aria-describedby="currentPassword" />
                        </FormControl>
                    </div>

                </div>


            </div>

            <div className="submit my-8">
                <SubmitBtn>Delete account</SubmitBtn>

            </div>
        </div>
    )
}

Close.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout inAccountPage={true}>
            <AccountLayout>{page}</AccountLayout>
        </Layout>

    )
}