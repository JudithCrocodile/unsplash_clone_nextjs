import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import EmptyLayout from '../components/emptyLayout'
import type { ReactElement, ChangeEvent } from 'react'
import React, { useState, } from 'react';
import { useRouter } from 'next/router'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { validateEmail, validateUserName } from '@/util';
import CircularProgress from '@mui/material/CircularProgress';

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))

export default function Join() {
  const router = useRouter()

  interface CreateForm {
    email: string;
    password: string;
    userName: string;
    firstName: string;
    lastName: string;
  }

  const [createForm, setCreateForm] = useState<CreateForm>({
    email: '',
    password: '',
    userName: '',
    firstName: '',
    lastName: '',
  })

  const [validation, setValidation] = useState({
    email: {error: false, message: 'Email is invalid'},
    userName: {error: false, message: 'Username must have at least one letter and contain only letters, digits, or underscores (no spaces)'},
    password: {error: false, message: ''},
    firstName: {error: false, message: ''},
    lastName: {error: false, message: ''},
  })

  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateForm((prevUser) => ({
      ...prevUser,
      [name]: value
    }))

    if(name === 'password') {
      if(value.length < 8) {
        const newValidation = {...validation}
        newValidation[name].error = true
        setValidation(newValidation)
      } else {
        const newValidation = {...validation}
        newValidation[name].error = false
        setValidation(newValidation)
      }

    }
  };

  function submit(): void {
    setLoading(true)

    const newValidation = JSON.parse(JSON.stringify(validation))

      let error: boolean = false
    for (let key in createForm) {
      if(createForm[key as keyof CreateForm] === ''){
        error = true
        newValidation[key].error = true
      } else if(key === 'email'){
          if(!validateEmail(createForm[key])){
            error = true
            newValidation[key].error = true
          } else {
            newValidation[key].error = false
          }
      } else if(key === 'userName') {
        if(!validateUserName(createForm[key])){
          error = true
          newValidation[key].error = true
        } else {
          newValidation[key].error = false
        }

      } else if(key === 'password') {
        if(validation.password.error){
          error = true
        }

      }else {
        newValidation[key].error = false
      }

      setValidation(newValidation)


    }
      if(error){
        setLoading(false)
        return;
      } else {
        setShowErrorMessage(false);
      }

    fetcher('/user/create-user',
      {
        method: 'POST',
        body: JSON.stringify(createForm)
      }
    ).then(res => {
      setLoading(false)
      if (res.status === 200) {
        // localStorage.setItem('token', res.token);
        router.push(`/login`, undefined, { shallow: true })
      } else {
        setShowErrorMessage(true);
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
    <main
      className={`join w-full mx-auto w-full md:flex min-h-screen`}
    >
      <div className="hero text-white px-3 py-8 md:flex md:w-[40%] md:flex-col md:px-[5%]">
        <div className={'icon mb-8'}>
          <Link href={`/`}>
            <svg className="UX25f" width="32" height="32" viewBox="0 0 32 32" version="1.1" aria-labelledby="unsplash-home" aria-hidden="false" style={{flexShrink: '0'}}><desc lang="en-US">Unsplash logo</desc><title id="unsplash-home">Unsplash Home</title><path d="M 10 9 V 0 h 12 v 9 H 10 Z m 12 5 h 10 v 18 H 0 V 14 h 10 v 9 h 12 v -9 Z"></path></svg>
          </Link>
        </div>
        <div className='md:my-auto'>
          <h2 className={'mb-4 font-bold leading-tight text-3xl md:text-5xl'}>Creation starts here</h2>
          <p className={'text-lg leading-7 md:text-2xl md:leading-10'}>Access 5,825,610 free, high-resolution photos you can’t find anywhere else.</p>
        </div>

        <div className='hidden md:block'>
          <p>Uploaded on July 2, 2024 by eberhard 🖐 grossgasteiger</p>
        </div>

      </div>
      <div className="w-full md:px-12 py-16 px-3 md:w-[60%] justify-center flex flex-col">
        <div className="text-center mb-[60px]">
          <h2 className="text-2xl mb-4 font-semibold md:text-5xl">Join Unsplash</h2>
          <p>Already have an account? &nbsp;<span>Login</span></p>
        </div>

        {showErrorMessage && <div style={{
              backgroundColor: '#fdf6f4',
              color: '#e25c3d',
        }}
        className='px-4 py-3 mb-8'>
        We couldn&apos;t create your account, kindly address the issues outlined below.
      </div>}


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
            <div className="flex gap-6" style={{ margin: 0 }}>
              <FormControl fullWidth className="m-0" >
                <label htmlFor="email" className="mb-2">First name</label>
                {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
                <OutlinedInput
                  error={validation.firstName.error}
                  value={createForm.firstName}
                  name="firstName"
                  onChange={handleChange}
                  sx={{
                    height: '40px',
                    '&.Mui-focused': {
                      border: '1px solid #111'
                    }
                  }}
                  id="firstName" aria-describedby="firstName" />
                  {
                  validation.firstName.error && <div style={{color: '#e25c3d'}}>
                    {validation.firstName.message}
                  </div>
                  }
              </FormControl>
              <FormControl fullWidth className="m-0" sx={{
                '&.MuiFormControl-root': {
                  margin: '0',
                }
              }} >
                <label htmlFor="email" className="mb-2">Last name</label>
                {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
                <OutlinedInput
                  error={validation.lastName.error}
                  value={createForm.lastName}
                  name="lastName"
                  onChange={handleChange}
                  sx={{
                    height: '40px',
                    '&.Mui-focused': {
                      border: '1px solid #111'
                    }
                  }}
                  id="lastName" aria-describedby="lastName" />
                                    {
                  validation.lastName.error && <div style={{color: '#e25c3d'}}>
                    {validation.lastName.message}
                  </div>
                  }
              </FormControl>
            </div>
            <FormControl fullWidth className="m-0" sx={{
              '&.MuiFormControl-root': {
                margin: '0',
              }
            }} >
              <div className="flex">
                <label htmlFor="email" className="mb-2">Email</label>
                <FormHelperText id="forget-password-text" className="mr-0">
                  <span>(only letters, numbers and underscores)</span>
                </FormHelperText>
              </div>

              {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
              <OutlinedInput
                  error={validation.email.error}
                value={createForm.email}
                name="email"
                onChange={handleChange}
                sx={{
                  height: '40px',
                  '&.Mui-focused': {
                    border: '1px solid #111'
                  }
                }}
                id="email" aria-describedby="email" />
                                  {
                  validation.email.error && <div style={{color: '#e25c3d'}}>
                    {validation.email.message}
                  </div>
                  }
            </FormControl>
            <FormControl fullWidth className="m-0" sx={{
              '&.MuiFormControl-root': {
                margin: '0',
              }
            }} >
              <label htmlFor="username" className="mb-2">Username</label>
              {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
              <OutlinedInput
                error={validation.userName.error}
                value={createForm.userName}
                name="userName"
                onChange={handleChange}
                sx={{
                  height: '40px',
                  '&.Mui-focused': {
                    border: '1px solid #111'
                  }
                }}
                id="userName" aria-describedby="userName" />
                                  {
                  validation.userName.error && <div style={{color: '#e25c3d'}}>
                    {validation.userName.message}
                  </div>
                  }
            </FormControl>
            <FormControl fullWidth sx={{
              '&.MuiFormControl-root': {
                margin: '0',
              }
            }}>
              <div className="flex">
                <label htmlFor="password" className="mb-2">Password</label>

                <FormHelperText id="forget-password-text" className="mr-0">
                  <span>(min. 8 char)</span>
                </FormHelperText>
              </div>
              <OutlinedInput
                  error={validation.password.error}
                value={createForm.password}
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
                                  {
                  validation.password.error && <div style={{color: '#e25c3d'}}>
                    {validation.password.message}
                  </div>
                  }

            </FormControl>
            <LoginBtn onClick={submit} disabled={loading}>{loading && <CircularProgress className="mr-2" size="20px" color="inherit" />}Join</LoginBtn>
            {/* <p>By joining, you agree to the Terms and Privacy Policy.</p> */}
          </Box>


        </div>
      </div>

    </main>
  )
}


Join.getLayout = function getLayout(page: ReactElement) {
  return (
    <EmptyLayout>{page}</EmptyLayout>
  )
}