
import AccountLayout from '@/components/accountLayout';
import type { ReactElement, ChangeEvent } from 'react'
import Layout from '@/components/layout'
import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import React, { useState, } from 'react';
import SubmitBtn from '@/components/submitBtn';
import Head from 'next/head';

export default function Password({ }) {

    const [userInfoForm, setUserInfoForm] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfoForm((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    };

    return (
        <>
            <Head>
                <title>Change password | Unsplash</title>
            </Head>

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

                        <div>
                            <FormControl fullWidth className="m-0" sx={{
                                '&.MuiFormControl-root': {
                                    margin: '0',
                                    marginBottom: '24px'
                                }
                            }} >

                                <label htmlFor="password" className="mb-2">Current password</label>
                                <OutlinedInput
                                    value={userInfoForm.password}
                                    name="password"
                                    onChange={handleChange}
                                    sx={{
                                        height: '40px',
                                        '&.Mui-focused': {
                                            border: '1px solid #111'
                                        }
                                    }}
                                    id="password" aria-describedby="password" />
                            </FormControl>
                        </div>

                        <div>
                            <FormControl fullWidth className="m-0" sx={{
                                '&.MuiFormControl-root': {
                                    margin: '0',
                                    marginBottom: '24px'
                                }
                            }} >

                                <label htmlFor="confirmPassword" className="mb-2">Password confirmation</label>
                                <OutlinedInput
                                    value={userInfoForm.confirmPassword}
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    sx={{
                                        height: '40px',
                                        '&.Mui-focused': {
                                            border: '1px solid #111'
                                        }
                                    }}
                                    id="confirmPassword" aria-describedby="confirmPassword" />
                            </FormControl>
                        </div>



                    </div>


                </div>

                <div className="submit my-8">
                    <SubmitBtn>Change Password</SubmitBtn>

                </div>
            </div>
        </>

    )
}

Password.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout inAccountPage={true}>
            <AccountLayout>{page}</AccountLayout>
        </Layout>

    )
}