import useCountries from '../../hooks/useCountries';
import useLanguages from '../../hooks/useLanguages';
import { searchFilters } from '../../types';
import LanguageChip from '../LanguageChip/LanguageChip';
import LanguageSelectModal from '../LanguageSelectModal/LanguageSelectModal';
import './SearchFilterPanel.css';
import { useState } from 'react';

interface Props {
    filters: searchFilters
    setFilters: React.Dispatch<React.SetStateAction<searchFilters>>;
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function SearchFilterPanel({ filters, setFilters, onFilterChange }: Props) {
    const countries = useCountries();
    const { languagesList } = useLanguages();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalField, setModalField] = useState<'learning' | 'teaching'>('learning');
    const availableLanguages = languagesList.filter(lang => !filters[modalField].includes(lang));

    function handleAddLanguage(field: 'learning' | 'teaching') {
        setModalField(field)
        setIsModalOpen(true)
    }

    function handleModalConfirm(selectedLanguages: string[], field: 'learning' | 'teaching') {
        setFilters(prev => {
            return {...prev, [field]: [...prev[field], ...selectedLanguages]}
        })
        setIsModalOpen(false)
    }

    function handleDeleteLanguage(code: string, field: 'learning' | 'teaching') {
        setFilters(prev => {
            return {...prev, [field]: prev[field].filter(lang => lang !== code)}
        })
    }

    return (
        <div className="search-filter-panel">
            <div className='input-panel'>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={filters.username}
                    onChange={onFilterChange}
                />

                <select
                    name="gender"
                    value={filters.gender}
                    onChange={onFilterChange}
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <div className="age-filter">
                    <input
                        type="number"
                        name="minAge"
                        placeholder="Min age"
                        value={filters.minAge}
                        onChange={onFilterChange}
                    />
                    <input
                        type="number"
                        name="maxAge"
                        placeholder="Max age"
                        value={filters.maxAge}
                        onChange={onFilterChange}
                    />
                </div>

                <select
                    name="country"
                    value={filters.country}
                    onChange={onFilterChange}
                >
                    <option value="">Country</option>
                    {countries.map(country => (
                        <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                    ))}
                </select>
                
                <button className="add-button" onClick={() => handleAddLanguage('learning')} disabled={filters.learning.length === languagesList.length}>
                    <i className="bi bi-plus-circle-fill"></i>Learning
                </button>

                <button className="add-button" onClick={() => handleAddLanguage('teaching')} disabled={filters.teaching.length === languagesList.length}>
                    <i className="bi bi-plus-circle-fill"></i>Teaching
                </button>
            </div>

            {(filters.learning.length > 0 || filters.teaching.length > 0) &&
            <div className="applied-filters-panel">
                {filters.learning.length > 0 && <>
                    <b>Learning:</b>
                    {filters.learning.map(lang => (
                        <LanguageChip key={lang} code={lang} onDelete={() => handleDeleteLanguage(lang, 'learning')} />
                    ))}
                </>}

                {filters.teaching.length > 0 && <>
                    <b>Teaching:</b>
                    {filters.teaching.map(lang => (
                        <LanguageChip key={lang} code={lang} onDelete={() => handleDeleteLanguage(lang, 'teaching')} />
                    ))}
                </>}
            </div>}

            {isModalOpen && 
                <LanguageSelectModal 
                    languages={availableLanguages} 
                    field={modalField}
                    onConfirm={handleModalConfirm}
                    onCancel={() => setIsModalOpen(false)}
                />}
        </div>
    );
}

export default SearchFilterPanel;