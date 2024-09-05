import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LikeBtn from '@/components/likeBtn'
import AuthorInfo from '../components/authorInfo'
import useSWR from 'swr';
import { TypePhoto } from '@/types'
import { TypeTag } from '@/types'
import { Input, Tabs, Tab, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { StyledTabs, CustomerTab } from '@/components/tab'
import Skeleton from '@mui/material/Skeleton';
import PhotoComponent from '@/components/photoComponent'
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import InfiniteScroll from 'react-infinite-scroll-component';

interface StyledTabsProps {
    label: string;
}

const fetcher = (url: string, params: object) => fetch(`/api${url}`, params).then((res => res.json()))
const inter = Inter({ subsets: ["latin"] });

export default function PhotoList({ propTabId, showCategoryBar = true, showTitle = true, propTabName = null, userName = undefined, fullHeight = true, fullWidth = false, onlyShowLiked = false }: { propTabId?: string[], showCategoryBar?: boolean, showTitle?: boolean, category?: string | null, userName?: string | string[] | undefined, propTabName?: string | null, fullHeight?: boolean, fullWidth?: boolean, onlyShowLiked?: boolean }) {
    const [columns, setColumns] = useState(3);
    const [columnsPhotos, setColumnsPhotos] = useState<any[]>([[]]);
    const [currentTab, setCurrentTab] = React.useState<TypeTag | null>(null)
    const [currentTabName, setCurrentTabName] = React.useState<string>('Photos')
    const token = useSelector((state: RootState) => state.auth.token)
    const [photosList, setPhotosList] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const [loading, setLoading] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [windowSize, setWindowSize] = useState({
        width: 0,
        // height: 0
    })

    useEffect(() => {
        // getPhotoList(1)
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                // height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setCurrentPage(1)
        // getPhotoList()
    }, [propTabName, userName])

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                // height: window.innerHeight,
            })

            if (window.innerWidth > 1024) { //lg
                setColumns(3)
            } else if (window.innerWidth > 768) { // md
                setColumns(2)
            } else {
                setColumns(1)
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const loadMore = () => {
        if (!isLast && !loading) {

            setCurrentPage(currentPage + 1)
        }

    }

    useEffect(() => {
        getPhotoList()
    }, [currentPage])


    const getPhotoList = (): void => {
        if (isLast || loading) {
            return;
        }
        const params = JSON.stringify({
            page: currentPage,
            tabId: propTabId || currentTab?._id,
            category: propTabName,
            userName,
            onlyShowLiked,
        })

        setLoading(true)
        fetcher('/photo/get-photo-page', {
            method: 'POST',
            body: params,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(res => {

            if (res.status === 200) {
                if (currentPage === 1) {
                    setPhotosList([...res.data.photos])
                } else {
                    const newPhotoList: TypePhoto[] = [...photosList, ...res.data.photos]


                    setPhotosList(newPhotoList)
                }

                setIsLast(res.data.isLast)


                setLoading(false)
            }
        })
    }

    useEffect(() => {
        listPhotoByColumn()
    }, [columns, photosList])

    // photo list by columns
    const listPhotoByColumn = () => {
        const allPhotoList = [...photosList]
        const columnData = []
        const size = Math.ceil(photosList.length / columns) // size of each column

        for (let i = 0; i < columns; i++) {
            const columnPhoto = allPhotoList.splice(0, size)
            columnData[i] = columnPhoto
        }

        columnData[columnData.length - 1] = [...columnData[columnData.length - 1], ...allPhotoList] // remainder
        setColumnsPhotos(columnData)
    }

    const router = useRouter()
    const searchParams = useSearchParams()

    const photoId = searchParams.get('photoId')

    const goToPhotoPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: TypePhoto) => { e.stopPropagation(); router.push(`/?photoId=${item._id}`, undefined, { shallow: true }) }

    const [allTabs, setAllTabs] = React.useState<TypeTag[]>([]);
    const [getTabLoading, setGetTabLoading] = React.useState(false)

    const getAllTabs = (): void => {
        if (!showCategoryBar) return;
        setGetTabLoading(true)
        fetcher('/tab/get-tabs', {
            method: 'POST',
        }).then(res => {
            if (res.status === 200) {
                setGetTabLoading(false)

                setAllTabs([...res.data])
            }
        })
    }

    useEffect(() => {
        getAllTabs()
    }, [])

    useEffect(() => {
        const tagName: string = router.query.category as string
        const tag: TypeTag | undefined = allTabs.find(e => e.name === tagName)

        if (tag) {
            setCurrentTab(tag)
            setCurrentTabName(tagName)
        } else {
            setCurrentTab(null)
            setCurrentTabName('Photos')
        }
    }, [allTabs])


    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {

        const newTab: TypeTag | undefined = allTabs.find(t => t.name === newValue)
        if (newTab) {
            setCurrentTab(newTab)
            setCurrentTabName(newTab.name)

            router.push(`/s/photos/${newTab.name}`)

        } else {
            setCurrentTab(null)
            setCurrentTabName('Photos')
            router.push(`/`)
        }

    }

    return (
        <main
            className={`flex ${fullHeight && 'min-h-screen'} flex-col items-center ${inter.className}`}
        >
            {
                (showCategoryBar && !getTabLoading) &&
                <div className="category w-full px-6 flex gap-6 items-center">
                    <StyledTabs value={currentTabName} onChange={handleCategoryChange} aria-label="category tabs" variant="scrollable"
                        scrollButtons="auto" allowScrollButtonsMobile sx={{ '.MuiTabs-flexContainer': { gap: '24px' } }}>
                        <CustomerTab value="Photos" label='Photos' sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} />
                        <div className="self-center" style={{ backgroundColor: '#d1d1d1', height: '32px', width: '1px' }}></div>
                        {
                            allTabs.map((tab: TypeTag, tabIndex: number) =>
                                (<CustomerTab value={tab.name} sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} key={tabIndex} label={tab.name} />)
                            )
                        }
                    </StyledTabs>

                </div>

            }
            {showCategoryBar && <Divider className="w-full" sx={{ marginTop: '-1px' }}></Divider>}
            <div className={`mt-14 pb-12 ${fullWidth ? 'px-0' : 'px-6'} w-full max-w-[1336px] ${!showTitle && 'mt-0 px-0'}`}>
                {showTitle && <h2 className={'mb-14 text-3xl'}>Unsplash</h2>}
                {photosList.length > 0 ?
                    <InfiniteScroll
                        dataLength={photosList.length} //This is important field to render the next data
                        next={loadMore}
                        hasMore={!isLast}
                        loader=""
                    >
                        <ul className={`grid grid-rows-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6`}>

                            {
                                (columnsPhotos.map((column: TypePhoto[], columnIndex: number) =>
                                (
                                    <div key={columnIndex} className={'flex flex-col gap-y-6'}>
                                        {column.map((item: TypePhoto, index: number) => (
                                            <li className={"item"} key={index}>
                                                {item.path ? <div onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => goToPhotoPage(event, item)}>
                                                    <div className={'item__container mx-auto w-full'}>
                                                        <div className="md:hidden">
                                                            <div className="item__context">
                                                                <AuthorInfo author={item.author}></AuthorInfo>
                                                            </div>
                                                        </div>

                                                        <div className={"item__img w-full cursor-zoom-in"} style={{ height: 'auto' }}>
                                                            {/* <PhotoComponent photo="" /> */}
                                                            <div className="w-full bg-gray-300 min-h-60">
                                                                <PhotoComponent photo={item} />
                                                            </div>

                                                        </div>
                                                        <div className={"item__context text-left text-xl"}>
                                                            <div className="item__top">
                                                                <div className="ml-auto w-fit">
                                                                    <LikeBtn photoId={item._id} liked={item.liked}>
                                                                    </LikeBtn>
                                                                </div>
                                                            </div>
                                                            <div className="item__bottom hidden md:block">
                                                                <AuthorInfo author={item.author}></AuthorInfo>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                    : <Skeleton variant="rectangular" width={'100%'} height={300} />}



                                            </li>)
                                        )}
                                    </div>
                                )

                                ))
                            }


                        </ul>

                    </InfiniteScroll>


                    :
                    <div className="flex justify-center">
                        <img src="/img_empty-states.jpg" alt="img_empty-states.jpg" width="300" />
                    </div>
                }
            </div>

        </main>
    );
}
