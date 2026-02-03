
import AccountLayout from '@/components/accountLayout';
import type { ReactElement, ChangeEvent } from 'react'
import Layout from '@/components/layout'
import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SubmitBtn from '@/components/submitBtn';
import Head from 'next/head';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { logout } from '@/store/auth'
import { removeUserInfo } from '@/store/user'

const fetcher = (url: string, params: object) => fetch(`/api${url}`, params).then((res => res.json()))

export default function Password({ }) {
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch();
    const router = useRouter();

    const [userInfoForm, setUserInfoForm] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

    const passwordRegex = /^.{8,}$/;

    type ValidationField = {
        error: boolean;
        message: string;
        regex: RegExp;
    };

    type ValidationState = {
        [key: string]: ValidationField;
    };

    const [validation, setValidation] = useState<ValidationState>({
        currentPassword: { error: false, message: 'Current password is invalid', regex: passwordRegex },
        password: { error: false, message: 'Current password is invalid', regex: passwordRegex },
        confirmPassword: { error: false, message: 'Current password is invalid', regex: passwordRegex },
    })

    useEffect(() => {

        if (isShowSnackbar === true) {
            setTimeout(() => {
                setIsShowSnackbar(false)
            }, 2000);
        }

    }, [isShowSnackbar])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfoForm((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    };

    const handleValidation = () => {
        setValidation((prevValidation) => {
            const newValidation = { ...prevValidation };
            for (const [key, value] of Object.entries(newValidation)) {
                if (newValidation[key].regex) {
                    const isValid = newValidation[key].regex.test(userInfoForm[key as keyof typeof userInfoForm]);
                    newValidation[key].error = !isValid;
                }
            }

            return {
                ...newValidation
            };
        })
    }

    const submit = () => {

        handleValidation();

        if (Object.values(validation).some(field => field.error)) {
            return;
        }

        setLoading(true)

        fetcher('/user/update-password', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userInfo: userInfoForm }),
        }).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setMessage('Password updated')
                setIsShowSnackbar(true)
            } else if (res.status === 401) {
                dispatch(logout())
                dispatch(removeUserInfo())
                router.push(`/login`)
                setMessage('Please login');
                setIsShowSnackbar(true)
            } else {
                setMessage(res.error || 'Failed to update password');
                setIsShowSnackbar(true)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

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

                                <label htmlFor="Current password" className="mb-2">Current Password</label>
                                <OutlinedInput
                                    value={userInfoForm.currentPassword}
                                    error={validation.currentPassword.error}
                                    name="currentPassword"
                                    type="password"
                                    onChange={handleChange}
                                    sx={{
                                        height: '40px',
                                        '&.Mui-focused': {
                                            border: '1px solid #111'
                                        }
                                    }}
                                    id="currentPassword" aria-describedby="currentPassword" />
                                {validation.currentPassword.error && <FormHelperText id="current-password-error-text" error>{validation.currentPassword.message}</FormHelperText>}
                            </FormControl>
                        </div>

                        <div>
                            <FormControl fullWidth className="m-0" sx={{
                                '&.MuiFormControl-root': {
                                    margin: '0',
                                    marginBottom: '24px'
                                }
                            }} >

                                <label htmlFor="password" className="mb-2">New Password</label>
                                <OutlinedInput
                                    value={userInfoForm.password}
                                    error={validation.password.error}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    sx={{
                                        height: '40px',
                                        '&.Mui-focused': {
                                            border: '1px solid #111'
                                        }
                                    }}
                                    id="password" aria-describedby="password" />
                                {validation.password.error && <FormHelperText id="password-error-text" error>{validation.password.message}</FormHelperText>}
                            </FormControl>
                        </div>

                        <div>
                            <FormControl fullWidth className="m-0" sx={{
                                '&.MuiFormControl-root': {
                                    margin: '0',
                                    marginBottom: '24px'
                                }
                            }} >

                                <label htmlFor="confirmPassword" className="mb-2">Password Confirmation</label>
                                <OutlinedInput
                                    value={userInfoForm.confirmPassword}
                                    error={validation.confirmPassword.error}
                                    name="confirmPassword"
                                    type="password"
                                    onChange={handleChange}
                                    sx={{
                                        height: '40px',
                                        '&.Mui-focused': {
                                            border: '1px solid #111'
                                        }
                                    }}
                                    id="confirmPassword" aria-describedby="confirmPassword" />
                                {validation.confirmPassword.error && <FormHelperText id="confirm-password-error-text" error>{validation.confirmPassword.message}</FormHelperText>}
                            </FormControl>
                        </div>



                    </div>


                </div>

                <div className="submit my-8">
                    <SubmitBtn onClick={submit} loading={loading}>Change Password</SubmitBtn>

                </div>

                <Snackbar
                    open={isShowSnackbar}
                    autoHideDuration={1}
                    message={message}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                />
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