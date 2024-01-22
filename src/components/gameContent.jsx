import { ResponseButtonsMemo } from "./responseButtons"
import IntervalPlayer from "./intervalPlayer"
import CounterPoint from "./counter"
import { useCallback, useMemo, useRef, useState } from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"
import Button from "./buttonBase"


const intervalsGenerator = new RandomIntervalGenerator()
export default function GameContent({ header }) {
    const [intervalNumber, setIntervalNumber] = useState(0)
    const [score, setScore] = useState(0)
    let answerScore = 0

    const updateAnswerScore = useCallback((score) => {
        answerScore = score

    })

    const containerButtonsRef = useRef()
    
    const intervals = useMemo(() => {
        return intervalsGenerator.generateAnyIntervals(10)
    }, [])


    const handleResponse = useCallback((e) => {
        if(containerButtonsRef.current.querySelector('.valid'))
        {
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

    const next = function ()
        {
            containerButtonsRef.current.querySelector('.valid').classList.remove('valid')
            const error =  containerButtonsRef.current.querySelector('.error')

            if(error)
            {
                error.classList.remove('error')
            }
            
            if(intervalNumber < 10)
        {
            setIntervalNumber((intervalNumber) => intervalNumber + 1)
        }
        }
    return <div className="game-content">
        <header className='game-header'>
            <CounterPoint update={updateAnswerScore}></CounterPoint> 
            <div>Score : {score}</div>
            {(intervalNumber < 10) && <div>{intervalNumber + 1} / 10</div>}
             </header>
             {(intervalNumber > 9) && <div>Votre score est : {score}</div>}
        
       { (intervalNumber < 10) && <><IntervalPlayer init={true} dataInterval={intervals[intervalNumber]}></IntervalPlayer> 
       <ResponseButtonsMemo containerRef={containerButtonsRef} callback={handleResponse}> </ResponseButtonsMemo></>}
       <Button type="primary" text="suivant" handleClick={next}></Button>
    </div>
}