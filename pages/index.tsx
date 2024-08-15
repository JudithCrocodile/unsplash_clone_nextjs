import { Inter } from "next/font/google";
import Photo from '../components/photo'
import React from 'react'
import { useSearchParams } from 'next/navigation'

import PhotoList from '../components/photoList'

const inter = Inter({ subsets: ["latin"] });

export default function Home({ }) {
  const searchParams = useSearchParams()
 
  const photoId: string = searchParams.get('photoId')

  return (
    <main
    >      
      <PhotoList></PhotoList>
      {photoId && <div><Photo photoId={photoId}></Photo></div>}
    
    </main>
  );
}
