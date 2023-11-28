'use client'
import Navbar from './components/Navbar'

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

  const directVideos = data.data.map(item => (
    <SwiperSlide key={item.id} className="rounded overflow-hidden !grid">
      <img
        className="row-[1] col-[1]"
        src={`https://api.brest.life/assets/${item.cover}`}
        alt=""
      />
      <div className="mb- row-[1] col-[1] ml-[20px] pb-[84px] self-end">
        <p className="font-custom text-3xl uppercase">{item.title}</p>
        <span>{item.date_published} • {item.duration}</span>
      </div>
      <div id="playerButton" className="player row-[1] col-[1] ml-[20px] mb-[15px] self-end text-xl"><FaPlay /></div>
    </SwiperSlide>
  ));

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
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </section>

      {/* third section */}
      <section id="matchs">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper3"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </section>


      {/* ellipsis */}
      <div className="ellipsis top-[-14px] left-[-370px] z-0"></div>
      <div className="ellipsis top-[44px] right-[-541px] z-0"></div>
    </main>
  )
}
