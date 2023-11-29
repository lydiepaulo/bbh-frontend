'use client'
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel, Pagination, Navigation } from 'swiper/modules'

// functions helpers
import differenceInDays from 'date-fns/formatRelative'
import frLocale from 'date-fns/locale/fr'
import fromSecondsToMinutes from '../helpers/fromSecondsToMinutes'
import { handleMouseOver, handleMouseLeave } from '../helpers/handleMouseOverAndLeave'

import { FaPlay } from "react-icons/fa";

export default function SwiperHeader({ slidesPerView, data }) {
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);

    const [hoveredItems, setHoveredItems] = useState(Array(data.length).fill(false));

    return (
        <div>
            <Swiper
                slidesPerView={slidesPerView}
                keyboard={true}
                direction="horizontal"
                mousewheel={true}
                spaceBetween={18}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                className="mySwiper"
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={item.id}
                            onMouseOver={() => handleMouseOver(index, hoveredItems, setHoveredItems)}
                            onMouseLeave={() => handleMouseLeave(index, hoveredItems, setHoveredItems)}
                            className="rounded overflow-hidden !grid">
                            {hoveredItems[index] && (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${item.youtube_id}?rel=0&showinfo=0&autoplay=1&loop=1&modestbranding=1&mute=1`}
                                    title={`${item.title}`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                    className="z-20 row-[1] col-[1] opacity-100 transition-all duration-1000 rounded-lg"></iframe>
                            )}
                            <div className="black-gradient row-[1] col-[1] w-full h-full z-[1] hover:!scale-[1.02] transition-transform duration-500"></div>
                            <img
                                className="row-[1] col-[1]"
                                src={`https://api.brest.life/assets/${item.cover}`}
                                alt={item.title}
                            />
                            <div className="row-[1] col-[1] ml-[20px] pb-[15px] self-end z-[2]">
                                <p className="font-custom text-3xl uppercase">{item.title}</p>
                                <span>{differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} • {fromSecondsToMinutes(`${item.duration}`)}</span>
                                <div id="playerButton" className="player-button text-xl"><FaPlay /></div>
                            </div>
                        </SwiperSlide>
                    )
                })
                }
            </Swiper>
            <div>
                <button ref={navigationPrevRef}>Prev</button>
                <button ref={navigationNextRef}>Next</button>
            </div>
        </div>
    )
}