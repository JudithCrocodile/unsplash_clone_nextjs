
import AccountLayout from '@/components/accountLayout';
import type { ReactElement, ChangeEvent } from 'react'
import Layout from '@/components/layout'
import AvatarComponent from "@/components/avatar";
import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import React, { useState, } from 'react';
import { useSelector } from 'react-redux';
import SubmitBtn from '@/components/submitBtn';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useRouter } from 'next/router'
import { logout } from '@/store/auth'
import { useDispatch } from 'react-redux'
import { removeUserInfo, setUserInfo, updateAvatar } from '@/store/user'
import type { RootState } from '@/store'

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))

export default function Account({ }) {
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch();

    const userInfo = useSelector((state: RootState) => state.user.userInfo)

    const [userInfoForm, setUserInfoForm] = useState({
        email: userInfo.email,
        userName: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
    })
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [message, setMessage] = useState<string>('');
    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfoForm((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    };

    const UploadInput = () => {
        return <input type="file" style={{ display: 'none' }} onChange={handleFileChange} name="image" accept="image/png, image/jpeg, image/jpg" />
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {

            setSelectedFile(e.target.files[0])


            const formData = new FormData();
            formData.append(`image`, e.target.files[0]);

            try {
                setAvatarLoading(true)

                fetcher('/user/upload-avatar', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                }).then(res => {
                    setAvatarLoading(false)
                    if (res.status === 200) {
                        dispatch(updateAvatar(res.data))

                        setMessage('Profile image updated')
                        setIsShowSnackbar(true)
                    } else if (res.status === 401) {
                        dispatch(logout())
                        dispatch(removeUserInfo())
                        router.push(`/login`)
                        setMessage('Please login');
                        setIsShowSnackbar(true)
                    } else {
                        setMessage('Failed to upload file');
                        setIsShowSnackbar(true)
                    }
                })

            } catch (error) {
                setMessage('Error uploading file');
                setIsShowSnackbar(true)
            }
        }
    };

    const submit = () => {
        fetcher('/user/update-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userInfo: userInfoForm}),
        }).then(res => {
            setAvatarLoading(false)
            if (res.status === 200) {
                dispatch(setUserInfo(res.data))

                setMessage('Profile updated')
                setIsShowSnackbar(true)
            } else if (res.status === 401) {
                dispatch(logout())
                dispatch(removeUserInfo())
                router.push(`/login`)
                setMessage('Please login');
                setIsShowSnackbar(true)
            } else {
                setMessage('Failed to update profile');
                setIsShowSnackbar(true)
            }
        })
    }

    return (
        <div className="account">
            <div className="info flex gap-8">
                <div className="info__avatar cursor-pointer px-3 w-2/6 flex justify-start flex-col items-center text-gray-400 hover:text-gray-600">
                    <Button
                        sx={{ 
                            boxShadow: 'unset',
                            color: 'inherit',
                            '&:hover': {
                                textDecoration: 'none',
                                backgroundColor: 'unset', 
                                boxShadow: 'unset'
                            }
                         }}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        className='flex flex-col items-center mt-auto cursor-pointer'
                    >
                        <AvatarComponent size={'128px'}></AvatarComponent>

                        {!avatarLoading ? <p className="underline my-4 text-xs">Change profile image</p>
                            : <p className="underline my-4 text-xs">Uploadig</p>}
                        <UploadInput></UploadInput>

                    </Button>



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
                <SubmitBtn onClick={submit}>Update account</SubmitBtn>

            </div>

            <Snackbar
                open={isShowSnackbar}
                autoHideDuration={6000}
                message={message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
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