import React, { useState } from 'react';

//fetch
import useSWR from 'swr'

//SWIPER AND COMPONENTS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/sections.css'

// functions helpers
import differenceInDays from 'date-fns/formatRelative'
import frLocale from 'date-fns/locale/fr'
import fromSecondsToMinutes from '../helpers/fromSecondsToMinutes'

// videos
import { FaPlay } from "react-icons/fa";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Sections() {
    const { data: data1, error: error1 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=3', fetcher);
    const { data: data2, error: error2 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=10', fetcher);
    const { data: data3, error: error3 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=4', fetcher);
    const [selectedSeason, setSelectedSeason] = useState(0);

    if (error1 || error2 || error3) {
        return <div>Failed to load</div>;
    }

    if (!data1 || !data2 || !data3) {
        return <div>Loading...</div>;
    }

    function filterVideosBySeason(videos, season) {
        // Implémentez la logique de filtrage ici
        return videos.filter(video => video.season === season);
    }

    const filteredReplayVideos = filterVideosBySeason(data2.data, selectedSeason);

    const section3Videos = data3.data.map(item => (
        "test"
    ));


    return (
        <>
            {/* first section */}
            <section id="section-1" className="z-10 pt-[126px] pb-[64px] pl-[80px]">
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
                    {data1.data &&
                        data1.data.map(item => {
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
                        })
                    }
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </Swiper>
            </section>

            {/* second section */}
            <section id="section-2" className="z-10 pl-[80px]">
                <h2 className="h2">Derniers replays</h2>
                <Swiper
                    slidesPerView={4.3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper2 mb-[110px]"
                >
                    {data2.data &&
                        data2.data.map(item => {
                            return (
                                <SwiperSlide key={item.id} className="rounded overflow-hidden !grid">
                                    <div className="black-gradient row-[1] col-[1] w-full h-full z-[1]"></div>
                                    <img
                                        className="row-[1] col-[1]"
                                        src={`https://api.brest.life/assets/${item.cover}`}
                                        alt=""
                                    />
                                    <div className="row-[1] col-[1] ml-[20px] pb-[15px] self-end z-[2]">
                                        <div id="playerButton" className="player_button text-xl"><FaPlay /></div>
                                    </div>
                                    <p className="font-custom text-3xl uppercase">{item.title}</p>
                                    <span>{differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} • {fromSecondsToMinutes(`${item.duration}`)}</span>
                                </SwiperSlide>
                            )
                        })
                    }
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </Swiper>


                <h2 className="h2">Retour sur les matchs</h2>

                <Swiper
                    slidesPerView={2.8}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper2"
                >
                    {data3.data &&
                        data3.data.map(item => {
                            return (
                                <SwiperSlide key={item.id} className="rounded overflow-hidden !grid">
                                    <div className="black-gradient row-[1] col-[1] w-full h-full z-[1]"></div>
                                    <img
                                        className="row-[1] col-[1]"
                                        src={`https://api.brest.life/assets/${item.cover}`}
                                        alt=""
                                    />
                                    <div className="row-[1] col-[1] ml-[20px] pb-[15px] self-end z-[2]">
                                        <div id="playerButton" className="player_button text-xl"><FaPlay /></div>
                                    </div>
                                    <p className="font-custom text-3xl uppercase">{item.title}</p>
                                    <span>{differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} • {fromSecondsToMinutes(`${item.duration}`)}</span>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </section>
        </>
    )
}
