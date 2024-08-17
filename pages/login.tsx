import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import React, { useState, ChangeEvent } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'
import {setToken} from '@/store/auth'

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch();
    
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginForm((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    };

    async function login() {

        fetcher('/user/login',
            {
                method: 'POST',
                body: JSON.stringify(loginForm)
            }
        ).then(res=>{
            if (res.status === 200) {
                dispatch(setToken(res.token))
            }         
            router.push(`/`, undefined, { shallow: true })   
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
        <main
            className={`max-w-screen-sm mx-auto w-full`}
        >
            <div className="w-full px-12 py-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl mb-2 font-semibold">Login</h2>
                    <p>Welcome back.</p>
                </div>

                {/* todo facebook */}
                {/* <div>
                    login with facebook
                </div>

                <p className="text-center text-xs">OR</p> */}


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
                        <FormControl fullWidth sx={{
                            '&.MuiFormControl-root': {
                                margin: '0',
                            }
                        }}>
                            <div className="flex justify-between">
                                <label htmlFor="password" className="mb-2">Password</label>
                                <FormHelperText id="forget-password-text" className="mr-0">
                                    <button><span className="underline text-slate-500 hover:text-slate-900 text-base">Forgot your password?</span>
                                    </button>
                                </FormHelperText>
                            </div>
                            <OutlinedInput
                                value={loginForm.password}
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

                        </FormControl>
                        <LoginBtn onClick={login}>Login</LoginBtn>
                    </Box>


                </div>
            </div>


            <div className="create-account">
                <div className="creat-account create-account__block py-10 border-slate-300 border border-solid flex items-center justify-center">
                    <p>Don’t have an account?</p>&nbsp;
                    <span>
                        <Link className="underline text-slate-500 hover:text-slate-900" href={`/join`}>
                            Join
                        </Link>
                    </span>

                    <svg className="wdLeJ seLQm absolute create-account__curl-back-img" width="182" height="86" xmlns="http://www.w3.org/2000/svg"><path d="M43.268 1.471c-11.206.54-22.788 3.669-31.596 10.734C-1.078 22.435-2.35 39.097 9.405 51.12c11.884 12.154 32.194 17.12 48.204 12.741 4.955-1.355 19.666-8.944 13.358-16.521-6.018-7.229-21.23-5.946-28.683-3.458-6.158 2.056-11.646 6.205-12.796 12.96-2.248 13.209 7.936 25.114 17.727 32.555 16.072 12.213 35.92 19.617 55.411 23.973 19.712 4.406 42.14 6.367 61.06-1.73 6.398-2.737 11.807-7.276 16.11-12.636.399-.497 1.542-2.033 1.164-1.52"></path></svg>
                    <svg className="wdLeJ yvdPM absolute create-account__arrow-back-img" width="53" height="51" xmlns="http://www.w3.org/2000/svg"><g><path d="M13.81 47.388c-2.05-.767-4.005-1.768-5.967-2.716a64.79 64.79 0 0 0-4.025-1.792c-.063-.025-1.036-.312-.998-.456.081-.313.512-.654.71-.877 1.072-1.197 2.106-2.416 3.004-3.744 1.273-1.882 2.492-4.036 2.763-6.3"></path><path d="M3 42.42c15.225-3.279 28.41-9.747 36.76-23.393C46.038 8.767 50.728-3.093 52.217-15"></path></g></svg>
                </div>
            </div>







        </main>
    );
}
