import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion/dom'

export default function CounterPoint({ update = () => {}, pause }) {
    let timer = null
    const [second, setSecond] = useState(0)
    const [point, setPoint] = useState(5)
    const value = useRef()
    const visualCount = useRef()

    useEffect(() => {
        setSecond(0)
        setPoint(5)
        update(5)

        document.documentElement.style.setProperty('--transition', `0ms`)
        document.documentElement.style.setProperty('--progress', `1px`)
    }, [update])

    useEffect(() => {
        timer = window.setInterval(() => {
            setSecond((second) => (!pause ? second + 1 : second))
        }, 1000)
        return () => {
            window.clearInterval(timer)
        }
    }, [pause])

    useEffect(() => {
        if (!pause) {
            if (second === 6 && point == 5) {
                setPoint((point) => point - 2)
                animate(
                    value.current,
                    { scale: [1, 1.5, 1] },
                    { duration: 0.8 }
                )

                update(3)
            } else if (second == 11 && point == 3) {
                setPoint((point) => point - 2)
                animate(
                    value.current,
                    { scale: [1, 1.5, 1] },
                    { duration: 0.8 }
                )
                update(1)
            }
            if (second > 1 && second < 12) {
                document.documentElement.style.setProperty(
                    '--transition',
                    `999ms`
                )
                document.documentElement.style.setProperty(
                    '--progress',
                    `${1 - (1 / 10) * (second - 1)}px`
                )
            }
        }
    }, [second])

    return (
        <span className="point-value">
            <span ref={value}>{point} pts</span>
            <svg
                ref={visualCount}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                className="icon"
            >
                <circle
                    cx="26"
                    cy="26"
                    r="20"
                    pathLength="1"
                    className="bg"
                ></circle>
                <circle
                    cx="26"
                    cy="26"
                    r="20"
                    pathLength="1"
                    className="progress"
                ></circle>
            </svg>
        </span>
    )
}
