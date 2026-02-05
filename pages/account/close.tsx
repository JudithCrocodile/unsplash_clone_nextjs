
import AccountLayout from '@/components/accountLayout';
import type { ReactElement, ChangeEvent } from 'react'
import Layout from '@/components/layout'
import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SubmitBtn from '@/components/submitBtn';
import Head from 'next/head';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/auth'
import { removeUserInfo } from '@/store/user'
import { useRouter } from 'next/router'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

const fetcher = (url: string, params: object) => fetch(`/api${url}`, params).then((res => res.json()))


export default function Close({ }) {
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch();
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [userInfoForm, setUserInfoForm] = useState({
        currentPassword: '',
    })

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

    useEffect(() => {

        if (isShowSnackbar === true) {
            setTimeout(() => {
                setIsShowSnackbar(false)
            }, 2000);
        }

    }, [isShowSnackbar])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAccount = () => {

        setLoading(true)

        fetcher('/user/close-account', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userInfo: userInfoForm }),
        }).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setMessage('Account closed successfully');
                setIsShowSnackbar(true)
                router.push(`/`)
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

        setOpen(false);
    };

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
                <title>Edit profile | Unsplash</title>
            </Head>

            <div className="account">
                <div className="info flex gap-8">
                    <div className="info__info flex-1 w-full">

                        <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.6, margin: '0 0 16px' }}><span style={{ color: '#e25c3d' }}><b>Warning</b></span>: closing your account is irreversible. It deletes all of your photos, collections, and stats.</p>


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
                                    type="password"
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

                <div className="submit mb-8">
                    <SubmitBtn sx={{
                        backgroundColor: '#e25c3d',
                        width: 'unset',
                    }}
                        onClick={handleClickOpen}>Delete account</SubmitBtn>

                </div>


                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Are you sure to close your account?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Once you delete your account, you will not be able to recover your photos, stats, or info. Are you sure you want to delete your account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <SubmitBtn onClick={handleClose}>Cancel</SubmitBtn>
                        <div className="mx-4"></div>
                        <SubmitBtn onClick={handleCloseAccount}>OK</SubmitBtn>
                    </DialogActions>
                </Dialog>

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

Close.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout inAccountPage={true}>
            <AccountLayout>{page}</AccountLayout>
        </Layout>

    )
}