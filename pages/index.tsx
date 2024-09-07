import { Inter } from "next/font/google";
import Photo from '../components/photoDialog'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head';
import Search from '@/components/search'
import PhotoList from '../components/photoList'

const inter = Inter({ subsets: ["latin"] });

export default function Home({ }) {
  const searchParams = useSearchParams()

  const photoId: string | null = searchParams.get('photoId')

  const pageIntro = (): React.ReactNode=>{
    return <div className="py-14">
      <div className="flex">
        <div className="min-h-fit md:min-h-[226px] flex flex-col justify-start md:justify-end md:basis-[40%] basis-full px-3 md:px-0">
          <h2 className={'mb-2 text-2xl md:text-[40px] font-bold leading-[1.2]'}>Unsplash</h2>
          <div className="mb-4">
            <p className="text-lg">The internet’s source for visuals.</p>
            <p className="text-lg">Powered by creators everywhere.</p>            
          </div>

          <Search round="rounded-lg"></Search>        
        </div>        
      </div>


    </div>

  }

  return (
    <>
      <Head>
        <title>Beautiful Free Images & Pictures | Unsplash</title>
      </Head>
      <main
      >
        <PhotoList pageIntro={pageIntro()}></PhotoList>
        {photoId && <div><Photo photoId={photoId}></Photo></div>}

      </main>
    </>

  );
}
