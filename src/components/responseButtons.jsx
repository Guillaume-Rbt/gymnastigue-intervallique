import { buttons } from "../utils/constantsMusical.js";
import Button from "./buttonBase.jsx";
import { memo, useEffect, useState } from "react";

export  const ResponseButtonsMemo = memo(function ResponseButtons ({callback, set}){
    let buttonList = [];
    let key = 0;
    const [test, setTest] = useState(0)
    useEffect(()=>{set(setTest)}, [])
    buttons.forEach(button => {
        if (Array.isArray(button))
        {
            let text = button.join(";");
            buttonList.push(<Button key={key} dataValue={text} handleClick={(e)=>{callback(e)}}  double={true} text={text} type="response" ></Button>)
        }
        else buttonList.push(<Button key={key} double={false} handleClick={(e)=>{callback(e)}} dataValue={button} text={button} type="response"></Button>)
        key++
    })

    return <div className="button-container">{buttonList}{test}</div>
})