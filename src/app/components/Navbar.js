'use client'
import React, { useState } from 'react'
import Logo from "../../../public/images/logo.svg"

export default function Navbar({ isLive }) {
    return (
        <nav className="z-20 fixed w-screen grid grid-cols-[1fr,auto,1fr] items-center h-[86px] py-[12px] px-[42px]">
            <div className="flex gap-[20px]">
                <a href="">Accueil</a>
                <a href="">Playlist</a>
                {isLive &&
                    <a href="" className="live">Direct</a>
                }
            </div>
            <div>
                <img alt="logo" src="/images/logo.svg" />
            </div>
            <a href="" className="ml-[auto]">
                <button>bbh.bzh</button>
            </a>
        </nav>
    )
}
