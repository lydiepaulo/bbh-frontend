import React, { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa";
import '../styles/navbar.css'

export default function Navbar({ isLive }) {
    const [isScrolled, setIsScrolled] = useState(false);

    // add a background on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const navClass = isScrolled ? 'scrolled' : '';

    return (
        <nav className={`z-20 fixed w-screen grid grid-cols-[1fr,auto,1fr] items-center h-[86px] py-[12px] px-[42px] ${navClass}`}>
            <div className="flex gap-[20px]">
                <a href="">Accueil</a>
                <a href="">Playlist</a>
                {isLive && <a href="" className="live">Direct</a>}
            </div>
            <div>
                <img alt="logo" src="/images/logo.svg" />
            </div>
            <a
                href="https://www.brest-bretagnehandball.fr/"
                target="_blank"
                className="ml-[auto]"
            >
                <button className="flex gap-2 items-center backdrop-blur-md px-4 py-2 rounded-xl bg-white/20">
                    <span>bbh.bzh</span>
                    <FaChevronRight />
                </button>
            </a>
        </nav>
    );
}
