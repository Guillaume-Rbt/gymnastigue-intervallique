export default function Button({double, text, radius = "0px", type = "primary", classes = null, handleClick = ()=>  {}, dataValue='', targetref, icon = {}})
{
        let classesStr = "";

        if(classes)
        {
         classesStr =  classes.join(' ')
        }

        console.log(icon)

    if(double)
    {
        const textButtons = text.split(';')
        const dataValueText = text.split(';')

        return <div className="group-btn"><button {...(dataValue != '' ? {"data-value": dataValueText[0]} : {})} onClick={ (e)=> handleClick(e) }  className={`btn double-btn btn-${type}`}><span className="btn__text">{textButtons[0]}</span></button><div className="separator"></div><button {...(dataValue != '' ? {"data-value": dataValueText[1]} : {})}  onClick={ (e)=> handleClick(e) } className={`btn double-btn btn-${type}`}><span className="btn__text">{textButtons[1]}</span></button></div>
    }
    return <button style={{'--radius': radius}} ref={targetref} {...(dataValue != '' ? {"data-value": dataValue} : {})}  onClick={ (e)=> handleClick(e) } className={`btn btn-${type} ${classesStr}`} >{icon.appendType == "before" && <img src={icon.src} className="button__icon"/>}<span className="btn__text">{text}</span>{icon.appendType == "after" && <img src={icon.src} className="button__icon"/>}</button>
}