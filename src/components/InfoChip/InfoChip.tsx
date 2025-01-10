import './InfoChip.css'

interface Props {
    type: string
    text: string
    secondaryText?: string | number
    onDelete?: () => void
}

function InfoChip({ type, text, secondaryText, onDelete }: Props) {

    function getIcon() {
        switch(type) {
            case "class":
                switch(text) {
                    case "private": return 'bi-person-fill'
                    case "group": return 'bi-people-fill'
                }; break
            case "location":
                switch(text) {
                    case "online": return 'bi-wifi'
                    case "at-student": return 'bi-house-fill'
                    case "at-teacher": return 'bi-house-fill'
                }; break
            case "level": return 'bi-mortarboard-fill'
            case "duration": return 'bi-clock-fill'
            case "price": return 'bi-tag-fill'
            case "weekdays": return 'bi-calendar-fill'
            case "timeslots": return 'bi-clock-fill'
            case "cards": return 'bi-aspect-ratio-fill'
            case "mastered": return 'bi-trophy-fill'
        }
    }

    function formatText() {
        switch(type) {
            case "class": return text.charAt(0).toUpperCase() + text.slice(1)
            case "location": 
                switch(text) {
                    case "online": return 'Online'
                    case "at-student": return `At the student's home`
                    case "at-teacher": return `At the teacher's home`
                }; break
            case "level": return text.charAt(0).toUpperCase() + text.slice(1)
            case "duration": return `${text} Minutes`
            case "price": return `$${text}.00`
            case "cards": return `${text} Cards`
            case "mastered": return `${text} Mastered`
            default: return text
        }
    }

    function formatSecondaryText() {
        switch(type) {
            case "class": return ` (max. ${secondaryText} students)`
            case "location": return ` (${secondaryText})`
        }
    }

    return (
        <div className="info-chip-container">
            <div className="info-chip-icon">
                <i className={'bi ' + getIcon()}></i>
            </div>
            <span className="info-chip-text">
                {formatText()} 
                {secondaryText && formatSecondaryText()}
            </span>
            {onDelete && 
            <button className="info-chip-delete" onClick={onDelete}>
                <i className="bi bi-x"></i>
            </button>}
        </div>
    )
}

export default InfoChip