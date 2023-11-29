import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import differenceInDays from 'date-fns/formatRelative';
import frLocale from 'date-fns/locale/fr';
import fromSecondsToMinutes from '../helpers/fromSecondsToMinutes';
import { FaPlay } from 'react-icons/fa';

export default function SwiperComponent({ id, slidesPerView, data, subtitle = '', height = '200px' }) {
    const [hoveredItems, setHoveredItems] = useState(Array(data.data.length).fill(false));

    const handleMouseOver = (index) => {
        const newHoveredItems = [...hoveredItems];
        newHoveredItems[index] = true;
        setHoveredItems(newHoveredItems);
    };

    const handleMouseLeave = (index) => {
        const newHoveredItems = [...hoveredItems];
        newHoveredItems[index] = false;
        setHoveredItems(newHoveredItems);
    };

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
                data.data.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={item.id}
                            className="small-swiper overflow-hidden !grid text-[var(--white)] origin-top-left hover:!scale-[1.02] !pb-3 transition-transform duration-500"
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <div className={`black-gradient row-[1] col-[1] w-full !h-[${height}] z-[2] rounded-lg flex justify-center items-center`}>
                                {hoveredItems[index] && (
                                    <div id="playerButton" className="player-button text-xl opacity-100 transition-opacity duration-500">
                                        {/* déclencher la vidéo */}
                                        <FaPlay />
                                    </div>
                                )}
                            </div>
                            <img className={`row-[1] col-[1] w-full h-[${height}] object-cover rounded-lg`} src={`https://api.brest.life/assets/${item.cover}`} alt={item.title} />
                            <p className="">{subtitle}</p>
                            <p className="font-custom text-3xl uppercase">{item.title}</p>
                            <span>
                                {differenceInDays(new Date(item.date_published), new Date(), { addSuffix: true, locale: frLocale })} •{' '}
                                {fromSecondsToMinutes(`${item.duration}`)}
                            </span>
                        </SwiperSlide>
                    );
                })}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </Swiper>
    );
}
