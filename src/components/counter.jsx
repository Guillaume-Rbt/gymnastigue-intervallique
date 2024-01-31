import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion/dom"


export default function CounterPoint({ update = () => { } }) {
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
    

    }, [update]
    )

  

    useEffect(() => {
        timer = window.setInterval(() => {
            setSecond(second => second + 1)
        }, 1000);
        return () => { window.clearInterval(timer) }
    }, [])

    useEffect(() => {
        if (second === 6 && point == 5) {
            setPoint(point => point - 2)
            animate(value.current, {scale: [1, 1.5, 1]}, {duration: 0.8})
           
            update(3)
        }
        else if (second == 11 && point == 3)
        {
            setPoint(point => point - 2)
            animate(value.current, {scale: [1, 1.5, 1]}, {duration: 0.8})
            update(1)
        }
      if(second > 1 && second < 12)
        {
            document.documentElement.style.setProperty('--transition', `999ms`)
             document.documentElement.style.setProperty('--progress', `${1-((1/10)*(second-1))}px`)
        } 
      
    }

    , [second])

    return <span className="point-value"><span ref={value}>{point} pts</span>
   <svg ref={visualCount} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="icon"><use href="./src/assets/images/progessCounter.svg#test" /></svg>
  </span>
}