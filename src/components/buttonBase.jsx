
export default function Button({ double, text, radius = "0px", type = "primary", classes = null, handleClick = () => { }, dataValue = '', targetref, icon = {} }) {
    let classesStr = "";

    if (classes) {
        classesStr = classes.join(' ')
    }


    if (double) {
        const textButtons = text ? text.split(';') : ";"

        return <div className="group-btn">
            <button onTouchStart={(e) => { e.target.classList.add("button-touched") }} onTouchEnd={(e) => { e.target.classList.remove("button-touched") }} {...(dataValue != '' ? { "data-value": dataValue[0] } : {})} onClick={(e) => handleClick(e)} className={`btn double-btn btn-${type}`}>
                <span className="btn__text" dangerouslySetInnerHTML={{ __html: textButtons[0] }}></span>
            </button>
            <div className="separator"></div>
            <button onTouchStart={(e) => { e.target.classList.add("button-touched") }} onTouchEnd={(e) => { e.target.classList.remove("button-touched") }}  {...(dataValue != '' ? { "data-value": dataValue[1] } : {})} onClick={(e) => handleClick(e)} className={`btn double-btn btn-${type}`}>
                <span className="btn__text" dangerouslySetInnerHTML={{ __html: textButtons[0] }}></span>
            </button>
        </div>
    }
    return <button onTouchStart={(e) => { e.target.classList.add("button-touched") }} onTouchEnd={(e) => { e.target.classList.remove("button-touched") }} style={{ '--radius': radius }} ref={targetref} {...(dataValue != '' ? { "data-value": dataValue } : {})} onClick={(e) => handleClick(e)} className={`btn btn-${type} ${classesStr}`} >{icon.appendType == "before" && <img src={icon.src} className="button__icon" />}<span className="btn__text" dangerouslySetInnerHTML={{ __html: text ? text : "" }} ></span>{icon.appendType == "after" && <img src={icon.src} className="button__icon" />}</button >
}