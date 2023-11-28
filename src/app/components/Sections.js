import React from 'react';

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
    const { data: data1, error: error1 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=3', fetcher);
    const { data: data2, error: error2 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=10', fetcher);
    const { data: data3, error: error3 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=10', fetcher);
    const { data: data4, error: error4 } = useSWR('https://api.brest.life/items/video?filter={"title":{"_contains":"saga"}}&sort=title', fetcher);
    const { data: data5, error: error5 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=10', fetcher);
    const { data: data6, error: error6 } = useSWR('https://api.brest.life/items/video?sort=-date_published&limit=10', fetcher);

    if (error1 || error2 || error3 || error4 || error5 || error6) {
        return <div>Failed to load</div>;
    }

    if (!data1 || !data2 || !data3 || !data4 || !data5 || !data6) {
        return <div>Loading...</div>;
    }

    if (data4.data) {
        let data4videos = data4.data
        data4videos = data4videos.map(e => {
            console.log(e.video)
            return (e.video)
        })
    }

    //const [selectedSeason, setSelectedSeason] = useState(0);

    function filterVideosBySeason(videos, season) {
        // Implémentez la logique de filtrage ici
        return videos.filter(video => video.season === season);
    }

    //const filteredReplayVideos = filterVideosBySeason(data2.data, selectedSeason);

    const section3Videos = data3.data.map(item => (
        "test"
    ));


    return (
        <>
            {/* section 1 */}
            <section id="section-1" className="z-10 pt-[126px] pl-20 pb-20">
                <SwiperHeader slidesPerView={2.1} data={data1} />
            </section>

            {/* section 2 */}
            <section id="section-2" className="z-10 pl-20">
                <h2 className="h2">Derniers replays</h2>
                <SwiperComponent slidesPerView={4.3} data={data2} />


                <h2 className="h2">Retour sur les matchs</h2>
                <SwiperComponent slidesPerView={2.8} data={data3} />
            </section>

            {/* section 3 */}
            <section id="section-3" className="z-10 px-20">
                <div className="section-3__container px-[24px] pt-[260px] rounded-3xl">
                    <SwiperComponent slidesPerView={4} data={data4} />
                </div>
            </section>

            {/* section 4 */}
            <section id="section-4" className="z-10 pl-20">
                <h2 className="h2">Les plus regardés</h2>
                {/* <SwiperComponent slidesPerView={4.3} data={data5} /> */}
            </section>

            {/* section 5 */}
            <section id="section-5" className="z-10 pl-20">
                <h2 className="h2">Toutes nos playlists</h2>
                {/* <SwiperComponent slidesPerView={2.8} data={data6} /> */}
            </section>
        </>
    )
}
