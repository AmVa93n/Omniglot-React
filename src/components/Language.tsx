import { getLanguageName } from '../utils'

function Language({ code }: {code: string}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        }}>
            <img src={`/images/${code}.svg`} className="lang-flag"/>
            <span className="lang-name">{getLanguageName(code)}</span>
        </div>
    )
}

export default Language