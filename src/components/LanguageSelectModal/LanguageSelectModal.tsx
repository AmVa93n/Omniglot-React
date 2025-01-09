import { useState } from 'react';
import './LanguageSelectModal.css';
import useLanguages from '../../hooks/useLanguages';
import Avatar from '../Avatar';

interface Props {
    languages: string[];
    field: string;
    onConfirm: (selectedLanguages: string[], field: string) => void;
    onCancel: () => void;
}

function LanguageSelectModal({ languages, field, onConfirm, onCancel }: Props) {
    const [selectedLanguagues, setSelectedLanguages] = useState<string[]>([]);
    const { getLanguageName } = useLanguages();

    function handleCheckboxChange(lang: string) {
        setSelectedLanguages(prev => 
            prev.includes(lang) ? prev.filter(id => id !== lang) : [...prev, lang]
        );
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='modal-header'>
                    <h3>Select Languages</h3>
                </div>

                <div className='modal-body'>
                    <div className='modal-list'>
                        {languages.map(lang => (
                            <div 
                                key={lang} 
                                className={`modal-list-item ${selectedLanguagues.includes(lang) ? 'selected' : ''}`}
                                onClick={() => handleCheckboxChange(lang)}
                            >
                                <Avatar src={'/flags/' + lang + '.svg'} size={25} />
                                
                                <span className='lang-name'>{getLanguageName(lang)}</span>
                                <input  
                                    type="checkbox" 
                                    value={lang}
                                    id={lang}
                                    checked={selectedLanguagues.includes(lang)}
                                    onChange={() => handleCheckboxChange(lang)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='modal-buttons'>
                    <button 
                        onClick={() => onConfirm(selectedLanguagues, field)}
                        disabled={selectedLanguagues.length === 0}
                    >
                        Confirm
                    </button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectModal;