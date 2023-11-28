'use client'
import '../app/styles/page.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import differenceInDays from 'date-fns/formatRelative'
import frLocale from 'date-fns/locale/fr'
import fromSecondsToMinutes from './helpers/fromSecondsToMinutes'

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

  const directVideos = data.data.map(item => {
    return (
      <SwiperSlide key={item.id} className="rounded overflow-hidden !grid">
        <div className="black-gradient row-[1] col-[1] w-full h-full z-[1]"></div>
        <img
          className="row-[1] col-[1]"
          src={`https://api.brest.life/assets/${item.cover}`}
          alt=""
        />
        <div className="row-[1] col-[1] ml-[20px] pb-[15px] self-end z-[2]">
          <p className="font-custom text-3xl uppercase">{item.title}</p>
          <span>{differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} • {fromSecondsToMinutes(`${item.duration}`)}</span>
          <div id="playerButton" className="player_button text-xl"><FaPlay /></div>
        </div>
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
