import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import OperationLine from '../components/operationLine'
import AuthorInfo from '../components/authorInfo'
import useSWR from 'swr';
import { TypePhoto } from '@/types'
import { TypeTag } from '@/types'
import { Input, Tabs, Tab, Button } from '@mui/material';

const fetcher = (url: string, params: object) => fetch(`api${url}`, params).then((res => res.json()))
const inter = Inter({ subsets: ["latin"] });

export default function PhotoList({ propTabId, showCategoryBar = true, showTitle = true }: {propTabId: string[], showCategoryBar: boolean, showTitle: boolean}) {
    const [columns, setColumns] = useState(3);
    const [columnsPhotos, setColumnsPhotos] = useState([[]]);
    const [currentTab, setCurrentTab] = React.useState<TypeTag | null>(null)
    const [currentTabName, setCurrentTabName] = React.useState<string>('Photos')

    const [windowSize, setWindowSize] = useState({
        width: 0,
        // height: 0
    })

    useEffect(() => {
        getPhotoList(1)
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



    const [photosList, setPhotosList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPhotoList = (page: number): void => {
        if(page === 1){
            setPhotosList([])
        }
        const params = JSON.stringify({
            page,
            tabId: propTabId || currentTab?._id
        })
        setLoading(true)
        fetcher('/photo/get-photo-page', {
            method: 'POST',
            body: params
        }).then(res => {
            if (res.status === 200) {
                const newPhotoList: TypePhoto[] = [...photosList, ...res.data.photos]


                setPhotosList(newPhotoList)

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
        for (let i = 0; i < columns; i++) {
            const size = photosList.length / columns
            const columnPhoto = allPhotoList.splice(i * size, ((i + 1) * size))

            columnData[i] = columnPhoto
        }

        columnData[columnData.length - 1] = [...columnData[columnData.length - 1], ...allPhotoList] // remainder
        setColumnsPhotos(columnData)
    }

    const router = useRouter()
    const searchParams = useSearchParams()

    const photoId = searchParams.get('photoId')

    const goToPhotoPage = (e: Event, item: TypePhoto) => { e.stopPropagation(); router.push(`/?photoId=${item._id}`, undefined, { shallow: true }) }

    const [allTabs, setAllTabs] = React.useState<TypeTag[]>([]);
    const [getTabLoading, setGetTabLoading] = React.useState(false)

    const getAllTabs = (): void => {
        if(!showCategoryBar) return;
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

    
    const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
        const newTab: TypeTag | undefined = allTabs.find(t => t.name === newValue)
        if (newTab) {
            setCurrentTab(newTab)
            setCurrentTabName(newTab.name)

        } else {
            setCurrentTab(null)
            setCurrentTabName('Photos')
        }
        getPhotoList(1);

    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center ${inter.className}`}
        >

{
                (showCategoryBar && !getTabLoading) && <div className="category w-full px-6">
                    <Tabs textColor="secondary" indicatorColor="secondary" value={currentTabName} onChange={handleCategoryChange} aria-label="category tabs" variant="scrollable"
                        scrollButtons="auto" allowScrollButtonsMobile sx={{ '.MuiTabs-flexContainer': { gap: '24px' } }}>
                        <Tab value="Photos" label='Photos' sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} />

                        {
                            allTabs.map((tab: TypeTag, tabIndex: number) =>
                                (<Tab value={tab.name} sx={{ paddingLeft: 0, paddingRight: 0, minWidth: 'unset' }} key={tabIndex} label={tab.name} />)
                            )
                        }
                    </Tabs>

                </div>
            }

            <div className={`mt-20 pb-12 px-12 lg:px-24 px-6 w-full ${!showTitle && 'mt-0 px-0'}`}>
                {showTitle && <h2 className={'mb-12 text-3xl'}>List</h2>}
                <ul className={`grid gap-2 gap-y-2 lg:gap-8 grid-rows-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1`}>

                    {
                        !loading ? columnsPhotos.map((column: TypePhoto[], columnIndex: number) =>
                        (<div key={columnIndex} className={'flex flex-col gap-y-2'}>
                            {column.map((item: TypePhoto, index: number) => (
                                <li className={"item cursor-pointer"} key={index}>
                                    <div onClick={(event) => goToPhotoPage(event, item)}>
                                        <div className={'item__container mx-auto w-full'}>
                                            <div className={"item__img w-full"} style={{ height: 'auto' }}>
                                                <img src={item.path} alt="" />
                                            </div>
                                            <div className={"item__context text-left text-xl"}>
                                                <div className="item__top">
                                                    <div className="ml-auto w-fit">
                                                        {/* {item.liked} */}
                                                        <OperationLine>
                                                        </OperationLine>
                                                    </div>
                                                </div>
                                                <div className="item__bottom">
                                                    <AuthorInfo authorAavatar={item.authorAavatar} author={item.author}></AuthorInfo>
                                                </div>

                                            </div>

                                        </div>
                                    </div>



                                </li>)
                            )}
                        </div>)

                        )
                            :
                            <div>Loading...</div>
                    }
                </ul>
            </div>

        </main>
    );
}
