import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import OperationLine from '../components/operationLine'
import AuthorInfo from '../components/authorInfo'
import useSWR from 'swr';
import { TypePhoto } from '@/types'
import { Height } from "@mui/icons-material";

const fetcher = (url: string) => fetch(`api${url}`).then((res => res.json()))
const inter = Inter({ subsets: ["latin"] });

export default function PhotoList({ }) {
    const [columns, setColumns] = useState(3);

    const [windowSize, setWindowSize] = useState({
        width: 0,
        // height: 0
    })

    useEffect(()=>{
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                // height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return ()=>window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(()=>{
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                // height: window.innerHeight,
            })

            if(window.innerWidth>1024){ //lg
                setColumns(3)
            } else if(window.innerWidth>768){ // md
                setColumns(2)
            }else {
                setColumns(1)
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return ()=>window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(()=>{
        getPhotoList()
    }, [columns])

    const [photosList, setPhotosList] = useState([[]]);
    const [loading, setLoading] = useState(false);

    const getPhotoList = (): void => {
        setLoading(true)
        fetcher('/photo/get-photo-page').then(res => {
            if (res.status === 200) {
                const newPhotoList = [...photosList]
                for (let i = 0; i < columns; i++) {
                    const columnPhoto = res.data.slice(i * columns, (i + 1) * columns)

                    newPhotoList[i] = columnPhoto
                }

                setPhotosList(newPhotoList)

                // setPhotosList(res.data)
                setLoading(false)
            }
        })
    }

    const router = useRouter()
    const searchParams = useSearchParams()

    const photoId = searchParams.get('photoId')

    const goToPhotoPage = (e: Event, item: TypePhoto) => { e.stopPropagation(); router.push(`/?photoId=${item.id}`, undefined, { shallow: true }) }

    return (
        <main
            className={`flex min-h-screen flex-col items-center ${inter.className}`}
        >
            <div className={'mt-20 pb-12 px-12 lg:px-24 px-6 w-full'}>
                <h2 className={'mb-12 text-3xl'}>List</h2>
                <ul className={`grid gap-2 gap-y-2 lg:gap-8 grid-rows-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1`}>

                    {
                        !loading ? photosList.map((column: TypePhoto[], columnIndex: number) =>
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
