import { buttons } from "../utils/constantsMusical.js";
import Button from "./buttonBase.jsx";
import { memo } from "react";

export  const ResponseButtonsMemo = memo(function ResponseButtons ({callback = ()=>{}, containerRef}){
    let buttonList = [];
    let key = 0;
    buttons.forEach(button => {
        if (Array.isArray(button))
        {
            let text = button.join(";");
            buttonList.push(<Button key={key} dataValue={text} handleClick={(e)=>{callback(e)}}  double={true} text={text} type="response" ></Button>)
        }
        else buttonList.push(<Button key={key} double={false} handleClick={(e)=>{callback(e)}} dataValue={button} text={button} type="response"></Button>)
        key++
    })

    return <div ref={containerRef} className="button-container">{buttonList}</div>
})