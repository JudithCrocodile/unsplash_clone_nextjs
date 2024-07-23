import Image from "next/image";
import { Inter } from "next/font/google";
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [emblaRef] = useEmblaCarousel()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      

      <div className="detail">
        <div className="detail__carousel">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">Slide 1</div>
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
