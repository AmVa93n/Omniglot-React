import { getIcon, stylizeText } from '../utils'

function Snippet({ data }: {data: string}) {
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <i className={'bi ' + getIcon(data)}></i>{stylizeText(data)}
        </span>
    )
}

export default Snippet