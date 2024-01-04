import { useCallback, useEffect, useState } from 'react'
import notes from '../assets/sounds/notes.wav'
import Tooltip from './tooltip'
import Button from './buttonBase'

export default function IntervalPlayer({ dataInterval, set}) {
    const [audio, setAudio] = useState(new Audio(notes))
    const [intervalData, setIntervalData] = useState(dataInterval)
    const intervalTemp = findTimeNotes(intervalData)


    set(setIntervalData)

    const playInterval = useCallback(() => {

        audio.currentTime = intervalTemp.timeNoteStart / 1000

        audio.play()
        let timer = setTimeout(() => {
            audio.pause()
            audio.currentTime = intervalTemp.timeNoteEnd / 1000
            audio.play()
            
        }, 1750)


        let timer2 = setTimeout(() => {
            audio.pause()
            clearTimeout(timer)
            clearTimeout(timer2)
        }, 3500)


    })

    return <><Tooltip text="Lire l'interval">
        <Button type="rounded" radius='50px' handleClick={playInterval} text='lire'></Button>
        
    </Tooltip>{JSON.stringify(intervalData)}</>

}


function findTimeNotes(interval) {
    const timeSeparateNotes = 2000
    const { noteStart, noteEnd } = interval

    const timeNoteStart = timeSeparateNotes * (noteStart.index + noteStart.octave * 12)
    const timeNoteEnd = timeSeparateNotes * (noteEnd.index + noteEnd.octave * 12)

    return {
        timeNoteStart: timeNoteStart,
        timeNoteEnd: timeNoteEnd,
    }
}