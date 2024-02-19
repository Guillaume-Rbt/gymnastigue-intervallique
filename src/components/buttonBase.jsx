export default function Button({double, text, radius = "0px", type = "primary", classes = null, handleClick = ()=>  {}, selected = '', dataValue='', targetref})
{

        let classesStr = "";

        if(classes)
        {
         classesStr =  classes.join(' ')
        }
   console.log(classesStr)

    if(double)
    {
        const textButtons = text.split(';')
        const dataValueText = text.split(';')

        return <div className="group-btn"><button {...(dataValue != '' ? {"data-value": dataValueText[0]} : {})} onClick={ (e)=> handleClick(e) }  className={`btn double-btn btn-${type}`}>{textButtons[0]}</button><div className="separator"></div><button {...(dataValue != '' ? {"data-value": dataValueText[1]} : {})}  onClick={ (e)=> handleClick(e) } className={`btn double-btn btn-${type}`}>{textButtons[1]}</button></div>
    }
    return <button style={{'--radius': radius}} ref={targetref} {...(dataValue != '' ? {"data-value": dataValue} : {})}  onClick={ (e)=> handleClick(e) } className={`btn btn-${type} ${classesStr}`} >{text}</button>
}