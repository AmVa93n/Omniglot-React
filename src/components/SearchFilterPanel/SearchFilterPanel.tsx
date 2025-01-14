import useCountries from '../../hooks/useCountries';
import useLanguages from '../../hooks/useLanguages';
import { searchFilters } from '../../types';
import LanguageChip from '../LanguageChip/LanguageChip';
import LanguageSelectModal from '../LanguageSelectModal/LanguageSelectModal';
import './SearchFilterPanel.css';
import useLanguageSelect from '../../hooks/useLanguageSelect';

interface Props {
    filters: searchFilters
    setFilters: React.Dispatch<React.SetStateAction<searchFilters>>;
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function SearchFilterPanel({ filters, setFilters, onFilterChange }: Props) {
    const countries = useCountries();
    const { languagesList } = useLanguages();
    const { isModalOpen, modalField, handleAdd, handleDelete, handleConfirm, handleCancel } = useLanguageSelect(setFilters);
    const availableLanguages = languagesList.filter(lang => !filters[modalField].includes(lang));

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
                
                <button className="add-button" onClick={() => handleAdd('lang_learn')} disabled={filters.lang_learn.length === languagesList.length}>
                    <i className="bi bi-plus-circle-fill"></i>Learning
                </button>

                <button className="add-button" onClick={() => handleAdd('lang_teach')} disabled={filters.lang_teach.length === languagesList.length}>
                    <i className="bi bi-plus-circle-fill"></i>Teaching
                </button>
            </div>

            {(filters.lang_learn.length > 0 || filters.lang_teach.length > 0) &&
            <div className="applied-filters-panel">
                {filters.lang_learn.length > 0 && <>
                    <b>Learning:</b>
                    {filters.lang_learn.map(lang => (
                        <LanguageChip key={lang} code={lang} onDelete={() => handleDelete(lang, 'lang_learn')} />
                    ))}
                </>}

                {filters.lang_teach.length > 0 && <>
                    <b>Teaching:</b>
                    {filters.lang_teach.map(lang => (
                        <LanguageChip key={lang} code={lang} onDelete={() => handleDelete(lang, 'lang_teach')} />
                    ))}
                </>}
            </div>}

            {isModalOpen && 
                <LanguageSelectModal 
                    languages={availableLanguages} 
                    field={modalField}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />}
        </div>
    );
}

export default SearchFilterPanel;