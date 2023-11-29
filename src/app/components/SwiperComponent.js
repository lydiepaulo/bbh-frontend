import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import differenceInDays from 'date-fns/formatRelative'
import frLocale from 'date-fns/locale/fr'
import fromSecondsToMinutes from '../helpers/fromSecondsToMinutes'
import { handleMouseOver, handleMouseLeave } from '../helpers/handleMouseOverAndLeave'
import { FaPlay } from 'react-icons/fa'
import '../styles/swipercomponent.css'

export default function SwiperComponent({ id, slidesPerView, data, play = true, subtitle = false, height = '200px', timing = true, videos = false }) {
    const [hoveredItems, setHoveredItems] = useState(Array(data.length).fill(false))
    const playlistStyle = videos ? 'playlist' : ''

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
            {data.map((item, index) => {
                return (
                    <SwiperSlide
                        key={item.id}
                        className="small-swiper overflow-hidden !grid text-[var(--white)] origin-top-left hover:!scale-[1.02] !pb-3 transition-transform duration-500"
                        onMouseOver={() => handleMouseOver(index, hoveredItems, setHoveredItems)}
                        onMouseLeave={() => handleMouseLeave(index, hoveredItems, setHoveredItems)}
                    >
                        {hoveredItems[index] && play && (
                            <>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${item.youtube_id}?rel=0&showinfo=0&autoplay=1&loop=1&modestbranding=1&mute=1`}
                                    title={`${item.title}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="z-20 row-[1] col-[1] opacity-100 transition-all duration-1000 rounded-lg"></iframe>
                                <div className={`black-gradient row-[1] col-[1] w-full h-[${height}] z-[2] rounded-lg flex justify-center items-center`}>
                                    <div id="playerButton" className="player-button text-xl opacity-100 transition-opacity duration-500">
                                        <FaPlay />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className={`${playlistStyle} row-[1] col-[1] h-[${height}]`}>
                            <img className="w-full object-cover rounded-lg" src={`https://api.brest.life/assets/${item.cover}`} alt={item.title} />
                        </div>
                        {subtitle &&
                            <p className="">{item.title}</p>}
                        <p className="font-custom text-xl uppercase">{item.title}</p>
                        {timing &&
                            <span>
                                {differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} •{' '}
                                {fromSecondsToMinutes(`${item.duration}`)}
                            </span>}
                        {videos && <span>{item.video.length} vidéos</span>}
                    </SwiperSlide>
                );
            })}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </Swiper>
    );
}
