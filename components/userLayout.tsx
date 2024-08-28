import { Tabs, Tab } from '@mui/material';
import React, { useState, useEffect, ReactNode } from 'react'
import AvatarComponent from '@/components/avatar'
import TagList from '@/components/tagList'
import Tag from '@/components/tag'
import OperationBtn from '@/components/operationBtn'
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import Link from 'next/link'
import { StyledTabs, CustomerTab } from '@/components/tab'

export default function UserLayout({ children }: {children: ReactNode}) {
    const [currentTabName, setCurrentTabName] = useState<string>('0')
    // const [currentPathValue, setCurrentPathValue] = useState<string>('0')
    const router = useRouter()
    const userInfo = useSelector((state: RootState) => state.user.userInfo)

    const pathData: object[] = [
        {   
            value: '0',
            path: '/'
        },
        {   
            value: '1',
            path: '/likes'
        },
        {   
            value: '2',
            path: '/collections'
        },
        {   
            value: '3',
            path: '/stats'
        },
    ]

    useEffect(()=>{
        pathData.forEach(path=>{
            if(router.pathname.includes(path.path)) {
                // setCurrentPathValue(path.value)
                setCurrentTabName(path.value)
            }
            
        })        
    }, [])


    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTabName(newValue)
        const path = pathData.find(p=>p.value === newValue)
        router.push(`/${userInfo.userName}${path?.path}`)
    }

    const [tags, setTags] = useState<object[]>([{ name: 'nature' }, { name: 'tree' }])

    return (
        <div>
            <div className="user pt-16 pb-[72px]">
                <div className=" grid grid-cols-12 gap-8">
                    <div className="user__avatar mr-8 ml-auto col-span-4">
                        <AvatarComponent size="150px"></AvatarComponent>
                    </div>
                    <div className="user__info-container col-span-8">
                        <div className="user_name-container mb-4 flex gap-6">
                            <h2 className="text-4xl font-bold leading-5">username</h2>
                            <div>
                                <OperationBtn line>
                                    <Link href="/account">
                                    <span>
                                        <EditIcon sx={{ '&.MuiSvgIcon-root': { width: '15px', height: '15px', marginTop: '-4px' } }} className="mr-2"></EditIcon>
                                        Edit profile
                                    </span>
                                        
                                   </Link>
                                </OperationBtn>
                                    
                            </div>
                        </div>

                        <div className="user__detail-container flex flex-col gap-4">
                            <p>Download free, beautiful high-quality photos curated by {userInfo.userName}.</p>
                            <div className="user__tags-container">
                                <h4 className='mb-4'>Interests</h4>
                                <div className="user__tags">
                                    <TagList>
                                        {
                                            tags.map(t => <Tag key={t.name} name={t.name} ></Tag>)
                                        }
                                    </TagList>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="tab__container px-5">
                <StyledTabs textColor="secondary" indicatorColor="secondary" value={currentTabName} onChange={handleTabChange} aria-label="category tabs" variant="scrollable"
                    scrollButtons="auto" allowScrollButtonsMobile sx={{ '.MuiTabs-flexContainer': { gap: '24px' } }}>
                    <CustomerTab sx={{
                        '&$selected': {
                            backgroundColor: 'unset',
                        },
                        paddingLeft: 0, paddingRight: 0, minWidth: 'unset'
                    }} value="0" icon={<ImageIcon />} iconPosition="start" label='Photos' />
                    <CustomerTab value="1" icon={<FavoriteIcon />} iconPosition="start" label='Likes' sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} />
                    {/* <Tab value="2" icon={<FolderCopyIcon />} iconPosition="start" label='Collections' sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} />
                    <Tab value="3" icon={<EqualizerIcon />} iconPosition="start" label='Stats' sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} /> */}
                </StyledTabs>
            </div>
            <Divider></Divider>
            <main>{children}</main>
        </div>
    )
}