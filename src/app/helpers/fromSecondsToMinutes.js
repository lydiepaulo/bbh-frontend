import React from 'react'

export default function fromSecondsToMinutes(value) {
    const sec = parseInt(value, 10)
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds

    if (hours === '00') return `${minutes}:${seconds}`
    else return `${hours}:${minutes}:${seconds}`
}
