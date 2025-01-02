interface TypeProps {
    type: string
    maxGroupSize?: number
}

function ClassType({ type, maxGroupSize }: TypeProps) {

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
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <i className={'bi ' + getIcon(type)}></i>{stylizeText(type)} {maxGroupSize && ` (max. ${maxGroupSize} students)`}
        </span>
    )
}

interface LevelProps {
    level: string
}

function Level({ level }: LevelProps) {

    function stylizeText(plainText: string) {
        switch(plainText) {
          case "beginner": return 'Beginner'
          case "intermediate": return 'Intermediate'
          case "advanced": return 'Advanced'
          default: return ''
        }
    }

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <i className={'bi bi-mortarboard-fill'}></i>{stylizeText(level)}
        </span>
    )
}

interface LocationProps {
    type: string
    location?: string
}

function ClassLocation({ type, location }: LocationProps) {

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
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <i className={'bi ' + getIcon(type)}></i>{stylizeText(type)} {location && ` (${location})`}
        </span>
    )
}

export { ClassType, Level, ClassLocation }