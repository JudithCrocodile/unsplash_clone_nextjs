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
import React, { useEffect, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AvatarComponent from '@/components/avatar'
import {logout} from '@/store/auth'
import {removeUserInfo} from '@/store/user'
import {useDispatch} from 'react-redux'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))

export default function Layout({ children, inAccountPage=false }: {children: ReactNode, inAccountPage?: boolean}) {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token)
    const userInfo = useSelector((state: RootState) => state.user.userInfo)

    const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false);
    const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isUserMenuOpen = Boolean(anchorEl);
    const handleUserMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const openUploadDialog = () => {
        // console.log('openUploadDialog')
        if(token) {
            setIsOpenUploadDialog(true);

        } else {
            router.push(`/login`)
        }
    }

    const handleLogout = () => {
        console.log('handleLogout')
        handleUserMenuClose();

        fetcher(`/user/logout`, {}).then(res => {
            if (res.status === 200) {
                dispatch(logout())
                dispatch(removeUserInfo())
                setSnackbarMessage('Successfully logged out')
                setIsShowSnackbar(true)
                router.push(`/`)

                setTimeout(()=>{
                    setIsShowSnackbar(false)
                }, 2000)
            }
          })


    }

    useEffect(()=>{
        handleLogout()

    }, [])




    const router = useRouter()

    const isLogin = router.pathname.includes('login')

    const closeUploadDialog = () => {
        setIsOpenUploadDialog(false);
        // refresh photo list
    };



    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const keyDownSearchInput = (key: string) => {
        if (key === 'Enter') {
            // const newPhotoValues = [...selectedFileDetail]
            // newPhotoValues[photoIndex].tabs.push('')
            // setSelectedFileDetail(newPhotoValues)
            router.push(`/s/photos/${searchInputValue}`)
        }
    }
    const handleSearchInputChange = (newValue: string) => {
        setSearchInputValue(newValue)
    }


    return (
        <div>
            <header className='sticky top-0 bg-white z-50'>
                <div className={'header flex justify-between p-4 gap-4 items-center'}>
                    <div className={'icon'}>
                        <Link href={`/`}>
                            <AutoAwesomeMosaicIcon fontSize="large" className="cursor-pointer"></AutoAwesomeMosaicIcon>
                        </Link>
                    </div>
                    {!inAccountPage && <div className={'filter-container flex-1'}>
                        <div className={'filter flex gap-4 bg-slate-100 px-4 py-2 rounded-full'}>
                            <div className={'filter__prefix'}>
                                <SearchIcon></SearchIcon>
                            </div>
                            <Input value={searchInputValue} onChange={(e) => handleSearchInputChange(e.target.value)} onKeyDown={((e) => { keyDownSearchInput(e.key) })} placeholder="Search photos and illustrations" disableUnderline={true} ></Input>
                            {/* <div className={'filter__sufix'}>
                                <CenterFocusWeakIcon></CenterFocusWeakIcon>
                            </div> */}
                        </div>

                    </div>}

                    {!token && <div className={'new-img  hidden md:block'}>
                        <Link href={`/login`}>
                            <OperationBtn className="whitespace-nowrap">Log in</OperationBtn>
                        </Link>
                    </div>}


                    {(!inAccountPage) && <div className={'new-img hidden md:block'}>
                        <OperationBtn onClick={openUploadDialog} line className="whitespace-nowrap">Submit an image</OperationBtn>
                    </div>}

                    {/* todo notifictation */}
                    {/* {!inAccountPage && <div className={'notification hidden md:block'}>
                        <NotificationsIcon className="cursor-pointer" fontSize="medium"></NotificationsIcon>
                    </div>} */}
                    {token && <div className={'user'}>

                        <div aria-controls={isUserMenuOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isUserMenuOpen ? 'true' : undefined}
                            onClick={handleUserMenuClick}
                            className="cursor-pointer">
                            <AvatarComponent size='32px'></AvatarComponent>

                        </div>


                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={isUserMenuOpen}
                            onClose={handleUserMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{
                                marginTop: '20px'
                            }}
                        >
                            <MenuItem onClick={handleUserMenuClose}><Link href={`/@${userInfo.userName}`}>View profilo</Link></MenuItem>
                            {/* <MenuItem onClick={handleUserMenuClose}><Link href={`/account/stats`}>Status</Link></MenuItem> */}
                            {/* <MenuItem onClick={handleUserMenuClose}><Link href={`/account/history`}>Download history</Link></MenuItem> */}
                            <MenuItem onClick={handleUserMenuClose}><Link href={`/account`}>Account setting</Link></MenuItem>
                            <div className='md:hidden block'>
                                <MenuItem onClick={handleUserMenuClose}><OperationBtn onClick={openUploadDialog} line className="whitespace-nowrap">Submit an image</OperationBtn></MenuItem>
                            </div>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Logout @{userInfo.userName}</MenuItem>
                        </Menu>
                    </div>}

                    {/* todo menu */}
                    {/* {!inAccountPage && <div className={'menu'}>
                        <MenuIcon className="cursor-pointer" fontSize="medium" sx={{ '&:hover': 'text.primary' }}></MenuIcon>
                    </div>} */}

                </div>                
            </header>

            <main>{children}</main>

            <UploadDialog open={isOpenUploadDialog} handleClose={closeUploadDialog}></UploadDialog>
        
            <Snackbar
                open={isShowSnackbar}
                autoHideDuration={2000}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </div>
    )
}