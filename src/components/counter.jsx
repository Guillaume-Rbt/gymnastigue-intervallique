import { useEffect, useState } from "react"



export default function CounterPoint({ update = () => {} }) {
    const [second, setSecond] = useState(0)
    const [point, setPoint] = useState(5)

    useEffect(() => {
        setSecond(0)
        setPoint(5)
    }, [update]
    )

    useEffect(() => {
    const   timer = window.setInterval(() => {
            setSecond(second => second + 1)
        }, 1000);
        return () => { window.clearInterval(timer) }
    }, [])

    useEffect(() => {
        if (second === 3) {
            setPoint(point => point - 2)
            setSecond(0)
        }
        if (!(point > 1)) {
            setPoint(1)
        }

        update(point)

    }, [second])

    return <span className="point-value"><span>{point} pts</span></span>
}