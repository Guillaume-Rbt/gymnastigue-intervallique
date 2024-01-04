import { ResponseButtonsMemo } from "./responseButtons"
import IntervalPlayer from "./intervalPlayer"
import CounterPoint from "./counter"
import { useCallback, useRef} from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"



export default function GameContent({ header }) {
    let i = 0

    const containerButtonsRef = useRef()
    const intervalsGenerator = new RandomIntervalGenerator()
    const intervals = intervalsGenerator.generateAnyIntervals(10)
    let setIntervalPlayer = null;
    const setCallback = useCallback((callback) => { setIntervalPlayer = callback })

    const callback = useCallback((e) => {
        let valid = false
        let response = containerButtonsRef.current.querySelector('[data-value="'+ intervals[i].name + '"]')
        if(Array.isArray(intervals[i].name))
        {
            if(intervals[i].name.indexOf(e.target.dataset.value) !== -1)
            {
                valid = true
            }
            else {
                valid = false
            }
        }
        else 
        {
            if(intervals[i].name == e.target.dataset.value)
            {
                valid = true
            }
            else {
                valid = false
            }
        }

        if(valid)
        {
            e.target.classList.add('valid')
        }
        else 
        {
            e.target.classList.add('error')
            response.classList.add('valid')
        }
        i++
        setIntervalPlayer(intervals[i])
    })

    return <div className="game-content">
        {i.current}
        <IntervalPlayer set={setCallback} dataInterval={intervals[i]}></IntervalPlayer>
        <ResponseButtonsMemo containerRef={containerButtonsRef}  callback={callback}> </ResponseButtonsMemo>
    </div>
}