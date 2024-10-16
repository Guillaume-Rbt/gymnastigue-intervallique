import { ResponseButtonsMemo } from './responseButtons'
import IntervalPlayer from './intervalPlayer'
import { Header } from './header'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import RandomIntervalGenerator from '../libs/RandomIntervalGenerator'
import Button from './button'
import { createPortal } from 'react-dom'
import useSoundPlayer from '../hooks/useSound'
import { AnimatePresence, motion } from 'framer-motion'
import arrow from '../assets/images/arrow_right.svg?react'

const intervalsGenerator = new RandomIntervalGenerator()
const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}

const headerVariants = {
    hidden: { translateY: "-100%" },
    visible: { translateY: "0%" },
}

export default function GameContent() {
    const [gameSession, setGameSession] = useState(-1)
    const [intervalNumber, setIntervalNumber] = useState(0)
    const [score, setScore] = useState(0)
    const containerButtonsRef = useRef()
    let answerScore = 0
    let timeToNext = null
    const nextButtonRef = useRef()
    const player = useSoundPlayer()
    const updateAnswerScore = useCallback((score) => {
        answerScore = score
    })

    const [counterPaused, setCounterPaused] = useState(true)
    useEffect(() => {
        player.on(player.SOUND_END, () => {
            setCounterPaused(false)
        })
    }, [player])

    useEffect(() => {
        if (timeToNext !== null) {
            clearTimeout(timeToNext)
        }
        if (nextButtonRef.current) {
            nextButtonRef.current.classList.remove('disabled')
        }
    }, [intervalNumber])

    const intervals = useMemo(() => {
        if (gameSession <= 0) {
            return
        }
        return intervalsGenerator.generateAnyIntervals(10)
    }, [gameSession])

    const handleResponse = useCallback(
        (e) => {
            if (containerButtonsRef.current.querySelector('.valid')) {
                return
            }
            containerButtonsRef.current.classList.add('no-events')

            let valid = false
            let response = containerButtonsRef.current.querySelector(
                '[data-value="' + intervals[intervalNumber].name + '"]'
            )
            if (Array.isArray(intervals[intervalNumber].name)) {
                if (
                    intervals[intervalNumber].name.indexOf(
                        e.target.dataset.value
                    ) !== -1
                ) {
                    valid = true
                    setScore((score) => score + answerScore)
                    setCounterPaused(true)
                } else {
                    valid = false
                    setCounterPaused(true)
                }
            } else {
                if (intervals[intervalNumber].name == e.target.dataset.value) {
                    valid = true
                    setScore((score) => score + answerScore)
                    setCounterPaused(true)
                } else {
                    valid = false
                    setCounterPaused(true)
                }
            }

            if (valid) {
                e.target.classList.add('valid')
            } else {
                e.target.classList.add('error')
                response.classList.add('valid')
            }
        },
        [intervalNumber, gameSession]
    )

    const next = function () {
        let response = containerButtonsRef.current.querySelector(
            '[data-value="' + intervals[intervalNumber].name + '"]'
        )
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
            response.classList.add('valid')
            nextButtonRef.current.classList.add('disabled')
            timeToNext = setTimeout(() => {
                if (intervalNumber < 10) {
                    setIntervalNumber((intervalNumber) => intervalNumber + 1)
                }
                response.classList.remove('valid')
            }, 2000)
        }
    }

    return (
        <div
            className={`game-content ${gameSession <= 0 || intervalNumber > 10 ? 'init-game' : ''}`}
        >
            <AnimatePresence mode="popLayout">
                {intervalNumber < 10 && gameSession > 0 && (
                    <>
                        <motion.header variants={headerVariants}
                            transition={{ duration: .3 }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="game-content__header">
                            <Header updateFonction={() => { }} pause={counterPaused} score={score} intervalNumber={intervalNumber}></Header>
                        </motion.header>
                        <motion.div
                            className="game-content__wrap"
                            variants={variants}
                            transition={{ duration: .5 }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <IntervalPlayer
                                init={true}
                                dataInterval={intervals[intervalNumber]}
                            ></IntervalPlayer>
                            <ResponseButtonsMemo
                                containerRef={containerButtonsRef}
                                callback={handleResponse}
                            ></ResponseButtonsMemo>
                            <Button
                                key="next"
                                type="primary"
                                targetref={nextButtonRef}
                                classes={['flx-als-end']}
                                text="Suivant"
                                icon={{ src: arrow, appendType: 'after' }}
                                handleClick={next}
                            ></Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {gameSession < 0 && (
                    <motion.div
                        onAnimationComplete={() => {
                            setIntervalNumber(0)
                            setGameSession(1), setScore(0)
                        }}
                        transition={{ duration: 0.3 }}
                        variants={variants}
                        initial="visible"
                        animate="visible"
                        exit="hidden"
                        className="button-start"
                    >
                        <Button
                            type="primary"
                            text="Commencer"
                            handleClick={() => {
                                setGameSession(0)
                            }}
                        ></Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
                {intervalNumber > 9 && gameSession > 0 && (
                    <motion.div
                        variants={variants}
                        initial="visible"
                        transition={{ duration: 0.3 }}
                        animate="visible"
                        exit="hidden"
                        className="game-content__card"
                    >
                        <div>Votre score est : {score}</div>
                        <Button
                            type="primary"
                            text="Recommencer"
                            handleClick={() => {
                                setIntervalNumber(0)
                                setGameSession(gameSession + 1), setScore(0)
                            }}
                        ></Button>
                    </motion.div>
                )}
            </AnimatePresence>
            {createPortal(
                <footer className="game-content__footer"></footer>,
                document.body
            )}
        </div>
    )
}
