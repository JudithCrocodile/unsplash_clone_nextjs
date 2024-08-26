
import AccountLayout from '@/components/accountLayout';
// import { useSelector } from 'react-redux';
import type { ReactElement, ChangeEvent } from 'react'
import Layout from '@/components/layout'
import AvatarComponent from "@/components/avatar";
import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import React, { useState, } from 'react';
import { useSelector } from 'react-redux';
import SubmitBtn from '@/components/submitBtn';

export default function Account({ }) {

    const userInfo = useSelector((state: RootState) => state.user.userInfo)

    const [userInfoForm, setUserInfoForm] = useState({
        email: userInfo.email,
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
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
                <div className="info__avatar cursor-pointer px-3 w-2/6 flex justify-start flex-col items-center">
                    <AvatarComponent size={'128px'}></AvatarComponent>

                    <p className="underline my-4 text-xs text-slate-400">Change profile image</p>

                </div>
                <div className="info__info flex-1 w-4/6">
                    <div className='flex gap-8'>
                        <FormControl fullWidth className="m-0" sx={{
                            '&.MuiFormControl-root': {
                                margin: '0',
                                marginBottom: '24px'
                            }
                        }} >
                            <label htmlFor="First name" className="mb-2">Last name</label>
                            <OutlinedInput
                                value={userInfoForm.firstName}
                                name="firstName"
                                onChange={handleChange}
                                sx={{
                                    height: '40px',
                                    '&.Mui-focused': {
                                        border: '1px solid #111'
                                    }
                                }}
                                id="firstName" aria-describedby="firstName" />
                        </FormControl>
                        <FormControl fullWidth className="m-0" sx={{
                            '&.MuiFormControl-root': {
                                margin: '0',
                                marginBottom: '24px'
                            }
                        }} >
                            <label htmlFor="Last name" className="mb-2">Last name</label>
                            <OutlinedInput
                                value={userInfoForm.lastName}
                                name="lastName"
                                onChange={handleChange}
                                sx={{
                                    height: '40px',
                                    '&.Mui-focused': {
                                        border: '1px solid #111'
                                    }
                                }}
                                id="lastName" aria-describedby="lastName" />
                        </FormControl>
                    </div>

                    <div>
                        <FormControl fullWidth className="m-0" sx={{
                            '&.MuiFormControl-root': {
                                margin: '0',
                                marginBottom: '24px'
                            }
                        }} >

                            <label htmlFor="Email" className="mb-2">Email</label>
                            <OutlinedInput
                                value={userInfoForm.email}
                                name="email"
                                onChange={handleChange}
                                sx={{
                                    height: '40px',
                                    '&.Mui-focused': {
                                        border: '1px solid #111'
                                    }
                                }}
                                id="email" aria-describedby="email" />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth className="m-0" sx={{
                            '&.MuiFormControl-root': {
                                margin: '0',
                                marginBottom: '24px'
                            }
                        }} >
                            <div>
                                <div className="flex">
                                    <label htmlFor="Username" className="mb-2">Username</label>
                                    <FormHelperText id="forget-password-text" className="mr-0">
                                        <span>(only letters, numbers and underscores)</span>
                                    </FormHelperText>
                                </div>
                            </div>

                            <OutlinedInput
                                value={userInfoForm.userName}
                                name="userName"
                                onChange={handleChange}
                                sx={{
                                    height: '40px',
                                    '&.Mui-focused': {
                                        border: '1px solid #111'
                                    }
                                }}
                                id="userName" aria-describedby="userName" />
                            <div>
                                <p>https://unsplash.com/@{userInfoForm.userName}</p>
                            </div>
                        </FormControl>
                    </div>


                </div>


            </div>
            {/* <div className="about"></div>
            <div className="social"></div>
            <div className="donation"></div>
            <div className="message"></div> */}
            <div className="submit my-8">
                <SubmitBtn>Update account</SubmitBtn>

            </div>
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