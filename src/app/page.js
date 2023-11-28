'use client'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import '../app/styles/page.css'
import differenceInDays from 'date-fns/formatRelative'
import frLocale from 'date-fns/locale/fr'

//fetch
import useSWR from 'swr'

//SWIPER AND COMPONENTS
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles/carousel.module.css';

// videos
import { FaPlay } from "react-icons/fa";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  const { data, error } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=3', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  const fromSecondsToMinutes = (value) => {
    const sec = parseInt(value, 10)
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds

    if (hours === '00') return `${minutes}:${seconds}`
    else return `${hours}:${minutes}:${seconds}`
  }

  const today = new Date();
  const directVideos = data.data.map(item => {
    const date = new Date(item.date_published)
    return (
      <SwiperSlide key={item.id} className="rounded overflow-hidden !grid">
        <img
          className="row-[1] col-[1]"
          src={`https://api.brest.life/assets/${item.cover}`}
          alt=""
        />
        <div className="mb- row-[1] col-[1] ml-[20px] pb-[84px] self-end">
          <p className="font-custom text-3xl uppercase">{item.title}</p>
          <span>{differenceInDays(date, today, { addSuffix: true, locale: frLocale })} • {fromSecondsToMinutes(`${item.duration}`)}</span>
        </div>
        <div id="playerButton" className="player row-[1] col-[1] ml-[20px] mb-[15px] self-end text-xl"><FaPlay /></div>
      </SwiperSlide>
    )
  });

  return (
    <main className="flex max-w-screen min-h-screen flex-col">
      <Navbar isLive={isLive} />

      {/* first section */}
      <section id="section_direct" className="z-10 pt-[126px] pb-[64px] pl-[80px]">
        <Swiper
          slidesPerView={2.1}
          spaceBetween={18}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="mySwiper"
        >
          {directVideos}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </section>

      {/* second section */}
      <section id="last_replays" className="z-10 h-[534px] pl-[80px]">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper2"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
        </Swiper>
      </section>

      {/* third section */}
      <section id="matchs" className="z-10 h-[534px] pl-[80px]">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper3"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
        </Swiper>
      </section>


      {/* ellipsis */}
      <div className="ellipsis top-[-14px] left-[-370px] z-0"></div>
      <div className="ellipsis top-[44px] right-[-541px] z-0"></div>

      <Footer></Footer>
    </main>
  )
}
