import { ResponseButtonsMemo } from "./responseButtons"
import { createPortal } from "react-dom"
import CounterPoint from "./counter"
import { useCallback, useMemo, useRef, useState } from "react"
import RandomIntervalGenerator from "../libs/RandomIntervalGenerator"
export default function GameContent ({header})
{
let i = 0
    const intervalsGenerator = new RandomIntervalGenerator()
    let set = null;
 const intervals = intervalsGenerator.generateAnyIntervals(10)
    console.log(intervals)
    const callback = useCallback((e)=>{i++
    set(i) })
    const setCallback = useCallback((callback)=>{set = callback})
    return <div className="game-content">
        {i.current}
<ResponseButtonsMemo callback={callback} set={setCallback}  test={i.current}> </ResponseButtonsMemo>

<CounterPoint></CounterPoint>
    </div>
}