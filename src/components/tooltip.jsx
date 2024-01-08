import { useRef, Children, cloneElement, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import '../scss/components/tooltip.scss'

export default function Tooltip({ children, text, positon = "topCenter" }) {

    const target = useRef()
    const tooltipRef = useRef()
const [coords, setCoords] = useState({top: 0, left:0})

    const calcPosition = function () {
        const localCoords =  {top: 0, left: 0}
        const targetRect = target.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
                switch (positon) {
            case "topCenter":
                localCoords.top = targetRect.top - tooltipRect.height - 5
                localCoords.left = targetRect.left - (Math.abs((tooltipRect.width - targetRect.width)) / 2)
                break;
        }

        return localCoords
    }

    useEffect(() => {
        window.addEventListener('load', () => {
            setCoords(calcPosition())
            target.current.addEventListener('mouseenter', function () {
                tooltipRef.current.classList.add('show')
            })

            target.current.addEventListener('mouseleave', function () {
                tooltipRef.current.classList.remove('show')
            })
        })
    }, [])

    return <>
        {Children.map(children, child =>
            <>{cloneElement(child, { targetref: target })}</>)}
        {createPortal(<div ref={tooltipRef} style={{ top: `${coords.top}px`, left: `${coords.left}px` }} className="tooltip">{text}</div>, document.body)}
    </>
}