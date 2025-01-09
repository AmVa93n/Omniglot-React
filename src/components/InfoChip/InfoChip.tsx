import './InfoChip.css'

interface TypeProps {
    type: string
    maxGroupSize?: number
    onDelete?: () => void
}

function ClassTypeChip({ type, maxGroupSize, onDelete }: TypeProps) {

    function stylizeText(plainText: string) {
        switch(plainText) {
          case "private": return 'Private'
          case "group": return 'Group'
          default: return ''
        }
    }
      
    function getIcon(plainText: string) {
        switch(plainText) {
          case "private": return 'bi-person-fill'
          case "group": return 'bi-people-fill'
          default: return ''
        }
    }

    return (
        <div className="info-chip-container">
            <div className="info-chip-icon">
                <i className={'bi ' + getIcon(type)}></i>
            </div>
            <span className="info-chip-text">{stylizeText(type)} {maxGroupSize && ` (max. ${maxGroupSize} students)`}</span>
            {onDelete && 
            <button className="info-chip-delete" onClick={onDelete}>
                <i className="bi bi-x"></i>
            </button>}
        </div>
    )
}

interface LevelProps {
    level: string
    onDelete?: () => void
}

function LevelChip({ level, onDelete }: LevelProps) {

    function stylizeText(plainText: string) {
        switch(plainText) {
          case "beginner": return 'Beginner'
          case "intermediate": return 'Intermediate'
          case "advanced": return 'Advanced'
          default: return ''
        }
    }

    return (
        <div className="info-chip-container">
            <div className="info-chip-icon">
                <i className={'bi bi-mortarboard-fill'}></i>
            </div>
            <span className="info-chip-text">{stylizeText(level)}</span>
            {onDelete && 
            <button className="info-chip-delete" onClick={onDelete}>
                <i className="bi bi-x"></i>
            </button>}
        </div>
    )
}

interface LocationProps {
    type: string
    location?: string
    onDelete?: () => void
}

function ClassLocationChip({ type, location, onDelete }: LocationProps) {

    function stylizeText(plainText: string) {
        switch(plainText) {
          case "online": return 'Online'
          case "at-student": return `At the student's home`
          case "at-teacher": return `At the teacher's home`
          default: return ''
        }
    }
      
    function getIcon(plainText: string) {
        switch(plainText) {
          case "online": return 'bi-wifi'
          case "at-student": return `bi-house-fill`
          case "at-teacher": return `bi-house-fill`
          default: return ''
        }
    }

    return (
        <div className="info-chip-container">
            <div className="info-chip-icon">
                <i className={'bi ' + getIcon(type)}></i>
            </div>
            <span className="info-chip-text">{stylizeText(type)} {location && ` (${location})`}</span>
            {onDelete && 
            <button className="info-chip-delete" onClick={onDelete}>
                <i className="bi bi-x"></i>
            </button>}
        </div>
    )
}

interface ChipProps {
    type: string
    text: string
}

function Chip({ type, text }: ChipProps) {
    function getIcon(type: string) {
        switch(type) {
            case "duration": return 'bi-clock-fill'
            case "price": return 'bi-tag-fill'
            case "weekdays": return 'bi-calendar-fill'
            case "timeslots": return 'bi-clock-fill'
            default: return ''
        }
    }

    function stylizeText(type: string, text: string) {
        switch(type) {
            case "duration": return `${text} Minutes`
            case "price": return `$${text}.00`
            default: return text
        }
    }

    return (
        <div className="info-chip-container">
            <div className="info-chip-icon">
                <i className={'bi ' + getIcon(type)}></i>
            </div>
            <span className="info-chip-text">{stylizeText(type, text)}</span>
        </div>
    )
}

export { ClassTypeChip, LevelChip, ClassLocationChip, Chip }