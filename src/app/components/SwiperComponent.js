import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// functions helpers
import differenceInDays from 'date-fns/formatRelative'
import frLocale from 'date-fns/locale/fr'
import fromSecondsToMinutes from '../helpers/fromSecondsToMinutes'

import { FaPlay } from "react-icons/fa";

export default function SwiperComponent({ id, slidesPerView, data, subtitle }) {
    return (
        <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Navigation]}
            className={`mySwiper${id} mb-16`}
        >
            {data.data &&
                data.data.map(item => {
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
                            <p className="">{subtitle}</p>
                            <p className="font-custom text-3xl uppercase">{item.title}</p>
                            <span>{differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} • {fromSecondsToMinutes(`${item.duration}`)}</span>
                        </SwiperSlide>
                    )
                })
            }
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </Swiper>
    )
}
