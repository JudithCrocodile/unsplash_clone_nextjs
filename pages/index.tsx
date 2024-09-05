import { Inter } from "next/font/google";
import Photo from '../components/photoDialog'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head';

import PhotoList from '../components/photoList'

const inter = Inter({ subsets: ["latin"] });

export default function Home({ }) {
  const searchParams = useSearchParams()

  const photoId: string | null = searchParams.get('photoId')

  return (
    <>
      <Head>
        <title>Beautiful Free Images & Pictures | Unsplash</title>
      </Head>
      <main
      >
        <PhotoList></PhotoList>
        {photoId && <div><Photo photoId={photoId}></Photo></div>}

      </main>
    </>

  );
}
