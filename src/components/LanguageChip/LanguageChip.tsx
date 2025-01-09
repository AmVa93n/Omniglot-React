import useLanguages from "../../hooks/useLanguages"
import Avatar from "../Avatar"
import './LanguageChip.css'

interface Props {
    code: string
    onDelete?: () => void
}

function LanguageChip({ code, onDelete }: Props) {
    const { getLanguageName } = useLanguages()

    return (
        <div className="language-chip-container">
            <Avatar src={`/flags/${code}.svg`} size={20}/>
            <span className="language-chip-name">{getLanguageName(code)}</span>
            {onDelete && 
            <button className="language-chip-delete" onClick={onDelete}>
                <i className="bi bi-x"></i>
            </button>}
        </div>
    )
}

export default LanguageChip