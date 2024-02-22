export default function Button({double, text, radius = "0px", type = "primary", classes = null, handleClick = ()=>  {}, dataValue='', targetref})
{

        let classesStr = "";

        if(classes)
        {
         classesStr =  classes.join(' ')
        }

    if(double)
    {
        const textButtons = text.split(';')
        const dataValueText = text.split(';')

        return <div className="group-btn"><button {...(dataValue != '' ? {"data-value": dataValueText[0]} : {})} onClick={ (e)=> handleClick(e) }  className={`btn double-btn btn-${type}`}><span className="btn__text">{textButtons[0]}</span></button><div className="separator"></div><button {...(dataValue != '' ? {"data-value": dataValueText[1]} : {})}  onClick={ (e)=> handleClick(e) } className={`btn double-btn btn-${type}`}><span className="btn__text">{textButtons[1]}</span></button></div>
    }
    return <button style={{'--radius': radius}} ref={targetref} {...(dataValue != '' ? {"data-value": dataValue} : {})}  onClick={ (e)=> handleClick(e) } className={`btn btn-${type} ${classesStr}`} ><span className="btn__text">{text}</span></button>
}