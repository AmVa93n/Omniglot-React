import useLanguages from "../../hooks/useLanguages"
import Avatar from "../Avatar"
import './LanguageChip.css'

interface Props {
    code: string
    onDelete: () => void
}

function Language({ code, onDelete }: Props) {
    const { getLanguageName } = useLanguages()

    return (
        <div className="language-chip-container">
            <Avatar src={`/flags/${code}.svg`} size={20}/>
            <span>{getLanguageName(code)}</span>
            <button className="language-chip-delete" onClick={onDelete}>
                <i className="bi bi-x"></i>
            </button>
        </div>
    )
}

export default Language