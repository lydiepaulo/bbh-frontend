'use client'
import React, { useState } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// sections
import Sections from './components/Sections';

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  return (
    <main className="flex max-w-screen min-h-screen flex-col">
      <Navbar isLive={isLive} />

      {/* first section */}
      <Sections isLive={isLive} />


      {/* ellipsis */}
      <div className="ellipsis top-[-14px] left-[-370px] z-0"></div>
      <div className="ellipsis top-[44px] right-[-541px] z-0"></div>

      <Footer></Footer>
    </main>
  )
}
