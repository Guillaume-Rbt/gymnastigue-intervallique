import { ResponseButtonsMemo } from "./responseButtons"
import IntervalPlayer from "./intervalPlayer"
import CounterPoint from "./counter"
import { useCallback, useMemo, useRef, useState } from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"
import Button from "./buttonBase"
import { createPortal } from "react-dom"
import useSoundPlayer from "../hooks/useSound"
import { AnimatePresence, motion } from "framer-motion"
import arrow from '../assets/images/arrow_right.svg?react'

const intervalsGenerator = new RandomIntervalGenerator()
const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

export default function GameContent() {
    const [gameSession, setGameSession] = useState(-1)
    const [intervalNumber, setIntervalNumber] = useState(0)
    const [score, setScore] = useState(0)
    const containerButtonsRef = useRef()
    let answerScore = 0
    const player = useSoundPlayer()
    const updateAnswerScore = useCallback((score) => {
        answerScore = score
    })

    const [counterPaused, setCounterPaused] = useState(false)



    const intervals = useMemo(() => {
        return intervalsGenerator.generateAnyIntervals(10)
    }, [gameSession])


    const handleResponse = useCallback((e) => {
        if (containerButtonsRef.current.querySelector('.valid')) {
            return
        }
        containerButtonsRef.current.classList.add('no-events')


        let valid = false
        let response = containerButtonsRef.current.querySelector('[data-value="' + intervals[intervalNumber].name + '"]')
        if (Array.isArray(intervals[intervalNumber].name)) {
            if (intervals[intervalNumber].name.indexOf(e.target.dataset.value) !== -1) {
                valid = true
                setScore((score) => score + answerScore)
                setCounterPaused(true)
            }
            else {
                valid = false
                setCounterPaused(true)
            }
        }
        else {
            if (intervals[intervalNumber].name == e.target.dataset.value) {
                valid = true
                setScore((score) => score + answerScore)
                setCounterPaused(true)

            }
            else {
                valid = false
                setCounterPaused(true)

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
            setCounterPaused(false)


            if (error) {
                error.classList.remove('error')
            }

            if (intervalNumber < 10) {
                setIntervalNumber((intervalNumber) => intervalNumber + 1)
                containerButtonsRef.current.classList.remove('no-events')

            }
        } else if (!player.isPlaying()) {
            if (intervalNumber < 10) {
                setIntervalNumber((intervalNumber) => intervalNumber + 1)
            }
        }
    }
    return <div className={`game-content ${gameSession <= 0 || intervalNumber > 10 ? 'init-game' : ''}`}>
        {(intervalNumber < 10 && gameSession > 0) &&
            <motion.header variants={variants} initial='visible' animate="visible" exit='hidden' className='game-content__header'>
                <><CounterPoint update={updateAnswerScore} pause={counterPaused}></CounterPoint>
                    <div className="game-content__score">Score : {score}</div>
                    <div className="game-content__answerNumber">{intervalNumber + 1} / 10</div>
                </>

            </motion.header>}


        {(intervalNumber < 10 && gameSession > 0) && <motion.div className="game-content__wrap" variants={variants} initial='visible' animate="visible" exit='hidden'>
            <div className="game-content__instruction"><p>Quel est l'interval joué ?</p></div>

            <ResponseButtonsMemo containerRef={containerButtonsRef} callback={handleResponse}> </ResponseButtonsMemo>
            <Button type="primary" classes={["flx-als-end"]} text="Suivant" icon={{ src: arrow, appendType: "after" }} handleClick={next}></Button>
        </motion.div>}
        <AnimatePresence>
            {(gameSession < 0) &&
                <motion.div onAnimationComplete={() => { setIntervalNumber(0); setGameSession(1), setScore(0) }} transition={{ duration: .3 }} variants={variants} initial='visible' animate="visible" exit='hidden' className="button-start"><Button type="primary" text="Commencer" handleClick={() => { setGameSession(0) }}></Button></motion.div>}
        </AnimatePresence>
        {(intervalNumber > 9 && gameSession > 0) && <><div>Votre score est : {score}</div>
            <Button type="primary" text="Recommencer" handleClick={() => { setIntervalNumber(0); setGameSession(gameSession + 1), setScore(0) }}></Button></>}
        {createPortal(<footer className="game-content__footer"> {(intervalNumber < 10 && gameSession > 0) && <IntervalPlayer init={true} dataInterval={intervals[intervalNumber]}></IntervalPlayer>}</footer>, document.body)}
    </div>
}