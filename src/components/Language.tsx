import { getLanguageName } from '../utils'

function Language({ code }: {code: string}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        }}>
            <img src={`/images/${code}.svg`} style={{width: '20px'}}/>
            <span>{getLanguageName(code)}</span>
        </div>
    )
}

export default Language