function useLanguages() {
    function getLanguageName(langCode: string) {
        return langCode ? languages[langCode] : '';
    }
    
    const languages: Record<string, string> = {
        es: 'Spanish',
        it: 'Italian',
        pt: 'Portuguese',
        fr: 'French',
        de: 'German',
        ru: 'Russian',
        nl: 'Dutch',
        zh: 'Chinese',
        hu: 'Hungarian',
        he: 'Hebrew',
        ar: 'Arabic',
        pl: 'Polish',
        ro: 'Romanian',
        jp: 'Japanese',
        kr: 'Korean',
    };

    const languagesList = Object.keys(languages).sort((a, b) => languages[a].localeCompare(languages[b]))

    return { getLanguageName, languagesList };
}

export default useLanguages;