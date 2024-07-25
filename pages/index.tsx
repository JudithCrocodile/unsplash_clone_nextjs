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
import PhotoList from '../components/photoList'

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
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5,
      authorAavatar: '',
      liked: false,

    },

  ]

  const goToPhotoPage = (e, item) => {e.stopPropagation(); router.push(`/?photoId=${item.id}`, undefined, { shallow: true })}

  return (
    <main
      
    >      
    {/* <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >       */}
      {/* <div className={"hero w-full px-16 py-24"}>
        <h1 className={'text-7xl'}>Yelp Plant</h1>
      </div> */}

      

      <PhotoList></PhotoList>
      {photoId && <div><Photo></Photo></div>}
    
    </main>
  );
}
