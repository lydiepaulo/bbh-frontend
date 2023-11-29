import React, { useState } from 'react';

//fetch
import useSWR from 'swr'

//SWIPER AND COMPONENTS
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/sections.css'

// videos
import SwiperHeader from './SwiperHeader';
import SwiperComponent from './SwiperComponent';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Sections() {
    const seasons = [
        '2023-2024',
        '2021-2022',
        '2019-2020',
        '2018-2019'
    ];

    const [selectedSeason, setSelectedSeason] = useState([]);

    const { data: data1, error: error1 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=3', fetcher);
    const { data: data2, error: error2 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=10', fetcher);
    const { data: data3, error: error3 } = useSWR('https://api.brest.life/items/video?filter={"title":{"_contains":"Retour%20sur%20le%20match"}}&sort=-date_published', fetcher);
    const { data: data4, error: error4 } = useSWR('https://api.brest.life/items/video?filter={"title":{"_contains":"saga"}}&sort=title', fetcher);
    const { data: data5, error: error5 } = useSWR('https://api.brest.life/items/video?sort=-view_count&limit=10', fetcher);
    const { data: data6, error: error6 } = useSWR('https://api.brest.life/items/playlist', fetcher);

    if (error1 || error2 || error3 || error4 || error5 || error6) {
        return <div>Failed to load</div>;
    }

    if (!data1 || !data2 || !data3 || !data4 || !data5 || !data6) {
        return <div>Loading...</div>;
    }

    const handleSeasonClick = (season) => {
        if (selectedSeason.includes(season)) {
            // Unselect the season if it's already selected
            setSelectedSeason([]);
        } else {
            // Unselect the currently selected season and select the clicked one
            setSelectedSeason([season]);
        }
    };

    function filterVideosBySeason(videos) {
        if (selectedSeason.length === 0) return videos;
        return videos.filter(video => {
            const regex = new RegExp(video.date_published.slice(0, 4));
            return regex.test(selectedSeason[0]);
        });
    }

    const filteredReplayVideos = filterVideosBySeason(data3.data)

    return (
        <>
            {/* section 1 */}
            <section id="section-1" className="z-10 pt-[126px] pl-20 pb-20">
                <SwiperHeader slidesPerView={2.1} data={data1.data} />
            </section>

            {/* section 2 */}
            <section id="section-2" className="z-10 pl-20">
                <h2 className="h2">Derniers replays</h2>
                <SwiperComponent slidesPerView={4.3} data={data2.data} />

                <h2 className="h2">Retour sur les matchs</h2>
                {seasons.map(season => (
                    <button
                        key={season}
                        className={`mr-4 mb-4 px-4 py-2 rounded-3xl ${selectedSeason.includes(season) ? 'border bg-white/10 text-white' : 'border'}`}
                        onClick={() => handleSeasonClick(season)}
                    >
                        {season}
                    </button>
                ))}
                <SwiperComponent slidesPerView={2.8} data={filteredReplayVideos} height={270} />
            </section>

            {/* section 3 */}
            <section id="section-3" className="z-10 px-20">
                <div className="section-3__container px-[24px] pt-[260px] rounded-3xl">
                    <SwiperComponent slidesPerView={4} data={data4.data} />
                </div>
            </section>

            {/* section 4 */}
            <section id="section-4" className="z-10 pl-20">
                <h2 className="h2">Les plus regardés</h2>
                <SwiperComponent slidesPerView={4.3} data={data5.data} />
            </section>

            {/* section 5 */}
            <section id="section-5" className="z-10 pl-20">
                <h2 className="h2">Toutes nos playlists</h2>
                <SwiperComponent slidesPerView={2.8} data={data6.data} play={false} timing={false} videos={true} />
            </section>
        </>
    )
}
