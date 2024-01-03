import { ResponseButtonsMemo } from "./responseButtons"
import IntervalPlayer from "./intervalPlayer"
import CounterPoint from "./counter"
import { useCallback, useMemo, useRef, useState } from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"



export default function GameContent({ header }) {
    let i = 0

    const intervalsGenerator = new RandomIntervalGenerator()
    const intervals = intervalsGenerator.generateAnyIntervals(10)
    let setIntervalPlayer = null;
    const setCallback = useCallback((callback) => { setIntervalPlayer = callback })

    const callback = useCallback((e) => {
        i++
        setIntervalPlayer(i)
    })

    return <div className="game-content">
        {i.current}
        <IntervalPlayer set={setCallback} dataInterval={intervals[i]}></IntervalPlayer>
        <ResponseButtonsMemo> </ResponseButtonsMemo>
    </div>
}