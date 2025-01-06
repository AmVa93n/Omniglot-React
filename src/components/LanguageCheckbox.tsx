import useLanguages from "../hooks/useLanguages"

interface Props {
    code: string
    type: 'teach' | 'learn'
    checked: boolean
    disabled: boolean
    onChange: (event: React.ChangeEvent) => void
}

function LanguageCheckbox({ code, type, checked, disabled, onChange }: Props) {
    const { getLanguageName } = useLanguages()

    return (
        <div key={code} className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                value={code}
                id={type + '-' + code}
                checked={checked}
                disabled={disabled} 
                onChange={onChange}/>
            <label 
                className="form-check-label" 
                htmlFor={type + '-' + code}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                <img src={'/images/' + code + '.svg'} style={{width: '20px'}}/>{getLanguageName(code)}
            </label>
        </div>
    )
}

export default LanguageCheckbox