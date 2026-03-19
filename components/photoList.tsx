import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import LikeBtn from '@/components/likeBtn'
import AuthorInfo from '../components/authorInfo'
import { TypePhoto } from '@/types'
import { TypeTag } from '@/types'
import Divider from '@mui/material/Divider';
import { StyledTabs, CustomerTab } from '@/components/tab'
import Skeleton from '@mui/material/Skeleton';
import PhotoComponent from '@/components/photoComponent'
import { useSelector } from 'react-redux';
import type { RootState } from '@/store'
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from "next/image";
import { photoApi, tabApi } from '@/lib/api';

interface StyledTabsProps {
    label: string;
}

const inter = Inter({ subsets: ["latin"] });

export default function PhotoList({ propTabId, showCategoryBar = true, showTitle = true, propTabName = null, userName = undefined, fullHeight = true, onlyShowLiked = false, inDetailPage = false, pageIntro }: { propTabId?: string[], showCategoryBar?: boolean, showTitle?: boolean, category?: string | null, userName?: string | string[] | undefined, propTabName?: string | null, fullHeight?: boolean, onlyShowLiked?: boolean, inDetailPage?: boolean, pageIntro?: React.ReactNode }) {

    const router = useRouter()

    const [columns, setColumns] = useState(3);
    const token = useSelector((state: RootState) => state.auth.token)
    const [photosList, setPhotosList] = useState<TypePhoto[]>([]);
    const [loading, setLoading] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [allTabs, setAllTabs] = React.useState<TypeTag[]>([]);
    const [getTabLoading, setGetTabLoading] = React.useState(false)

    const emptyItems = Array.from({ length: 10 }, (_, index) => index); // 用於顯示 skeleton 的空項目列表

    const routerCategory = typeof router.query.category === 'string' ? router.query.category : null;
    const currentTab: TypeTag | null = allTabs.find(e => e.name === routerCategory) ?? null;

    const selectedTabName = currentTab?.name || 'Photos'

    const activeTabId = propTabId || currentTab?._id;

    const queryParams = useMemo(() => {
        return {
            tabId: activeTabId,
            category: propTabName,
            userName,
            onlyShowLiked,
        }
    }, [activeTabId, propTabName, userName, onlyShowLiked])

    const queryKey = useMemo(() => {
        return JSON.stringify(queryParams)
    }, [queryParams])

    const previousQueryKeyRef = useRef(queryKey)

    // reset photo list when category or userName or liked filter changed
    useEffect(() => {
        setCurrentPage(1)
        setIsLast(false)
        setPhotosList([])
    }, [queryParams])

    // 取得照片列表
    useEffect(() => {
        let canceled = false;

        const queryChanged = previousQueryKeyRef.current !== queryKey;

        // skip if query changed and current page is not 1, because the effect will be triggered again with page reset to 1
        if (queryChanged && currentPage !== 1) {
            previousQueryKeyRef.current = queryKey;
            return;
        }

        const params = {
            ...queryParams,
            page: currentPage,
        }

        setLoading(true)
        photoApi.getPhotoPage(token || '', params).then(res => {
            if (canceled) return;

            const data = res.data;

            if (res.status === 200 && data) {
                if (currentPage === 1) {
                    setPhotosList([...data.photos])
                } else {

                    setPhotosList((prev) => [...prev, ...data.photos])
                }

                setIsLast(data.isLast)
            }
        }).finally(() => {
            if (!canceled) {
                setLoading(false)
            }
        })

        return () => {
            canceled = true;
        }
    }, [currentPage, token, queryParams])

    useEffect(() => {
        function handleResize() {

            if (window.innerWidth > 1024) { //lg

                setColumns(3)
            } else if (window.innerWidth > 768 || inDetailPage) { // md or in detail page
                setColumns(2)
            } else {
                setColumns(1)
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize)
    }, [inDetailPage])


    const loadMore = () => {
        if (!isLast && !loading) {

            setCurrentPage((prev) => prev + 1)
        }

    }

    // set photo list by columns
    const columnsPhotos: TypePhoto[][] = useMemo(() => {
        const allPhotoList = [...photosList]
        const columnData: TypePhoto[][] = []
        const size = Math.ceil(photosList.length / columns) // size of each column

        for (let i = 0; i < columns; i++) {
            const columnPhoto = allPhotoList.splice(0, size)
            columnData[i] = columnPhoto
        }

        columnData[columnData.length - 1] = [...columnData[columnData.length - 1], ...allPhotoList] // remainder
        return columnData;
    }, [columns, photosList])


    const goToPhotoPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: TypePhoto) => { e.stopPropagation(); router.push(`/?photoId=${item._id}`, undefined, { shallow: true }) }

    // 取得所有tab清單
    useEffect(() => {
        if (!showCategoryBar) return;
        setGetTabLoading(true)
        tabApi.getTabs().then(res => {
            if (res.status === 200 && res.data) {
                setAllTabs(res.data)
            }
        }).finally(() => {
            setGetTabLoading(false)
        })
    }, [showCategoryBar])

    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
        if (newValue === 'Photos') {
            router.push(`/`)
            return;
        }
        router.push(`/s/photos/${newValue}`)
    }

    return (
        <main
            className={`flex ${fullHeight && 'min-h-screen'} flex-col items-center ${inter.className}`}
        >
            {
                (showCategoryBar && !getTabLoading) &&
                <div className="category w-full px-6 flex gap-6 items-center">
                    <StyledTabs value={selectedTabName} onChange={handleCategoryChange} aria-label="category tabs" variant="scrollable"
                        scrollButtons="auto" allowScrollButtonsMobile sx={{ '.MuiTabs-flexContainer': { gap: '24px' } }}>
                        <CustomerTab value="Photos" label='Photos' sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} />
                        <div className="self-center relative" style={{ backgroundColor: '#d1d1d1', height: '32px', width: '1px' }}>
                            <span className="text-[#767676] text-[10px] tracking-[0.1px] absolute top-0 left-4 left-[24px] -translate-y-2.5">Featured</span>
                        </div>

                        {
                            allTabs.map((tab: TypeTag) =>
                                (<CustomerTab value={tab.name} sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} key={tab._id} label={tab.name} />)
                            )
                        }
                    </StyledTabs>

                </div>

            }
            {showCategoryBar && <Divider className="w-full" sx={{ marginTop: '-1px' }}></Divider>}
            <div className={`pb-12 ${(inDetailPage || columns === 1) ? 'px-0' : 'px-6'} w-full max-w-[1336px] ${!showTitle && 'mt-0 px-0'}`}>
                {pageIntro}
                {photosList.length > 0 ?
                    <InfiniteScroll
                        dataLength={photosList.length} //This is important field to render the next data
                        next={loadMore}
                        hasMore={!isLast}
                        loader=""
                    >
                        <ul className={`grid grid-rows-auto ${columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>

                            {
                                (columnsPhotos.map((column: TypePhoto[], columnIndex: number) =>
                                (
                                    <div key={columnIndex} className={'flex flex-col gap-y-6'}>
                                        {column.map((item: TypePhoto, index: number) => (
                                            <li className={"item"} key={item._id}>
                                                {item.path ? <div onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => goToPhotoPage(event, item)}>
                                                    <div className={'item__container mx-auto w-full'}>
                                                        <div className="md:hidden">
                                                            <div className="item__context">
                                                                <AuthorInfo author={item.author}></AuthorInfo>
                                                            </div>
                                                        </div>

                                                        <div className={"item__img w-full cursor-zoom-in"} style={{ height: 'auto' }}>
                                                            {/* <PhotoComponent photo="" /> */}
                                                            <div className="w-full bg-gray-300 min-h-auto">
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
                    loading ? <ul className={`grid grid-rows-auto ${columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-1'} gap-6`}>
                        {(columnsPhotos.map((column: TypePhoto[], columnIndex: number) => (<div key={columnIndex} className={'flex flex-col gap-y-6'}>
                            {emptyItems.map((item) => (
                                <li className={"item"} key={item}><Skeleton variant="rectangular" width={'100%'} height={300} /></li>
                            ))}
                        </div>)
                        ))}

                    </ul>
                        :
                        <div className="flex justify-center">
                            <Image src="/img_empty-states.jpg" alt="img_empty-states.jpg" width="300" height="225" />
                        </div>


                }
            </div>

        </main>
    );
}
