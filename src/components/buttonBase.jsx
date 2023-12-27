export default function Button({double, text, type, handleClick = ()=>  {}, selected = '', dataValue=''})
{

    if(double)
    {
        const textButtons = text.split(';')
        const dataValueText = text.split(';')

        return <div className="group-btn"><button {...(dataValue != '' ? {"data-value": dataValueText[0]} : {})} onClick={ (e)=> handleClick(e) }  className={`btn double-btn btn-${type} ${selected}`}>{textButtons[0]}</button><div className="separator"></div><button {...(dataValue != '' ? {"data-value": dataValueText[1]} : {})}  onClick={ (e)=> handleClick(e) } className={`btn double-btn btn-${type} ${selected}`}>{textButtons[1]}</button></div>
    }
    return <button {...(dataValue != '' ? {"data-value": dataValue} : {})}  onClick={ (e)=> handleClick(e) } className={`btn btn-${type} ${selected}`} >{text}</button>
}