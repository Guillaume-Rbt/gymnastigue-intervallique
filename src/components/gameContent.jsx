import { ResponseButtonsMemo } from "./responseButtons"
import IntervalPlayer from "./intervalPlayer"
import CounterPoint from "./counter"
import { useCallback, useMemo, useRef, useState } from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"



export default function GameContent({ header }) {
    const [intervalNumber, setIntervalNumber] = useState(0)
    const [score, setScore] = useState(0)
    let answerScore = 0

    const updateAnswerScore = useCallback((score) => {
        answerScore = score

    })

    const containerButtonsRef = useRef()
    const intervalsGenerator = new RandomIntervalGenerator()
    const intervals = useMemo(() => {
        return intervalsGenerator.generateAnyIntervals(10)
    }, [])


    const handleResponse = useCallback((e) => {
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

        if(intervalNumber < 10)
        {
            setIntervalNumber((intervalNumber) => intervalNumber + 1)
        }
        
    }, [intervalNumber])

    return <div className="game-content">
        <header className='game-header'>
            <CounterPoint update={updateAnswerScore}></CounterPoint> 
            <div>Score : {score}</div>
            {intervalNumber + 1} / 10
             </header>
             {(intervalNumber > 9) && <div>Votre score est : {score}</div>}
        
       { (intervalNumber < 10) && <><IntervalPlayer dataInterval={intervals[intervalNumber]}></IntervalPlayer> 
       <ResponseButtonsMemo containerRef={containerButtonsRef} callback={handleResponse}> </ResponseButtonsMemo></>}
    </div>
}