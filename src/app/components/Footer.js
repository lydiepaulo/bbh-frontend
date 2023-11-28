import React from 'react'
import '../styles/footer.css'

export default function Footer() {
    return (
        <div className="z-10 footer flex flex-col w-screen justify-center items-center gap-[52px] py-[124px]">
            <div className="flex gap-[56px]">
                <a href="">
                    <img src="/images/fb.svg" alt="" />
                </a>
                <a href="">
                    <img src="/images/x.svg" alt="" />
                </a>
                <a href="">
                    <img src="/images/insta.svg" alt="" />
                </a>
                <a href="">
                    <img src="/images/lkdn.svg" alt="" />
                </a>
                <a href="">
                    <img src="/images/tiktok.svg" alt="" />
                </a>
                <a href="">
                    <img src="/images/yt.svg" alt="" />
                </a>
            </div>
            <a href="">Lumy.</a>
            <div className="flex gap-4">
                <a href="">Mentions légales</a>
                <a href="">Site officiel</a>
            </div>
        </div>
    )
}
