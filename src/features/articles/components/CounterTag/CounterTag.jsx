import './CounterTag.scss'

const CounterTag = ({ count, label }) => {
    return (
        <span className="CounterTag">
            <i className="bi bi-clipboard-pulse" aria-hidden="true"></i>
            {count} {label} EN REVISIÓN
        </span>
    )
}

export default CounterTag