import Image from "next/image";
import { Inter } from "next/font/google";
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'


const inter = Inter({ subsets: ["latin"] });

export default function Detail() {
  const itemDetail = 
    {
      id: 0,
      img: 'https://images.unsplash.com/photo-1476066522440-e1e84d4301bb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful flower',
      descriptio: 'very beautiful flower in the park',
      author: 'Anderson',
      stars: 5
    }

    const [emblaRef] = useEmblaCarousel()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      

      <div className="detail">
        <div className="detail__carousel">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">
                      <Image src={itemDetail.img} width="100" height="100" ></Image>
                    </div>
                    <div className="embla__slide">Slide 2</div>
                    <div className="embla__slide">Slide 3</div>
                </div>
            </div>

        </div>
        <div className="detail__description">
            <h2>A Normal Tree</h2>
            <p>A Normal Tree</p>

        </div>

      </div>

      <div className="comment">

        <ul>
            <li></li>
        </ul>

      </div>





    </main>
  );
}
