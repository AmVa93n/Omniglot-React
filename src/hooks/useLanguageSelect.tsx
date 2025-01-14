import { useState } from 'react';

function useLanguageSelect<T extends { lang_teach: string[], lang_learn: string[] }>(setState: React.Dispatch<React.SetStateAction<T>>) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalField, setModalField] = useState<'lang_teach' | 'lang_learn'>('lang_teach')

    function handleAdd(field: 'lang_teach' | 'lang_learn') {
        setModalField(field)
        setIsModalOpen(true)
    }

    function handleDelete(code: string, field: 'lang_teach' | 'lang_learn') {
        setState(prev => {
            return {...prev, [field]: prev[field].filter(lang => lang !== code)}
        })
    }

    function handleConfirm(selectedLanguages: string[], field: 'lang_teach' | 'lang_learn') {
        setState(prev => {
            return {...prev, [field]: [...prev[field], ...selectedLanguages]}
        })
        setIsModalOpen(false)
    }

    function handleCancel() {
        setIsModalOpen(false)
    }

    return { isModalOpen, modalField, handleAdd, handleDelete, handleConfirm, handleCancel }
}

export default useLanguageSelect;