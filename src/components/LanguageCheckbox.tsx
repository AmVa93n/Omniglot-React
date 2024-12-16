import { getLanguageName } from '../utils'

function LanguageCheckbox({ code, type, checked, disabled, onChange }: 
    {code: string, type: 'teach' | 'learn', checked: boolean, disabled: boolean, onChange: ()=> void}) {

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
                <img src={'/images/' + code + '.svg'} className="lang-flag"/>{getLanguageName(code)}
            </label>
        </div>
    )
}

export default LanguageCheckbox