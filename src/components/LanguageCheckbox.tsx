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
        <div className="checkbox">
            <label
                htmlFor={type + '-' + code}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                <input  
                    type="checkbox" 
                    value={code}
                    id={type + '-' + code}
                    checked={checked}
                    disabled={disabled} 
                    onChange={onChange}
                />
                <img src={'/images/' + code + '.svg'} style={{width: '20px'}}/>{getLanguageName(code)}
            </label>
        </div>
    )
}

export default LanguageCheckbox