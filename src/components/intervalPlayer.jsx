import { useCallback, useEffect, useState } from 'react'
import notes from '../assets/sounds/notes.wav'
import Tooltip from './tooltip'
import Button from './buttonBase'
import SoundPlayer from '../libs/SoundPlayer'

const soundPlayer = new SoundPlayer(notes)

export default function IntervalPlayer({ dataInterval }) { findTimeNotes(dataInterval)
    

    const playInterval = useCallback(() => {
        soundPlayer.playInterval()
    })


    useEffect(
        () => {
           soundPlayer.setIntervalTimes(findTimeNotes(dataInterval))
           soundPlayer.playInterval()
        }, [dataInterval])



    return <><Tooltip text="Lire l'interval">
        <Button type="rounded" radius='50px' handleClick={playInterval} text='lire'></Button>
    </Tooltip>
    </>

}



function findTimeNotes(interval) {
    const timeSeparateNotes = 2000
    const { noteStart, noteEnd } = interval

    const timeNoteStart = timeSeparateNotes * (noteStart.index + noteStart.octave * 12)
    const timeNoteEnd = timeSeparateNotes * (noteEnd.index + noteEnd.octave * 12)

    return {
        timeNote1: timeNoteStart,
        timeNote2: timeNoteEnd,
    }
}