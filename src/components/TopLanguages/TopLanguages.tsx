import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import appService from '../../services/app.service';
import './TopLanguages.css';
import { topLanguages } from '../../types';
import useLanguages from '../../hooks/useLanguages';

function TopLanguages() {
    const [stats, setStats] = useState<topLanguages>({
        teach: Array(10).fill(null).map((_, index) => ({ code: `placeholder-${index + 1}`, amount: 0 })),
        learn: Array(10).fill(null).map((_, index) => ({ code: `placeholder-${index + 1}`, amount: 0 })),
    });
    const { getLanguageName } = useLanguages();

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await appService.getLanguageStats();
                setStats(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchStats();
    }, []);

    const getClassNameForRank = (index: number) => {
        if (index === 0) return 'gold';
        if (index === 1) return 'silver';
        if (index === 2) return 'bronze';
        return '';
    };

    return (
        <div id="toplanguages">
                <div className="language-section">
                    <h4>Teaching</h4>
                    <ul className="language-list">
                        {stats.teach.map((lang, index) => (
                            <Link key={lang.code} to={{pathname: '/users', search: '?teach=' + lang.code}}>
                                <li className={`language-list-item ${getClassNameForRank(index)}`}>
                                    <div className="language-rank">{index + 1}</div>
                                    <div className="language-name">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <img src={`/flags/${lang.code}.svg`} style={{width: '20px'}}/>
                                            <span>{getLanguageName(lang.code)}</span>
                                        </div>
                                    </div>
                                    <span className='language-users'>({lang.amount} users)</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className='main'> 
                    <h2>Which languages are the most popular with our users?</h2>
                    <p>Choose a language and set your next goal today!</p>
                </div>

                <div className="language-section">
                    <h4>Learning</h4>
                    <ul className="language-list">
                        {stats.learn.map((lang, index) => (
                            <Link key={lang.code} to={{pathname: '/users' , search: '?learn=' + lang.code}}>
                                <li className={`language-list-item ${getClassNameForRank(index)}`}>
                                    <div className="language-rank">{index + 1}</div>
                                    <div className="language-name">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <img src={`/flags/${lang.code}.svg`} style={{width: '20px'}}/>
                                            <span>{getLanguageName(lang.code)}</span>
                                        </div>
                                    </div>
                                    <span className='language-users'>({lang.amount} users)</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default TopLanguages;