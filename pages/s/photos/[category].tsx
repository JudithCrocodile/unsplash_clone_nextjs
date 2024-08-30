import { Inter } from "next/font/google";
import React from 'react'
import { useRouter } from 'next/router'
import PhotoList from '@/components/photoList'

const inter = Inter({ subsets: ["latin"] });

export default function Photos({ }) {
    const router = useRouter()
    const category:string|string[]|undefined = router.query.category

    // todo
    // if there is no any photo in this category return 404 page


  return (
    <main
    >      
      <PhotoList propTabName={category as string}></PhotoList>
      {/* {photoId && <div><Photo photoId={photoId}></Photo></div>} */}
    
    </main>
  );
}
