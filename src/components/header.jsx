import { motion } from "framer-motion"
import CounterPoint from "./counter"
import { useCallback } from "react"


export function Header({ updateFonction, pause, score, intervalNumber }) {

    return <>

        <CounterPoint update={updateFonction} pause={pause}></CounterPoint>
        <div className="game-content__score"> Score : {score}</div>
        <div className="game-content__answerNumber">
            {intervalNumber + 1} / 10
        </div>
    </>
}