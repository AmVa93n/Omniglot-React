import useLanguages from "../hooks/useLanguages"

function Language({ code }: {code: string}) {
    const { getLanguageName } = useLanguages()

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        }}>
            <img src={`/flags/${code}.svg`} style={{width: '20px'}}/>
            <span>{getLanguageName(code)}</span>
        </div>
    )
}

export default Language