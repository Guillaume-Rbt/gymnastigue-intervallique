export default function Button({
    double,
    text,
    radius = '0px',
    type = 'primary',
    classes = null,
    handleClick = () => {},
    dataValue = '',
    targetref,
    icon = {},
}) {
    let classesStr = ''

    if (classes) {
        classesStr = classes.join(' ')
    }

    return (
        <button
            onTouchStart={(e) => {
                e.target.classList.add('button-touched')
            }}
            onTouchEnd={(e) => {
                e.target.classList.remove('button-touched')
            }}
            style={{ '--radius': radius }}
            ref={targetref}
            {...(dataValue != '' ? { 'data-value': dataValue } : {})}
            onClick={(e) => handleClick(e)}
            className={`btn btn-${type} ${classesStr}`}
        >
            {icon.appendType == 'before' && (
                <img src={icon.src} className="button__icon" />
            )}
            <span
                className="btn__text"
                dangerouslySetInnerHTML={{ __html: text ? text : '' }}
            ></span>
            {icon.appendType == 'after' && (
                <img src={icon.src} className="button__icon" />
            )}
        </button>
    )
}
