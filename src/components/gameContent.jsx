import { ResponseButtonsMemo } from "./responseButtons"
import IntervalPlayer from "./intervalPlayer"
import CounterPoint from "./counter"
import { useCallback, useMemo, useRef, useState } from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"
import Button from "./buttonBase"
import useSoundPlayer from "../hooks/useSound"

const intervalsGenerator = new RandomIntervalGenerator()
export default function GameContent() {
    const [intervalNumber, setIntervalNumber] = useState(0)
    const [score, setScore] = useState(0)
    const containerButtonsRef = useRef()
    let answerScore = 0
    const player = useSoundPlayer()
    const updateAnswerScore = useCallback((score) => {
        answerScore = score
    })



    const intervals = useMemo(() => {
        return intervalsGenerator.generateAnyIntervals(10)
    }, [])


    const handleResponse = useCallback((e) => {
        if (containerButtonsRef.current.querySelector('.valid')) {
            return
        }

        let valid = false
        let response = containerButtonsRef.current.querySelector('[data-value="' + intervals[intervalNumber].name + '"]')
        if (Array.isArray(intervals[intervalNumber].name)) {
            if (intervals[intervalNumber].name.indexOf(e.target.dataset.value) !== -1) {
                valid = true
                setScore((score) => score + answerScore)
            }
            else {
                valid = false
            }
        }
        else {
            if (intervals[intervalNumber].name == e.target.dataset.value) {
                valid = true
                setScore((score) => score + answerScore)

                
            }
            else {
                valid = false

            }
        }

        if (valid) {
            e.target.classList.add('valid')
        }
        else {
            e.target.classList.add('error')
            response.classList.add('valid')
        }





    }, [intervalNumber])

    const next = function () {
       
        const error = containerButtonsRef.current.querySelector('.error')
        const valid = containerButtonsRef.current.querySelector('.valid')

        if (valid) {
            valid.classList.remove('valid')

            if (error) {
                error.classList.remove('error')
            }

            if (intervalNumber < 10) {
                setIntervalNumber((intervalNumber) => intervalNumber + 1)
            }
        } else if(!player.isPlaying())
        {
            if (intervalNumber < 10) {
                setIntervalNumber((intervalNumber) => intervalNumber + 1)
            }
        }
    }
    return <div className="game-content">
        <header className='game-content__header'>
            <CounterPoint update={updateAnswerScore}></CounterPoint>
            <div className="game-content__score">Score : {score}</div>
            {(intervalNumber < 10) && <div className="game-content__answerNumber">{intervalNumber + 1} / 10</div>}
        </header>
        {(intervalNumber > 9) && <div>Votre score est : {score}</div>}

        {(intervalNumber < 10) && <><IntervalPlayer init={true} dataInterval={intervals[intervalNumber]}></IntervalPlayer>
            <ResponseButtonsMemo containerRef={containerButtonsRef} callback={handleResponse}> </ResponseButtonsMemo></>}
        <Button type="primary" text="suivant" handleClick={next}></Button>
    </div>
}