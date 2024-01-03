import { useRef, Children, cloneElement, useEffect, useMemo} from "react"
import { createPortal } from "react-dom"
import '../scss/components/tooltip.scss'

export default function Tooltip({children, text}) {

 const target = useRef()
 const tooltipRef = useRef()
console.log(target)
let coord = {
    top: 0,
    left: 0
}

useEffect(()=> {
    window.addEventListener('load', ()=>
    {
        const targetRect = target.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    console.log(targetRect.top - tooltipRect.height  - 5)
    tooltipRef.current.style.top = `${targetRect.top - tooltipRect.height - 5}px`
    tooltipRef.current.style.left = `${targetRect.left}px`
    target.current.addEventListener('mouseenter', function()
    {
        tooltipRef.current.classList.add('show')
    })

    target.current.addEventListener('mouseleave', function()
    {
        tooltipRef.current.classList.remove('show')
    })
    })
   


    return ()=> {
        target.current.removeEventListener('mouseenter', function()
        {
            tooltipRef.current.classList.add('show')
        })
    
        target.current.removeEventListener('mouseleave', function()
        {
            tooltipRef.current.classList.remove('show')
        })
    
        }
}, [])

    return <>
 { Children.map(children, child => 
     <>{cloneElement(child, {targetref: target})}</>)}
           {createPortal(<div ref={tooltipRef} style={{top: `${coord.top}px`, left: `${coord.left}px`}} className="tooltip">{text}</div>, document.body)}
    </>
}