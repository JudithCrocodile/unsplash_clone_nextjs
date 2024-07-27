import { Input, Tabs, Tab, Button } from '@mui/material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SearchIcon from '@mui/icons-material/Search';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';
import OperationBtn from '../components/operationBtn'
import { useRouter } from 'next/router'
import UploadDialog from '../components/uploadDialog'
import React, { useState } from 'react'



export default function Layout({ children }) {
    const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false);

    console.log(isOpenUploadDialog)

    const openUploadDialog = () => {
        console.log('openUploadDialog')
        setIsOpenUploadDialog(true);
        console.log(isOpenUploadDialog)
    }

    const category = 0;
    const handleCategoryChange = () => { }

    const router = useRouter()
    console.log('router: ', router)

    const isLogin = router.pathname.includes('login')

    const closeUploadDialog = () => {
        setIsOpenUploadDialog(false);
      };


    return (
        <div>

            <div className={'header flex justify-between p-4 gap-4 items-center'}>
                <div className={'icon'}>
                    <Link href={`/`}>
                        <AutoAwesomeMosaicIcon fontSize="large" className="cursor-pointer"></AutoAwesomeMosaicIcon>
                    </Link>
                </div>
                <div className={'filter-container'}>
                    <div className={'filter flex gap-4 bg-slate-100 px-4 py-2 rounded-full'}>
                        <div className={'filter__prefix'}>
                            <SearchIcon></SearchIcon>
                        </div>
                        <Input placeholder="Search photos and illustrations" disableUnderline={true} ></Input>
                        {/* <div className={'filter__sufix'}>
                            <CenterFocusWeakIcon></CenterFocusWeakIcon>
                        </div> */}
                    </div>

                </div>
                <div className={'new-img  hidden md:block'}>
                    <Link href={`/login`}>
                        <OperationBtn className="whitespace-nowrap">Log in</OperationBtn>
                    </Link>
                </div>
                <div className={'new-img hidden md:block'}>
                    <OperationBtn onClick={openUploadDialog} line className="whitespace-nowrap">Submit an image</OperationBtn>
                </div>
                <div className={'notification hidden md:block'}>
                    <NotificationsIcon className="cursor-pointer" fontSize="medium" sx={{ color: 'text.secondary' }}></NotificationsIcon>
                </div>
                <div className={'user'}>
                    <AccountCircleIcon className="cursor-pointer" fontSize="medium" sx={{ color: 'text.secondary', '&:hover': 'black' }}></AccountCircleIcon>
                </div>
                <div className={'menu'}>
                    <MenuIcon  className="cursor-pointer" fontSize="medium"  sx={{ 'color': 'text.secondary', '&:hover': 'text.primary' }}></MenuIcon>
                </div>

            </div>
            {
                !isLogin && <div className="category w-full">
                    <Tabs value={category} onChange={handleCategoryChange} aria-label="category tabs" variant="scrollable"
                        scrollButtons="auto" allowScrollButtonsMobile>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Three" />
                        <Tab label="Item Three" />
                        <Tab label="Item Three" />
                        <Tab label="Item Three" />
                        <Tab label="Item Three" />
                        <Tab label="Item Three" />
                    </Tabs>

                </div>
            }


            <main>{children}</main>

            isOpenUploadDialog: {isOpenUploadDialog}
            <UploadDialog open={isOpenUploadDialog} handleClose={closeUploadDialog}></UploadDialog>
        </div>
    )
}