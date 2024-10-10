import { useCallback, useEffect, useState, useRef } from 'react'
import Tooltip from './tooltip'
import Button from './button'
import useSoundPlayer from '../hooks/useSound'
import play from '../assets/images/play.svg?react'
import played from '../assets/images/play-played.svg?react'

//const soundPlayer = new SoundPlayer(notes)

export default function IntervalPlayer({ dataInterval }) {
    findTimeNotes(dataInterval)
    const [isPlayed, setIsPlayed] = useState(false)

    const soundPlayer = useSoundPlayer()
    const playInterval = useCallback(() => {
        soundPlayer.playInterval()
    }, [dataInterval])

    useEffect(() => {
        soundPlayer.on(soundPlayer.SOUND_START, () => {
            setIsPlayed(true)
        })

        soundPlayer.on(soundPlayer.SOUND_END, () => {
            setIsPlayed(false)
        })
    }, [soundPlayer])

    useEffect(() => {
        soundPlayer.setIntervalTimes(findTimeNotes(dataInterval))
        soundPlayer.playInterval()
    }, [dataInterval])

    return (
        <>
            <Tooltip text="Lire l'interval">
                <Button
                    type={`rounded ${isPlayed ? 'played' : ''}`}
                    radius="50px"
                    icon={{
                        appendType: 'before',
                        src: isPlayed ? played : play,
                    }}
                    handleClick={playInterval}
                ></Button>
            </Tooltip>
        </>
    )
}

function findTimeNotes(interval) {
    const timeSeparateNotes = 2000
    const { noteStart, noteEnd } = interval

    const timeNoteStart =
        timeSeparateNotes * (noteStart.index + noteStart.octave * 12)
    const timeNoteEnd =
        timeSeparateNotes * (noteEnd.index + noteEnd.octave * 12)

    return {
        timeNote1: timeNoteStart,
        timeNote2: timeNoteEnd,
    }
}
