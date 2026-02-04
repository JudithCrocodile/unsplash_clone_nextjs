import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import React, { useState, ChangeEvent } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/auth'
import { setUserInfo } from '@/store/user'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Head from 'next/head';

const fetcher = (url: string, params: object) => fetch(`/api${url}`, params).then((res => res.json()))

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginForm((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    };

    async function handleGoToLogin() {
        setLoading(true)

        fetcher('/user/forgot-password',
            {
                method: 'POST',
                body: JSON.stringify(loginForm)
            }
        ).then(res => {
            setLoading(false)
            if (res.status === 200) {
                router.push(`/login`, undefined, { shallow: true })
            } else {
                setSnackbarMessage('Invalid email or password.')
                setIsShowSnackbar(true)
                setTimeout(() => {
                    setIsShowSnackbar(false)
                }, 2000)
            }
        })

    }

    const LoginBtn = styled(ButtonBase)(({ theme }) => ({
        background: 'linear-gradient(to top, #0000 50%, #ffffff1a 100%), #111',
        color: '#fff',
        width: '100%',
        fontSize: '15px',
        height: '44px',
        lineHeight: '42px',
        paddingInline: '16px',
        borderRadius: '6px',
        '&:hover': {
            background: 'linear-gradient(to top, #0000 50%, #ffffff1a 100%), #222',
            boxShadow: '0 1px 2px #0000001a',
        },
        '&.MuiButtonBase-root': {
            margin: '0',
        }
    }));

    return (
        <>
            <Head>
                <title>Unsplash</title>
            </Head>
            <main
                className={`max-w-screen-sm mx-auto w-full`}
            >
                <div className="w-full px-12 py-16">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl mb-2 font-semibold">Forgot your password?</h1>
                        <p>Enter the email address associated with your account and we’ll send you a link to reset your password.</p>
                    </div>


                    <div className="card">

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                            className="block flex flex-col gap-6"
                        >
                            <FormControl fullWidth className="m-0" sx={{
                                '&.MuiFormControl-root': {
                                    margin: '0',
                                }
                            }} >
                                <label htmlFor="email" className="mb-2">Email</label>
                                {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
                                <OutlinedInput
                                    value={loginForm.email}
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
                            <LoginBtn onClick={handleGoToLogin} disabled={loading}>{loading && <CircularProgress className="mr-2" size="20px" color="inherit" />}Send password reset instructions</LoginBtn>
                        </Box>


                    </div>
                </div>


                <Snackbar
                    open={isShowSnackbar}
                    autoHideDuration={2000}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{
                        backgroundColor: '#e25c3d',
                        '.MuiPaper-root': {
                            backgroundColor: '#e25c3d',
                        },
                        '.MuiSnackbarContent-message': {
                            textAlign: 'center',
                            width: '100%'
                        }
                    }}
                />

            </main>
        </>

    );
}
