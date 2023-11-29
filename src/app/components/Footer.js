import React from 'react'
import '../styles/footer.css'

export default function Footer() {
    return (
        <div className="z-10 footer flex flex-col w-screen justify-center items-center gap-[52px] py-[124px]">
            <div className="flex gap-[56px]">
                <a href="https://www.facebook.com/BBHOfficiel" target="_blank">
                    <img src="/images/fb.svg" alt="Logo facebook" />
                </a>
                <a href="https://twitter.com/i/flow/login?redirect_after_login=%2FBBH_Officiel" target="_blank">
                    <img src="/images/x.svg" alt="Logo X" />
                </a>
                <a href="https://www.instagram.com/bbh_officiel/?hl=fr" target="_blank">
                    <img src="/images/insta.svg" alt="Logo Instagram" />
                </a>
                <a href="https://www.linkedin.com/company/bbh-business/?originalSubdomain=fr" target="_blank">
                    <img src="/images/lkdn.svg" alt="Logo Linkedin" />
                </a>
                <a href="https://www.tiktok.com/@bbhofficiel" target="_blank">
                    <img src="/images/tiktok.svg" alt="Logo Tiktok" />
                </a>
                <a href="https://www.youtube.com/c/brestbretagnehandballtv" target="_blank">
                    <img src="/images/yt.svg" alt="Logo Youtube" />
                </a>
            </div>
            <a href="https://lumy.bzh/" target="_blank">Lumy.</a>
            <div className="flex gap-4">
                <a href="" className="font-normal text-white/50">Mentions légales</a>
                <a href="" className="font-normal text-white/50">Site officiel</a>
            </div>
        </div>
    )
}
