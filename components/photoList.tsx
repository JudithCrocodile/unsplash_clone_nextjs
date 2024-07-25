import Image from "next/image";
import Link from 'next/link'
import { Inter } from "next/font/google";
import StarIcon from '@mui/icons-material/Star';
import Icon from '@mui/material/Icon';
import { useRouter } from 'next/router'
import Photo from '../components/photo'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Button} from '@mui/material';
import OperationLine from '../components/operationLine'
import AuthorInfo from '../components/authorInfo'

const inter = Inter({ subsets: ["latin"] });

export default function Home({ }) {
  const router = useRouter()
  const searchParams = useSearchParams()
 
  const photoId = searchParams.get('photoId')

  const itemList = [
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      liked: false,

    },


  ]

  const goToPhotoPage = (e, item) => {e.stopPropagation(); router.push(`/?photoId=${item.id}`, undefined, { shallow: true })}

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >      
      {/* <div className={"hero w-full px-16 py-24"}>
        <h1 className={'text-7xl'}>Yelp Plant</h1>
      </div> */}

      

      <div className={'mt-20 pb-12 px-12 lg:px-24 px-6 w-full'}>
        <h2 className={'mb-12 text-3xl'}>List</h2>
        <ul className={'grid gap-2 gap-y-2 lg:gap-8 grid-rows-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1'}>

          {
            itemList.map((item, index) =>           
            <li className={"item cursor-pointer"} key={index}>
              <div onClick={(event)=>goToPhotoPage(event, item)}>
                  <div className={'item__container mx-auto w-full'}>
                    <div className={"item__img w-full"} style={{backgroundImage: `url(${item.img})`, height: '200px'}}></div>
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
          }
        </ul>
      </div>

      {/* {photoId && <div><Photo></Photo></div>} */}
    
    </main>
  );
}
