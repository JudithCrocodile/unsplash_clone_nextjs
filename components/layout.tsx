import { Input, Tabs, Tab, Button } from '@mui/material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import SearchIcon from '@mui/icons-material/Search';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';

export default function Layout({ children }) {
    const category = '';
    const handleCategoryChange = ()=>{}

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
                        <div className={'filter__sufix'}>
                            <CenterFocusWeakIcon></CenterFocusWeakIcon>
                        </div>
                    </div>
                    
                </div>
                <div className={'new-img'}>
                    <Button className="whitespace-nowrap" variant="outlined" sx={{ color: 'text.secondary', borderColor: 'text.secondary' }}>Submit an image</Button>
                </div>
                <div className={'notification'}>
                    <NotificationsIcon className="cursor-pointer"  fontSize="medium"  sx={{ color: 'text.secondary' }}></NotificationsIcon>
                </div>
                <div className={'user'}>
                    <AccountCircleIcon className="cursor-pointer" fontSize="medium"  sx={{ color: 'text.secondary', '&:hover': 'black' }}></AccountCircleIcon>
                </div>
                {/* <div className={'menu'}>
                    <MenuIcon  className="cursor-pointer" fontSize="medium"  sx={{ 'color': 'text.secondary', '&:hover': 'text.primary' }}></MenuIcon>
                </div> */}

            </div>

            <div className="category w-full">
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
            
            <main>{children}</main>
        </div>
    )
  }