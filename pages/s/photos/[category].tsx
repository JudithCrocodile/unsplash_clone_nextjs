import { Inter } from "next/font/google";
import React from 'react'
import { useRouter } from 'next/router'
import PhotoList from '@/components/photoList'
import Head from 'next/head';
const inter = Inter({ subsets: ["latin"] });

export default function Photos({ }) {
  const router = useRouter()
  const category: string | string[] | undefined = router.query.category

  // todo
  // if there is no any photo in this category return 404 page

  const pageIntro = (): React.ReactNode=>{
    return <div className="py-7">
      <div className="flex">
        <div className="min-h-fit flex flex-col justify-start md:justify-end md:basis-[40%] basis-full px-3 md:px-0">
          <h1 className={'mb-2 text-[28px] font-bold leading-[1.2] capitalize'}>{category}</h1>
      
        </div>        
      </div>


    </div>

  }

  return (
    <>
      <Head>
        <title>Wallpapers | Unsplash</title>
      </Head>

      <main
      >
        <PhotoList pageIntro={pageIntro()} propTabName={category as string}></PhotoList>

      </main>
    </>

  );
}
