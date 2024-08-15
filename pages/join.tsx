import { FormControl, Input, InputLabel, FormHelperText, Box, OutlinedInput } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import EmptyLayout from '../components/emptyLayout'
import type { ReactElement, ChangeEvent } from 'react'
import React, { useState, } from 'react';

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))

export default function Join() {
  const [createForm, setCreateForm] = useState({
    email: '',
    password: '',
    userName: '',
    firstName: '',
    lastName: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateForm((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  };

  function submit() {
    fetcher('/user/create-user',
      {
        method: 'POST',
        body: JSON.stringify(createForm)
      }
    ).then(res => {
      if (res.status === 200) {
        localStorage.setItem('token', res.token);
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
            <AutoAwesomeMosaicIcon fontSize="large" className="cursor-pointer md:w-12 md:h-12"></AutoAwesomeMosaicIcon>
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
              </FormControl>
              <FormControl fullWidth className="m-0" sx={{
                '&.MuiFormControl-root': {
                  margin: '0',
                }
              }} >
                <label htmlFor="email" className="mb-2">Last name</label>
                {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
                <OutlinedInput
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
            </FormControl>
            <FormControl fullWidth className="m-0" sx={{
              '&.MuiFormControl-root': {
                margin: '0',
              }
            }} >
              <label htmlFor="username" className="mb-2">Username</label>
              {/* <InputLabel htmlFor="email" >Email</InputLabel> */}
              <OutlinedInput
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
                value={createForm.password}
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
            <LoginBtn onClick={submit}>Join</LoginBtn>
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